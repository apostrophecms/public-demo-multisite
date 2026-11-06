import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dayjs from 'dayjs';
import logo from './lib/logo.js';
import linden from './lib/profiles/linden.js';
import portSorrel from './lib/profiles/port-sorrel.js';

// Each profile is a complete, distinct association. See lib/profiles/.
const profiles = {
  linden,
  'port-sorrel': portSorrel
};

// Fills a new, empty site with a complete sample association: pages, events,
// members, resources, news, photos and settings. Run once per site:
//
//   node app sample-content:populate --site=linden.localhost
//   node app sample-content:populate --site=sorrel.localhost --profile=port-sorrel
//   node app sample-content:populate --site=ridge.localhost --name="Ridge Beekeepers"
//
// `--profile` picks the association: its people, events, photos, writing and,
// optionally, its look (palette, fonts, button shape) through the same Global
// Styles an editor would use. `--name` renames it.
//
// The photos in images/ are freely licensed from Wikimedia Commons. Their
// credits travel with them (images/credits.json) into each image's `credit`
// and `creditUrl` fields, and onto a generated "Photo credits" page.
//
// Event dates are relative to the day the task runs, so a freshly populated
// site always has upcoming events.

const dir = path.dirname(fileURLToPath(import.meta.url));

export default {
  tasks(self) {
    return {
      populate: {
        usage: 'Fill a new, empty site with a sample beekeeping association.\n' +
          'Usage: node app sample-content:populate --site=<hostname> [--profile=<name>] [--name="Association Name"]\n' +
          `Profiles: ${Object.keys(profiles).join(', ')} (default: linden)`,
        async task(argv) {
          await self.populate(argv);
        }
      }
    };
  },
  methods(self) {
    return {
      async populate(argv) {
        const req = self.apos.task.getReq();
        const existing = await self.apos.event.find(req).archived(null).toCount() +
          await self.apos.member.find(req).archived(null).toCount();
        if (existing) {
          throw new Error('This site already has events or members. sample-content:populate is meant for a new, empty site.');
        }
        const profileName = (typeof argv.profile === 'string') ? argv.profile : 'linden';
        const content = profiles[profileName];
        if (!content) {
          throw new Error(`Unknown profile "${profileName}". Profiles: ${Object.keys(profiles).join(', ')}`);
        }
        const name = (typeof argv.name === 'string' && argv.name.trim()) || content.defaultName;
        const allCredits = JSON.parse(await fs.readFile(path.join(dir, 'images/credits.json'), 'utf8'));
        const credits = content.images.map((key) => {
          const credit = allCredits.find((candidate) => candidate.key === key);
          if (!credit) {
            throw new Error(`Profile "${profileName}" lists image "${key}", which is not in images/credits.json`);
          }
          return credit;
        });

        const ctx = {
          name,
          h: self.helpers(),
          date: (days) => dayjs().add(days, 'day').format('YYYY-MM-DD'),
          year: (years) => dayjs().add(years, 'year').year(),
          credits,
          content,
          pages: {}
        };
        self.log(`Populating "${name}" (profile: ${profileName})`);

        const images = await self.insertImages(req, credits);
        ctx.images = self.strictImages(images, profileName);
        ctx.checklist = await self.insertFile(req, 'files/equipment-checklist.pdf', 'New beekeeper equipment checklist');
        await self.updateGlobal(req, ctx);
        await self.updateStyles(req, ctx);

        ctx.authors = await self.insertEach(req, 'author', ctx.content.authors(ctx));
        ctx.categories = await self.insertEach(req, 'article-category', ctx.content.categories(ctx));
        ctx.members = await self.insertEach(req, 'member', ctx.content.members(ctx));
        await self.insertEach(req, 'event', ctx.content.events(ctx));
        await self.insertEach(req, 'resource', ctx.content.resources(ctx));
        await self.insertEach(req, 'article', ctx.content.articles(ctx));

        // Pages that others link to come first; the home page links to most
        // of them, so it is filled in last.
        for (const page of ctx.content.pages(ctx)) {
          const {
            parent, key, ...doc
          } = page;
          ctx.pages[key] = await self.apos.page.insert(
            req,
            parent ? ctx.pages[parent]._id : '_home',
            'lastChild',
            doc
          );
        }
        await self.updateHome(req, ctx);
        self.log('Done. Log in to see the content in context and edit it.');
      },

      log(message) {
        // Task progress for the person running it.
        // eslint-disable-next-line no-console
        console.log(`[sample-content] ${message}`);
      },

      async insertEach(req, type, docs) {
        const manager = self.apos.doc.getManager(type);
        const inserted = {};
        for (const { key, ...doc } of docs) {
          // Writers are also members, and slugs are unique across pieces, so
          // the byline takes "by-jane-doe" and the member keeps "jane-doe" for
          // their profile page. It also reads well: /news/authors/by-jane-doe.
          if ((type === 'author') && !doc.slug) {
            doc.slug = `by-${self.apos.util.slugify(doc.title)}`;
          }
          inserted[key] = await manager.insert(req, {
            ...manager.newInstance(),
            ...doc
          });
        }
        self.log(`${docs.length} ${type} pieces`);
        return inserted;
      },

      async insertImages(req, credits) {
        const images = {};
        for (const credit of credits) {
          const attachment = await self.apos.attachment.insert(req, {
            name: credit.file,
            path: path.join(dir, 'images', credit.file)
          });
          images[credit.key] = await self.apos.image.insert(req, {
            ...self.apos.image.newInstance(),
            title: credit.alt,
            alt: credit.alt,
            credit: credit.credit,
            creditUrl: credit.creditUrl,
            attachment
          });
        }
        self.log(`${credits.length} images`);
        return images;
      },

      // Image pieces by key. Asking for a key the profile did not list throws,
      // rather than quietly building a widget with no image.
      strictImages(images, profileName) {
        return new Proxy(images, {
          get(target, key) {
            if ((typeof key === 'string') && !(key in target) && ![ 'then', 'toJSON' ].includes(key)) {
              throw new Error(`Profile "${profileName}" uses image "${key}" but does not list it in its \`images\``);
            }
            return target[key];
          }
        });
      },

      // A profile's `styles` are Global Styles field values (see
      // modules/@apostrophecms/styles/lib/), applied as an editor would.
      async updateStyles(req, ctx) {
        if (!ctx.content.styles) {
          return;
        }
        const draftReq = req.clone({ mode: 'draft' });
        const styles = await self.apos.modules['@apostrophecms/styles'].find(draftReq).toObject();
        Object.assign(styles, ctx.content.styles);
        await self.apos.modules['@apostrophecms/styles'].update(draftReq, styles);
        await self.apos.modules['@apostrophecms/styles'].publish(draftReq, styles);
        self.log('Global styles');
      },

      async insertFile(req, relativePath, title) {
        const attachment = await self.apos.attachment.insert(req, {
          name: path.basename(relativePath),
          path: path.join(dir, relativePath)
        });
        return self.apos.file.insert(req, {
          ...self.apos.file.newInstance(),
          title,
          attachment
        });
      },

      // Uploads the generated wordmark, light and dark, as image pieces.
      async insertLogos(req, name, options = {}) {
        const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'sample-logo-'));
        try {
          const logos = {};
          for (const dark of [ false, true ]) {
            const file = path.join(tmp, dark ? 'logo-dark.svg' : 'logo.svg');
            await fs.writeFile(file, logo(name, {
              ...options,
              dark
            }));
            const attachment = await self.apos.attachment.insert(req, {
              name: path.basename(file),
              path: file
            });
            logos[dark ? 'dark' : 'light'] = await self.apos.image.insert(req, {
              ...self.apos.image.newInstance(),
              title: dark ? `${name} logo (dark mode)` : `${name} logo`,
              alt: name,
              attachment
            });
          }
          return logos;
        } finally {
          await fs.rm(tmp, {
            recursive: true,
            force: true
          });
        }
      },

      // Global settings exist in both modes; update the draft, then publish.
      async updateGlobal(req, ctx) {
        const logos = await self.insertLogos(req, ctx.name, ctx.content.logo);
        const draftReq = req.clone({ mode: 'draft' });
        const global = await self.apos.global.findGlobal(draftReq);
        Object.assign(global, ctx.content.global(ctx), {
          _siteLogo: [ logos.light ],
          _siteLogoDark: [ logos.dark ]
        });
        await self.apos.global.update(draftReq, global);
        await self.apos.global.publish(draftReq, global);
        self.log('Global settings and logo');
      },

      async updateHome(req, ctx) {
        const draftReq = req.clone({ mode: 'draft' });
        const home = await self.apos.page.find(draftReq, { slug: '/' }).toObject();
        home.main = ctx.content.home(ctx);
        await self.apos.page.update(draftReq, home);
        await self.apos.page.publish(draftReq, home);
        self.log('Home page');
      },

      // Builders for areas and widgets, so profiles read as content.
      helpers() {
        const id = () => self.apos.util.generateId();
        const widget = (data) => ({
          _id: id(),
          metaType: 'widget',
          ...data
        });
        const area = (...widgets) => ({
          _id: id(),
          metaType: 'area',
          items: widgets.flat().filter(Boolean).map(widget)
        });
        // A link field group (lib/link.js) pointing at a page doc or a URL.
        const link = (text, target, extra = {}) => ({
          linkText: text,
          ...((typeof target === 'string')
            ? {
              linkType: 'custom',
              linkUrl: target
            }
            : {
              linkType: 'page',
              _linkPage: [ target ]
            }),
          ...extra
        });
        return {
          area,
          link,
          // Content is written indented for readability; drop the whitespace
          // between tags so it is stored as the editor would store it.
          rt: (html) => ({
            type: '@apostrophecms/rich-text',
            content: html.trim().replace(/>\s+</g, '><')
          }),
          image: (image) => ({
            type: '@apostrophecms/image',
            _image: [ image ]
          }),
          button: (text, target, style = 'primary') => ({
            type: 'button',
            ...link(text, target),
            style
          }),
          // Columns as [ span, [ widgets ] ] pairs on the 12 column grid.
          layout: (...columns) => {
            let colstart = 1;
            return {
              type: '@apostrophecms/layout',
              columns: area(columns.map(([ colspan, widgets ], order) => {
                const column = {
                  type: '@apostrophecms/layout-column',
                  colstart,
                  colspan,
                  rowstart: 1,
                  rowspan: 1,
                  order,
                  content: area(widgets)
                };
                colstart += colspan;
                return column;
              }))
            };
          }
        };
      }
    };
  }
};
