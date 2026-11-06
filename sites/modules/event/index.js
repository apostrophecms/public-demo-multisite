import dayjs from 'dayjs';
import { fullConfig } from '../../lib/area.js';
import eventTypes from '../../lib/eventTypes.js';

// Association events: monthly meetings, practical sessions at the teaching
// apiary, courses, socials and the honey show. Listed by event-page, teased
// anywhere by upcoming-events-widget.
//
// Dates are stored as `YYYY-MM-DD` strings, which sort and compare correctly as
// text, so "upcoming" is a plain string comparison against today's date.

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'event',
    label: 'project:event',
    pluralLabel: 'project:events',
    sort: {
      startDate: 1,
      startTime: 1
    }
  },
  fields: {
    add: {
      startDate: {
        label: 'project:eventDate',
        type: 'date',
        required: true
      },
      startTime: {
        label: 'project:eventStartTime',
        type: 'time'
      },
      endTime: {
        label: 'project:eventEndTime',
        type: 'time'
      },
      eventType: {
        label: 'project:eventType',
        type: 'select',
        required: true,
        def: 'meeting',
        choices: eventTypes
      },
      summary: {
        label: 'project:summary',
        help: 'project:eventSummaryHelp',
        type: 'string',
        textarea: true
      },
      venue: {
        label: 'project:eventVenue',
        type: 'string'
      },
      address: {
        label: 'project:eventAddress',
        help: 'project:eventAddressHelp',
        type: 'string'
      },
      cost: {
        label: 'project:eventCost',
        help: 'project:eventCostHelp',
        type: 'string'
      },
      bookingUrl: {
        label: 'project:eventBookingUrl',
        type: 'url'
      },
      membersOnly: {
        label: 'project:eventMembersOnly',
        help: 'project:eventMembersOnlyHelp',
        type: 'boolean',
        def: false
      },
      _image: {
        label: 'project:featuredImage',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1,
        aspectRatio: [ 3, 2 ]
      },
      main: {
        label: 'project:content',
        type: 'area',
        options: {
          widgets: fullConfig
        }
      }
    },
    group: {
      basics: {
        label: 'project:basics',
        fields: [
          'title',
          'startDate',
          'startTime',
          'endTime',
          'eventType',
          'summary'
        ]
      },
      details: {
        label: 'project:eventDetails',
        fields: [
          'venue',
          'address',
          'cost',
          'bookingUrl',
          'membersOnly'
        ]
      },
      main: {
        label: 'project:content',
        fields: [
          '_image',
          'main'
        ]
      }
    }
  },
  columns: {
    add: {
      startDate: {
        label: 'project:eventDate'
      },
      eventType: {
        label: 'project:eventType'
      }
    }
  },
  filters: {
    add: {
      eventType: {
        label: 'project:eventType'
      }
    }
  },
  queries(self, query) {
    return {
      builders: {
        // `when('upcoming')` or `when('past')`. Has choices, so event-page can
        // list it in `piecesFilters` and get `/events/when/past`.
        when: {
          launder(value) {
            return [ 'upcoming', 'past' ].includes(value) ? value : null;
          },
          finalize() {
            const when = query.get('when');
            if (!when) {
              return;
            }
            const today = self.today();
            query.and({
              startDate: (when === 'upcoming') ? { $gte: today } : { $lt: today }
            });
          },
          choices() {
            return [
              {
                label: 'project:eventsUpcoming',
                value: 'upcoming'
              },
              {
                label: 'project:eventsPast',
                value: 'past'
              }
            ];
          }
        }
      }
    };
  },
  components(self) {
    return {
      async upcoming(req, data) {
        const query = self.find(req)
          .when('upcoming')
          .limit(data.limit || 3);
        if (data.eventType && (data.eventType !== 'all')) {
          query.eventType(data.eventType);
        }
        return {
          events: await query.toArray(),
          display: data.display,
          // Component templates don't receive the page's `data.locale`.
          locale: req.locale
        };
      }
    };
  },
  methods(self) {
    return {
      today() {
        return dayjs().format('YYYY-MM-DD');
      },
      eventTypes() {
        return eventTypes;
      }
    };
  }
};
