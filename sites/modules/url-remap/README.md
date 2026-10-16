# url-remap

Repoints the `_url` of every page and piece at a separate frontend origin. Use it when a
custom frontend serves the public site and the CMS lives on its own domain, so that links
editors create — including links to a *Page* in rich text — lead visitors to the
frontend rather than to the CMS.

## How it works

Core builds a page's `_url` as `req.prefix + slug` in the `pageUrl` query builder, and
`req.prefix` includes the CMS origin. Everything else derives from that:

- pieces build `_url` and `_parentUrl` from their parent page's `_url`
- rich text page links are stored as `#apostrophe-permalink-<id>` placeholders and
  replaced at render time with the linked doc's `_url`
- relationship fields, ancestors and children are loaded through the same queries

So this example changes one thing: `sites/modules/@apostrophecms/doc-type/index.js` extends
`pageUrl` to pass each result through `apos.urlRemap.remapResults()`, which swaps the CMS
origin for `frontendBaseUrl`. There is no text rewriting of rendered HTML.

## Who sees remapped URLs

`shouldRemap(req)` decides. As shipped:

| Request | URLs |
|---------|------|
| Anonymous visitor | Frontend |
| API key or bearer token (a headless frontend) | Frontend |
| Logged-in editing session | CMS, so "view page", previews and in-context editing keep working |
| Static build (`x-apos-static-base-url`) | CMS; core strips the origin itself |

Change the policy in that one method.

## Configuring it

In this project the origin is a per-site **Frontend Base URL** field in the multisite
dashboard (`dashboard/modules/site/index.js`), passed in by `sites/index.js`. Empty means
off. Changing it doesn't need a restart: saving the site in the dashboard updates the site
record, and multisite rebuilds that site's instance on its next request. Outside multisite,
set the module option directly:

```js
'url-remap': {
  options: { frontendBaseUrl: 'https://www.example.com' }
}
```

To reuse this elsewhere, copy `sites/modules/url-remap/` and
`sites/modules/@apostrophecms/doc-type/index.js`, and enable `url-remap` in your module
configuration.

## What a headless frontend receives

The frontend has to authenticate. Apostrophe's REST API doesn't serve content to
anonymous callers unless a type sets `publicApiProjection`, and this project configures no
API keys. Add one in the `@apostrophecms/express` module options:

```js
'@apostrophecms/express': {
  options: {
    // Keep the real key out of source control. Guard against an unset variable, which
    // would otherwise register the literal key "undefined".
    apiKeys: process.env.FRONTEND_API_KEY
      ? { [process.env.FRONTEND_API_KEY]: { role: 'guest' } }
      : {}
  }
}
```

The frontend then sends `Authorization: ApiKey <key>` (or `?apiKey=<key>`). A `guest` key
sees published content as a logged-in guest would. Bearer tokens from
`POST /api/v1/@apostrophecms/login/login` also work. Both count as API requests, so they
get remapped URLs.

- `_url` and `_parentUrl` on pages and pieces are frontend URLs.
- Rich text `content` from the REST API still contains the permalink placeholders, exactly as
  stored. Each rich text widget carries `_relatedDocs`, whose `_url` values are already
  remapped; substitute them in, or request `?render-areas=1` to get finished HTML.

## Assumptions and limits

- **Same paths on both sides.** Only the origin changes; `/fr/about-us` on the CMS becomes
  `/fr/about-us` on the frontend. If the frontend's routes differ, translate the path in
  `remapUrl()`.
- **One frontend origin per site.** Locales configured with their own hostname
  (`separateHost`) are not mapped to separate frontend hosts, and there is no per-environment
  (staging vs. production) value.
- **The locale switcher** links to a relative `/api/v1/.../locale/<name>` route. That route
  redirects to the remapped URL, but the frontend has to forward `/api/v1` to the CMS for the
  link to work from the frontend domain.
- **SEO and Open Graph** URLs derived from `_url` also point to the frontend for anonymous
  visitors, which is usually what you want.
- **`apos.prefix`** is not stripped. If the CMS runs under a prefix the frontend doesn't use,
  remove it in `remapUrl()`.
