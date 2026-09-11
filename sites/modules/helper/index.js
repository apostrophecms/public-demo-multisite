import dayjs from 'dayjs';

// Registered as `methods`, not Nunjucks helpers. JSX templates receive the real
// `apos` object, so module methods are callable directly as
// `apos.helper.linkPath(...)`.
//
// Tradeoff: these are NOT reachable from Nunjucks templates, which resolve
// `apos.helper.*` against registered helpers rather than methods. That is
// acceptable because every template in sites/ is JSX. If a Nunjucks template is
// ever reintroduced here and needs these, register them with `self.addHelpers()`
// as well rather than moving them back.

export default {
  options: {
    alias: 'helper'
  },
  methods(self) {
    return {
      linkPath(link) {
        if (!link) {
          return;
        }
        let path;
        if (link.linkType === 'page' && link._linkPage && link._linkPage[0]) {
          path = link._linkPage[0]._url;
        } else if (link.linkType === 'file' && link._linkFile && link._linkFile[0]) {
          path = link._linkFile[0]._url;
        } else if (link.linkType === 'custom') {
          path = link.linkUrl;
        }
        return path;
      },
      formatDate(date) {
        return dayjs(date).format('MMMM D, YYYY');
      }
    };
  }
};
