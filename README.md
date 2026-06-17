# ApostropheCMS Assembly Multisite — Evaluation Project

> **Important Notice**
>
> This project uses the `@apostrophecms-pro/multisite` and
> `@apostrophecms-pro/multisite-dashboard` modules, which require an Apostrophe
> Assembly license. To obtain a license, visit
> [apostrophecms.com/assembly](https://apostrophecms.com/assembly) or contact the
> Apostrophe team. If you want a license-free starting point instead, see the
> open-source starter kits at
> [apostrophecms.com/starter-kits](https://apostrophecms.com/starter-kits).

## Purpose

This repository is a working, multisite-enabled ApostropheCMS project you can run
locally to evaluate Apostrophe Assembly. It is a single codebase that serves:

* A **dashboard** site (`dashboard/`) whose only job is to create and manage the
  other sites.
* Any number of **content sites** (`sites/`), all sharing the same project code
  but with independent databases and content.

It also serves as example code for organizing a multisite project and writing your
own custom modules and widgets.

## How a multisite project is organized

In a normal single-site Apostrophe project, you configure modules in `app.js`. In a
multisite project the layout is different:

| Path | Role |
| --- | --- |
| `app.js` | Top-level configuration shared by **all** sites (database host, port, hostname prefix, session secret, etc.). |
| `sites/index.js` | The equivalent of a single-site project's `app.js` — module configuration for your content sites. |
| `sites/modules/` | Project-level modules for your content sites (the equivalent of a single-site `modules/`). |
| `dashboard/index.js`, `dashboard/modules/` | The same idea, for the management dashboard. |
| `domains.js` | Base domains for each environment (`dev`/`staging`/`prod`), used to build site hostnames. |
| `themes.js` | The list of available site themes. |

In all other respects, development is ordinary ApostropheCMS development. If you are
new to Apostrophe, start with the
[ApostropheCMS documentation](https://apostrophecms.com/docs).

## First steps: before you start it up

### Set your shortname prefix

In `app.js`, `shortNamePrefix` is currently `public-demo-`. Change it to a unique
string for your project (conventionally your repo name followed by `-`). This
prefixes the MongoDB database names so they don't collide with other Assembly
projects in development.

> If you self-host on a low-end MongoDB Atlas cluster (below M10), keep the prefix
> under 12 characters before the `-`.

### Configure your domains

Edit `domains.js` so the values match your real domains. Leave `local` set to
`localhost:3000` for development. `staging` and `prod` are placeholders
(`staging.example.com`, `example.com`) — replace them with real domains backed by a
wildcard DNS record and a wildcard TLS certificate if you self-host. The first key
in the object is treated as the local development environment.

Each site you create gets a **shortname** and is automatically reachable as a
subdomain of every configured domain (e.g. `company1.localhost:3000`,
`company1.staging.example.com`).

### Set the dashboard shortname (optional)

By default the dashboard lives on the `dashboard` subdomain. Override it with
`dashboardShortName` in `app.js` (or the `APOS_DASHBOARD_SHORTNAME` environment
variable).

### Change the secrets

Before any real deployment, replace the placeholder secrets with your own random
strings:

* `sessionSecret` in `app.js`
* `secret` (Express session) in `sites/index.js`
* `secret` in `dashboard/modules/@apostrophecms/express/index.js` (currently
  literally `CHANGEME`)
* `disabledFileKey` in `sites/index.js` and `dashboard/index.js` (used to disable
  access to files in the local uploads backend)

## Requirements for local development

The local requirements are the same as for single-site ApostropheCMS. See the Apostrophe
[development setup guide](https://apostrophecms.com/docs/guide/development-setup.html)
for details.

### `/etc/hosts`

Because this project serves multiple hostnames, subdomains must resolve to your
machine. **In Chrome only, every `*.localhost` subdomain already resolves to
127.0.0.1**, so you can skip this at first. In other browsers, add an entry per site
you test, for example:

```
127.0.0.1 dashboard.localhost company1.localhost
```

## Starting up in development

Install dependencies:

```
npm install
```

Add an admin user to the **dashboard** site (it manages all the others). You'll be
prompted for a password:

```
node app @apostrophecms/user:add admin admin --site=dashboard
```

> When running command-line tasks in a multisite project you must always say which
> site you mean. Use `--site=dashboard` for the dashboard, any of a site's valid
> hostnames for an individual site (e.g. `--site=company1.localhost`), or
> `--all-sites` to run a task on every site except the dashboard.

Launch the application:

```
npm run dev
```

Then visit:

```
http://dashboard.localhost:3000/login
```

Log in with the admin account you just created. From the **Sites** menu in the
admin bar, add a new site. Sites are Apostrophe pieces in the dashboard:

* Give it a distinct **shortname** such as `company1`.
* Fill in the site's **admin password** field — this provisions an `admin` user on
  the new site.

After saving, log into the site directly:

```
http://company1.localhost:3000/login
```

Create `company2`, `company3`, and so on. The code is shared, but each site's
database and content are independent.

> Logged out, you'll only see content that has been published ("Commit"/"Publish")
> on a site.

## Building assets for production

```
npm run build
```

This builds the dashboard assets and then builds assets once per theme via
`scripts/for-each-theme`. `npm start` runs the app without nodemon
(`npm run production-start` sets `NODE_ENV=production`).

## Site development

Put the code for your content sites in `sites/`, exactly as you would in a
single-site project's `app.js`/`modules`:

* Configure and enable modules in `sites/index.js`.
* Add project modules under `sites/modules/`.

This project sets `nestedModuleSubdirs: true`, so modules can be grouped in
subfolders. It also `npm install`s and configures `@apostrophecms/blog`,
`@apostrophecms/seo`, `@apostrophecms/import-export`, and others — see
`sites/index.js`.

### Provided example modules

The `sites/modules` folder contains example custom code you can adapt or delete,
including widget modules (`hero-widget`, `card-widget`, `price-card-widget`,
`button-widget`, `article-widget`, `github-prs-widget`, plus layout widgets) and
piece/page types (`article`, `article-category`, `article-page`, `default-page`).
Project-wide frontend JavaScript and Sass live in `sites/modules/asset/ui/src`.

#### GitHub PRs widget token

`github-prs-widget` renders pull requests from a GitHub repository (it defaults to
`apostrophecms/apostrophe`). This is just a code example and you don't have to keep it. If you do, be aware that unauthenticated GitHub API requests are rate-limited;
to raise the limit, supply a personal access token as a module option in
`sites/index.js`:

```js
'github-prs-widget': {
  options: {
    token: process.env.GITHUB_TOKEN
  }
}
```

## Themes

Each site selects a single theme in the dashboard. This project ships one theme,
`default`, listed in `themes.js`:

```js
export default [
  {
    value: 'default',
    label: 'Default'
  }
];
```

A theme `value` is a permanent shortname and must not change once in use. Each theme
has a matching `sites/lib/theme-<value>.js` file that can enable extra modules or
tweak configuration for that theme. For `default`, that's `sites/lib/theme-default.js`.

To add a theme, add an entry to `themes.js` and create the corresponding
`sites/lib/theme-<value>.js`. Keeping `themes.js` accurate matters because
`npm run build` builds assets once per listed theme.

You can place a theme's frontend assets in the `ui/src/index.js` and
`ui/src/index.scss` of a module named after the theme. Static files (fonts,
favicons, etc.) placed in `sites/public` are served from `/`.

For best results, avoid creating one theme per site. Themes should be used for groups of sites with similar feature requirements.

## Dashboard development

The dashboard exists only to manage sites, so it doesn't need to be public-facing.
It is extended just like a content site, but its code lives in `dashboard/`. The
key module is `site` (`dashboard/modules/site/index.js`), a piece type with one
piece per managed site. It is provided by `@apostrophecms-pro/multisite-dashboard`
and configured here with the available `themes`, the `baseUrlDomains`, and
`localizedSites: true`.

Site schema field values are passed to each site as the `site` object in
`sites/index.js` (this is how the selected `theme` reaches each site). To expose
additional dashboard-controlled settings to sites, add fields to the `site` piece
and pass them through as module options in `sites/index.js`.

## Accessing MongoDB for a specific site

A site's database name is the prefix followed by the site piece's `_id`, which is
awkward to look up. Utility tasks are provided:

```
# Mongo shell for the dashboard
node app mongo:mongo --site=dashboard
# Mongo shell for an individual site (use its hostname)
node app mongo:mongo --site=company1.localhost
# mongodump / mongorestore
node app mongo:mongodump --site=company1.localhost
node app mongo:mongorestore --site=company1.localhost -- --drop
```

`--` by itself marks the end of Apostrophe's options, so flags like `--drop` are
passed through to the underlying tool.

## Hosting and deployment

We offer and recommend our hosting, which provides easy deployment via `git push` and high availability, scalability and durability via AWS EC2, AWS S3 and MongoDB Atlas. Self-hosting is also fully supported, reach out to us for sample scripts. For production you must configure a cloud upload backend (such as Amazon S3) and a managed MongoDB — **do not** rely on the local filesystem for uploads across multiple instances. Contact the Apostrophe Assembly team or see the [Assembly documentation](https://apostrophecms.com/assembly) for current hosting and deployment options.
