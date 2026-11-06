// "current" shows this month and a look ahead to the next; "year" shows all
// twelve with this month highlighted. The month is the server's, which is
// what a visitor in the association's own area expects.

function monthName(month, locale) {
  return new Intl.DateTimeFormat(locale || 'en', {
    month: 'long',
    timeZone: 'UTC'
  }).format(new Date(Date.UTC(2000, month - 1, 1)));
}

function Month({
  entry, locale, current, __t
}) {
  const tasks = (entry.tasks || []).filter((item) => item.task);
  return (
    <section className={`seasonal-month${current ? ' seasonal-month--current' : ''}`}>
      <h3 className="seasonal-month__name">
        {monthName(entry.month, locale)}
        {current && <span className="chip">{__t('project:seasonalNow')}</span>}
      </h3>
      {entry.headline && <p className="seasonal-month__headline">{entry.headline}</p>}
      {tasks.length > 0 && (
        <ul className="seasonal-month__tasks">
          {tasks.map((item) => <li>{item.task}</li>)}
        </ul>
      )}
    </section>
  );
}

export default function ({ widget, locale }, { __t }) {
  // Select values are strings ('1' to '12').
  const entries = (widget.months || [])
    .map((entry) => ({
      ...entry,
      month: Number(entry.month)
    }))
    .filter((entry) => entry.month)
    .sort((a, b) => a.month - b.month);
  const thisMonth = new Date().getMonth() + 1;
  const nextMonth = (thisMonth % 12) + 1;
  const shown = widget.display === 'year'
    ? entries
    : [ thisMonth, nextMonth ]
      .map((month) => entries.find((entry) => entry.month === month))
      .filter(Boolean);

  return (
    <div className={`widget seasonal-calendar-widget seasonal-calendar-widget--${widget.display || 'current'}`}>
      {shown.length > 0
        ? shown.map((entry) => (
          <Month
            entry={entry}
            locale={locale}
            current={entry.month === thisMonth}
            __t={__t}
          />
        ))
        : <p className="placeholder">{__t('project:seasonalEmpty')}</p>
      }
    </div>
  );
}
