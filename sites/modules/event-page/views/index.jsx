// The association calendar. Upcoming events by default (see indexQuery in
// ../index.js), the archive at `/when/past`, and one event type at a time at
// `/eventType/:type`. Events are grouped under month headings.

import Pager, { activeFilter, filterPageUrl } from '../../../views/pager.jsx';
import { EventItem, groupByMonth } from './fragments.jsx';

export default function (data, {
  Extend, Area, apos, helpers, __t
}) {
  const page = data.page;
  const filters = data.filters || [];
  const active = activeFilter(filters);
  const showingPast = !!active && active.name === 'when' && active.value === 'past';
  const typeChoices = (filters.find((filter) => filter.name === 'eventType') || {}).choices || [];
  const groups = groupByMonth(data.pieces || [], data.locale);
  const pastUrl = page._url + apos.url.getChoiceFilter('when', 'past', 1);

  return (
    <Extend
      templateName="layout.jsx"
      pageTitle={
        <div className="listing-title">
          <div className="layout">
            <h1 className="page-title">{page.title}</h1>
            <ul className="listing-filters">
              <li>
                <a href={page._url} className={!active ? 'active' : undefined}>
                  {__t('project:eventsUpcoming')}
                </a>
              </li>
              {typeChoices.map((choice) => (
                <li>
                  <a href={choice._url} className={choice.active ? 'active' : undefined}>
                    {__t(choice.label)}
                  </a>
                </li>
              ))}
              <li>
                <a href={pastUrl} className={showingPast ? 'active' : undefined}>
                  {__t('project:eventsPast')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      }
      main={
        <section className="event-index">
          <header className="listing-intro general-content">
            <Area doc={page} name="intro" />
          </header>
          {groups.length === 0 && (
            <p className="placeholder">
              {__t(showingPast ? 'project:eventsNonePast' : 'project:eventsNoneUpcoming')}
            </p>
          )}
          {groups.map((group) => (
            <section className="event-month">
              <h2 className="event-month__title">{group.label}</h2>
              <div className="event-list">
                {group.events.map((event) => (
                  <EventItem event={event} locale={data.locale} apos={apos} __t={__t} />
                ))}
              </div>
            </section>
          ))}
          <Pager
            current={data.currentPage}
            total={data.totalPages}
            pageUrl={filterPageUrl({
              page,
              filters,
              apos
            })}
            helpers={helpers}
          />
        </section>
      }
    />
  );
}
