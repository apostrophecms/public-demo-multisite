# AGENTS.md — public-demo-multisite

Machine-readable project brief for AI coding assistants. Facts and conventions only.

---

## Architecture

An ApostropheCMS multisite project built on `@apostrophecms-pro/multisite`, using ES modules
(`"type": "module"`). One Node process serves many sites plus a dashboard, keyed by hostname.

| Path | Role |
|------|------|
| `app.js` | Boots `multisite()` with the `sites` and `dashboard` configs |
| `sites/` | The per-site application — modules, templates, assets. **JSX templates.** |
| `dashboard/` | The site-management dashboard. **Nunjucks templates — see below.** |
| `domains.js` | Hostname mapping per environment (`local`, staging, production) |
| `themes.js` | Theme list; must stay in step with the `list-themes` task Apostrophe Cloud uses |
| `scripts/`, `deployment/` | Build and deploy helpers, including `for-each-theme` |

Sites are prefixed `public-demo-` (`shortNamePrefix` in `app.js`); the dashboard's short name comes
from `APOS_DASHBOARD_SHORTNAME`, defaulting to `dashboard`.

## Dev Commands

```
npm run dev               # nodemon (see nodemon.json — watches .json, .js, .cjs, .jsx, .html)
npm start                 # start without watch
npm run build             # production asset build: dashboard first, then once per theme
npm run production-start  # NODE_ENV=production npm start
npm run migrate           # ./deployment/migrate
npm test                  # eslint + stylelint over dashboard/ and sites/
```

`nodemon` does **not** watch `.scss` — Sass edits will not restart the process.

`npm run eslint` is `eslint --ext .js,.vue`, so **`.jsx` templates are not linted**. In a project
whose templates are all JSX, that covers module code and leaves the templates unchecked.

### Verify visual changes in production, not dev

`npm run dev` differs from production in ways that look like bugs and in ways that hide them:

- **CSS is injected by JS.** Each navigation briefly paints unstyled, full-width HTML before
  `.layout` centers it. Dev-only.
- **The build manifest reports no assets**, so `layout.jsx` emits no font preloads and fonts arrive
  after first paint, changing typeface mid-render. Dev-only.
- **Fingerprinted asset URLs only exist in a production build**, so asset bugs are invisible in dev.

Check anything touching assets, fonts, or the manifest with `npm run build && npm run production-start`.

## `sites/` uses JSX templates

Templates under `sites/` are JSX. This is server-side rendering only — no React, no virtual DOM, no
client runtime. JSX here is an alternate template syntax evaluated where Nunjucks would have run.

A template default-exports a function of two arguments:

```jsx
export default function ({ page }, { Area }) {
  return (
    <>
      <h1>{page.title}</h1>
      <Area doc={page} name="main" />
    </>
  );
}
```

The first argument is the data object referenced as `data.*` in Nunjucks — destructure it. The
second is the helper set:

| Name | Purpose |
|------|---------|
| `apos` | The real `self.apos`. Call module methods directly. Prefer this. |
| `helpers` | Nunjucks-oriented helper wrappers. Only when you need a specific helper's exact behavior. |
| `Area` | Renders an area — replaces `{% area %}` |
| `Component` | Invokes an async component — replaces `{% component %}` |
| `Template` | Renders another template, include semantics — replaces `{% include %}` |
| `Extend` | Renders another template, extends semantics; props become `{% block %}` overrides against a `.html` target |
| `Widget` | Renders a single widget; only for reimplementing `area.html` |
| `__t` | Localization helper — the same request-scoped `req.t` Nunjucks exposes as `__t` |

Discovery is by filename, unchanged: `modules/<name>/views/widget.jsx`, `page.jsx`, `index.jsx`,
`show.jsx`. When `.jsx` and `.html` both exist, `.jsx` wins.

Notes that catch people out:

- **Only the default export receives the second argument.** Inline and imported components are
  plain functions — pass `apos`, `Area`, `__t` explicitly, under their own names (`__t={__t}`,
  never `t={__t}`).
- **`key` and `ref` are accepted but ignored.** There is no client reconciler. Don't write them,
  including inside `.map()`. This is not a reason to strip `_id` — `button-widget` renders
  `id={widget._id}` and targets it from an injected style rule.
- Unlike React, `style` accepts a plain string, and attributes pass through verbatim, so `srcset`
  and `crossorigin` keep their lowercase HTML spelling.
- Templates are real JS modules — `import` freely and define components in the same file.

## `dashboard/` stays Nunjucks — this is a constraint, not a preference

Two templates inside `@apostrophecms-pro/multisite-dashboard` extend `layout.html`:

```
modules/site-page/views/page.html
modules/multisite-dashboard-page/views/notFound.html
```

They resolve `layout.html` to `dashboard/views/layout.html`. **A Nunjucks template cannot extend a
JSX one**, so converting the dashboard layout to `.jsx` throws on login. Shadowing both Pro
templates at project level would work, but forking Pro package internals for nine lines of markup
is not worth it.

Do not convert `dashboard/` templates to JSX without first shadowing those two files.

## JSX/Nunjucks interop

> A `.html` template cannot `{% extends %}`, `{% include %}`, or `{% import %}` a `.jsx` template.
> The reverse is fully supported, including block overrides via `<Extend>`.

This applies to dependencies, not just project files. Core's own
`apostrophe/modules/@apostrophecms/page/views/notFound.html` extends `layout.html`, which is why
`sites/modules/@apostrophecms/page/views/notFound.jsx` exists — without it every 404 throws.

Before converting a template, check what depends on it:

```
grep -rlE "\{%\s*(extends|include|import)\s+['\"](layout|link|locales)\.html" node_modules --include=*.html
```

The only `.html` remaining under `sites/` is
`modules/@apostrophecms/template/views/outerLayout.html`, which extends core's Nunjucks
`outerLayoutBase.html`. That is the intended steady state.

## `sites/` templates mirror public-demo

Every `.jsx` file under `sites/` is byte-identical to its counterpart in the `public-demo`
repository, deliberately. They are the reference implementations people copy from, and they drift
quickly when a fix lands in only one.

Fix template-level bugs in both, or port promptly. A diff of the two template trees should return
nothing; if it does, either a fix is unported or a multisite-specific change was made and needs a
comment explaining why.

## Server-side helpers (`sites/modules/helper/`)

Registers **`methods`**, not Nunjucks helpers:

- `apos.helper.linkPath(link)` — resolves a link field group into a URL string
- `apos.helper.formatDate(date)` — `"Month D, YYYY"`

JSX receives the real `apos`, so methods are callable directly. **These are not reachable from
Nunjucks templates**, which resolve `apos.helper.*` against registered helpers. That is acceptable
because every template under `sites/` is JSX — but it means the `dashboard/` Nunjucks templates
cannot use them.

## i18n

- Key format `'project:camelCaseKey'`; files at
  `sites/modules/@apostrophecms/i18n/i18n/project/<locale>.json`
- Configured locales: `en`, `fr` (`/fr`), `de` (`/de`). An `es.json` is maintained but Spanish is
  not in `options.locales`, so nothing renders it.
- Prefer core's `apostrophe:` namespace for common UI strings — they are already translated. The
  404 template uses `apostrophe:notFound` and `apostrophe:notFoundPageMessage`.
- Locale flags are square SVGs in `sites/modules/asset/public/flags/`, resolved via
  `apos.asset.url()`. Square because `_locales.scss` crops them to a 24px circle with
  `background-size: 160%`, which scales width only. Deliberately not a third-party image service.

## Asset URLs and build fingerprinting

`apos.asset.url(path)` prefixes the release directory but does **not** account for Vite
fingerprinting its outputs. A font referenced from `@font-face` is served as
`/assets/poppins.subset-DvBIGq--.woff2`, not `/modules/asset/fonts/poppins.subset.woff2`. Both
exist and return 200, so mismatches fail silently.

`sites/views/layout.jsx` therefore reads hashed filenames from
`apos.asset.currentBuildManifest` when emitting font preloads. That property is internal to
`@apostrophecms/asset` and undocumented; the lookup degrades to emitting no preload tags rather
than throwing. Tracked in PRO-9899.

Files that Vite does *not* process — anything dropped in `modules/*/public/`, such as the flag SVGs
— are copied verbatim, so `apos.asset.url()` is correct for those.

## Version constraints

`apostrophe` must be >= 4.31 for JSX support. Neither `@apostrophecms-pro/multisite` nor
`multisite-dashboard` declares a peer range on `apostrophe`, so compatibility is untested upstream
rather than guaranteed — verify the dashboard loads after any `apostrophe` bump.
