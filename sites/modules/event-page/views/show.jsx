// A single event: the editable content beside a details panel with the date,
// venue, cost and booking link. `data.piece` is the event; `data.page` is the
// calendar it belongs to.

import {
  dateParts, timeRange, eventTypeLabel
} from './fragments.jsx';
import FeaturedImage from '../../../views/featured-image.jsx';

function mapUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default function (data, {
  Extend, Area, apos, __t
}) {
  const event = data.piece;
  const attachment = apos.image.first(event._image);
  const { full } = dateParts(event, data.locale);
  const time = timeRange(event, data.locale);
  const isPast = event.startDate < apos.event.today();

  return (
    <Extend
      templateName="layout.jsx"
      pageTitle={
        <div className="listing-title">
          <div className="layout">
            <div className="listing-title__chips">
              <span className="chip">{eventTypeLabel(event, apos, __t)}</span>
              {event.membersOnly && (
                <span className="chip chip--muted">{__t('project:eventMembersOnlyBadge')}</span>
              )}
            </div>
            <h1 className="page-title">{event.title}</h1>
            <p className="listing-title__subtitle">{full}</p>
          </div>
        </div>
      }
      main={
        <div className="detail-layout">
          <article className="detail-layout__main general-content">
            <FeaturedImage attachment={attachment} apos={apos} __t={__t} />
            {event.summary && <p className="detail-layout__lede">{event.summary}</p>}
            <Area doc={event} name="main" />
          </article>
          <aside className="detail-panel">
            {isPast && (
              <p className="detail-panel__notice">{__t('project:eventIsPast')}</p>
            )}
            <dl>
              <dt>{__t('project:eventDate')}</dt>
              <dd>{full}</dd>
              {time && (
                <>
                  <dt>{__t('project:eventTime')}</dt>
                  <dd>{time}</dd>
                </>
              )}
              {(event.venue || event.address) && (
                <>
                  <dt>{__t('project:eventVenue')}</dt>
                  <dd>
                    {event.venue}
                    {event.venue && event.address && <br />}
                    {event.address && (
                      <a href={mapUrl(event.address)} target="_blank" rel="noopener noreferrer">
                        {event.address}
                      </a>
                    )}
                  </dd>
                </>
              )}
              {event.cost && (
                <>
                  <dt>{__t('project:eventCost')}</dt>
                  <dd>{event.cost}</dd>
                </>
              )}
            </dl>
            {event.bookingUrl && !isPast && (
              <a
                className="button button--small"
                href={event.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {__t('project:eventBook')}
              </a>
            )}
            <a className="detail-panel__back" href={data.page._url}>
              {__t('project:eventsBack')}
            </a>
          </aside>
        </div>
      }
    />
  );
}
