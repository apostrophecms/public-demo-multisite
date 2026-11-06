// Delegates to the event module's `upcoming` async component, the same way
// article-widget delegates to article's `recent`.

export default function ({ widget: { limit, eventType, display } }, { Component }) {
  return (
    <Component
      module="event"
      name="upcoming"
      limit={limit}
      eventType={eventType}
      display={display}
    />
  );
}
