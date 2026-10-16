// Repoints the `_url` of pages and pieces at a separate frontend origin, for
// projects where visitors never see the CMS domain because a custom frontend
// renders the content. See README.md in this folder.
//
// The remap itself happens in the `pageUrl` query builder, extended in
// `sites/modules/@apostrophecms/doc-type/index.js`. Pieces build their `_url`
// from their parent page's `_url`, and rich text page links resolve through
// the same queries, so that one hook covers all of them.
//
// Opt-in: with no `frontendBaseUrl`, every URL is left exactly as core builds it.

export default {
  options: {
    alias: 'urlRemap',
    // Origin of the public frontend, e.g. `https://www.example.com`. Supplied
    // per site from the dashboard by `sites/index.js`.
    frontendBaseUrl: null
  },
  init(self) {
    self.frontendBaseUrl = (self.options.frontendBaseUrl || '').trim().replace(/\/+$/, '') || null;
  },
  methods(self) {
    return {
      // The policy: whose URLs get remapped. Change this method to change it.
      //
      // Remap for anonymous visitors and for API key or bearer token requests,
      // which is how a headless frontend fetches content. Apostrophe marks
      // those requests `csrfExempt`. Leave URLs alone for a logged-in editing
      // session, so "view page", previews and in-context editing stay on the
      // CMS domain. Static builds are excluded because core strips the CMS
      // origin from their URLs and expects to find it.
      shouldRemap(req) {
        if (!self.frontendBaseUrl) {
          return false;
        }
        if (self.apos.url.isStaticBuild(req)) {
          return false;
        }
        return !req.user || !!req.csrfExempt;
      },

      // Swaps the CMS origin of `url` for the frontend origin, keeping the
      // path, including any locale prefix such as `/fr`. Assumes the frontend
      // serves each document at the same path as the CMS. If it doesn't,
      // translate `path` here.
      remapUrl(req, url) {
        if (typeof url !== 'string') {
          return url;
        }
        const cmsBase = req.baseUrl || self.apos.baseUrl || '';
        let path;
        if (cmsBase && url.startsWith(cmsBase)) {
          path = url.slice(cmsBase.length);
        } else if (url.startsWith('/') && !url.startsWith('//')) {
          path = url;
        } else {
          // Already on another origin (or not a URL we built): leave it alone
          return url;
        }
        return `${self.frontendBaseUrl}${path || '/'}`;
      },

      // Remaps `_url` on the docs a query returned, when this request qualifies
      remapResults(req, results) {
        if (!self.shouldRemap(req)) {
          return;
        }
        for (const doc of results) {
          if (doc._url) {
            doc._url = self.remapUrl(req, doc._url);
          }
        }
      }
    };
  }
};
