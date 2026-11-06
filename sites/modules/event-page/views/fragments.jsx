// Event markup shared by the calendar (index.jsx, show.jsx) and the
// upcoming-events widget (event/views/upcoming.jsx).
//
// Dates and times are stored as `YYYY-MM-DD` and `HH:MM:SS` strings with no
// time zone: an event is "7pm on the 14th" wherever the server runs. Format
// them as UTC so the conversion to a Date never shifts the day.

function toDate(event) {
  const [ year, month, day ] = String(event.startDate || '').split('-').map(Number);
  return year ? new Date(Date.UTC(year, month - 1, day)) : null;
}

function format(date, locale, options) {
  return new Intl.DateTimeFormat(locale || 'en', {
    timeZone: 'UTC',
    ...options
  }).format(date);
}

function formatTime(time, locale) {
  const [ hours, minutes ] = String(time).split(':').map(Number);
  return format(new Date(Date.UTC(1970, 0, 1, hours, minutes)), locale, {
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function dateParts(event, locale) {
  const date = toDate(event);
  if (!date) {
    return {};
  }
  return {
    day: format(date, locale, { day: 'numeric' }),
    month: format(date, locale, { month: 'short' }),
    weekday: format(date, locale, { weekday: 'short' }),
    monthYear: format(date, locale, {
      month: 'long',
      year: 'numeric'
    }),
    full: format(date, locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  };
}

export function timeRange(event, locale) {
  if (!event.startTime) {
    return '';
  }
  const start = formatTime(event.startTime, locale);
  return event.endTime ? `${start} – ${formatTime(event.endTime, locale)}` : start;
}

export function eventTypeLabel(event, apos, __t) {
  const choice = apos.event.eventTypes().find((type) => type.value === event.eventType);
  return choice ? __t(choice.label) : '';
}

export function DateBadge({ event, locale }) {
  const { day, month } = dateParts(event, locale);
  return (
    <div className="event-date-badge" aria-hidden="true">
      <span className="event-date-badge__month">{month}</span>
      <span className="event-date-badge__day">{day}</span>
    </div>
  );
}

// One row of the calendar, or of the widget's list display.
export function EventItem({
  event, locale, apos, __t
}) {
  const { full } = dateParts(event, locale);
  const time = timeRange(event, locale);
  return (
    <article className={`event-item event-item--${event.eventType}`}>
      <DateBadge event={event} locale={locale} />
      <div className="event-item__body">
        <div className="event-item__meta">
          <span className="chip">{eventTypeLabel(event, apos, __t)}</span>
          {event.membersOnly && (
            <span className="chip chip--muted">{__t('project:eventMembersOnlyBadge')}</span>
          )}
        </div>
        <h3 className="event-item__title">
          {event._url ? <a href={event._url}>{event.title}</a> : event.title}
        </h3>
        <p className="event-item__when">
          <span className="sr-only">{full}</span>
          {time}
          {time && event.venue && ' · '}
          {event.venue}
        </p>
        {event.summary && <p className="event-item__summary">{event.summary}</p>}
      </div>
    </article>
  );
}

// The widget's card display: image on top, then the same details.
export function EventCard({
  event, locale, apos, __t
}) {
  const attachment = apos.image.first(event._image);
  const { full } = dateParts(event, locale);
  const time = timeRange(event, locale);
  return (
    <article className="event-card">
      <a className="event-card__image" href={event._url}>
        {attachment
          ? (
            <img
              loading="lazy"
              src={apos.attachment.url(attachment, { size: 'one-half' })}
              srcset={apos.image.srcset(attachment)}
              sizes="(max-width: 800px) 100vw, 33vw"
              alt=""
              width={apos.attachment.getWidth(attachment)}
              height={apos.attachment.getHeight(attachment)}
            />
          )
          : <span className="event-card__placeholder" />
        }
        <DateBadge event={event} locale={locale} />
      </a>
      <div className="event-card__body">
        <span className="chip">{eventTypeLabel(event, apos, __t)}</span>
        <h3 className="event-card__title">
          <a href={event._url}>{event.title}</a>
        </h3>
        <p className="event-item__when">
          {full}
          {time && <><br />{time}</>}
        </p>
      </div>
    </article>
  );
}

// Groups consecutive events under a month heading ("November 2026").
export function groupByMonth(events, locale) {
  const groups = [];
  for (const event of events) {
    const { monthYear } = dateParts(event, locale);
    const last = groups[groups.length - 1];
    if (last && last.label === monthYear) {
      last.events.push(event);
    } else {
      groups.push({
        label: monthYear,
        events: [ event ]
      });
    }
  }
  return groups;
}
