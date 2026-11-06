import eventTypes from '../../lib/eventTypes.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:upcomingEvents',
    description: 'project:upcomingEventsDescription',
    icon: 'calendar-icon'
  },
  icons: {
    'calendar-icon': 'Calendar'
  },
  fields: {
    add: {
      limit: {
        label: 'project:limit',
        type: 'integer',
        def: 3,
        min: 1,
        max: 12
      },
      eventType: {
        label: 'project:eventType',
        help: 'project:upcomingEventsTypeHelp',
        type: 'select',
        // Not an empty string: the editor shows an empty value as blank.
        def: 'all',
        choices: [
          {
            label: 'project:allEventTypes',
            value: 'all'
          },
          ...eventTypes
        ]
      },
      display: {
        label: 'project:display',
        type: 'select',
        def: 'list',
        choices: [
          {
            label: 'project:displayList',
            value: 'list'
          },
          {
            label: 'project:displayCards',
            value: 'cards'
          }
        ]
      }
    }
  }
};
