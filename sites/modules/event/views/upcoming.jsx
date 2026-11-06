// The event module's `upcoming` component, rendered by upcoming-events-widget.

import { EventItem, EventCard } from '../../event-page/views/fragments.jsx';

export default function (data, { apos, __t }) {
  const events = data.events || [];
  const display = data.display === 'cards' ? 'cards' : 'list';
  const Item = display === 'cards' ? EventCard : EventItem;
  return (
    <div className={`widget upcoming-events-widget upcoming-events-widget--${display}`}>
      {events.length > 0
        ? events.map((event) => (
          <Item event={event} locale={data.locale} apos={apos} __t={__t} />
        ))
        : <p className="placeholder">{__t('project:eventsNoneUpcoming')}</p>
      }
    </div>
  );
}
