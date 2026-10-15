// Project-level extension of core's doc-type, inherited by every page and piece
// type. Its only job is to hand freshly built page URLs to `url-remap`.
//
// Note: core's `extendQueries` helper stops after the first nested builder it
// extends (`apostrophe/modules/@apostrophecms/doc-type/lib/extendQueries.js`),
// so if another builder is ever extended here, keep `pageUrl` last.

export default {
  extendQueries(self, query) {
    return {
      builders: {
        pageUrl: {
          after(_super, results) {
            const result = _super(results);
            self.apos.urlRemap?.remapResults(query.req, results);
            return result;
          }
        }
      }
    };
  }
};
