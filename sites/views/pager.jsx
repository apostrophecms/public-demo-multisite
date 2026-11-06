// Numbered pager shared by the event, member and resource index pages.
// Imported, not rendered through <Template>, so callers pass `helpers` and a
// `pageUrl(n)` function that builds each page's link.
//
// The same markup as the local pager in article-page/views/index.jsx, which is
// left alone because that file mirrors the public-demo repository.

function PagerPage({
  page, current, total, pageUrl
}) {
  const classes = [
    'pager__item',
    page === 1 ? 'is-first' : '',
    page === total ? 'is-last' : '',
    page === current ? 'is-active' : ''
  ].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      {page === current ? page : <a href={pageUrl(page)}>{page}</a>}
    </span>
  );
}

export default function Pager({
  current, total, pageUrl, helpers
}) {
  if (!(total > 1)) {
    return null;
  }
  const options = {
    page: current,
    total
  };
  const range = helpers.pager.pageRange({
    ...options,
    shown: 5
  });
  return (
    <div className="pager">
      <PagerPage page={1} current={current} total={total} pageUrl={pageUrl} />
      {helpers.pager.showHeadGap(options) && (
        <span className="pager__gap">&hellip;</span>
      )}
      {range.map((page) => (page > 1 && page < total) && (
        <PagerPage page={page} current={current} total={total} pageUrl={pageUrl} />
      ))}
      {helpers.pager.showTailGap(options) && (
        <span className="pager__gap">&hellip;</span>
      )}
      <PagerPage page={total} current={current} total={total} pageUrl={pageUrl} />
    </div>
  );
}

// The filter choice the visitor is on, if any. Core marks a choice `active`
// only when it came from the URL, and a static URL carries one filter at a
// time, so there is at most one.
export function activeFilter(filters) {
  for (const filter of filters || []) {
    const choice = filter.choices.find((choice) => choice.active);
    if (choice) {
      return {
        name: filter.name,
        value: choice.value
      };
    }
  }
  return null;
}

// Builds `pageUrl(n)` for the pager, keeping the active filter.
export function filterPageUrl({ page, filters, apos }) {
  const active = activeFilter(filters);
  return (n) => page._url + (active
    ? apos.url.getChoiceFilter(active.name, active.value, n)
    : apos.url.getPageFilter(n));
}
