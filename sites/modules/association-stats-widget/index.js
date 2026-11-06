// "312 members · 1,140 colonies · 18 mentors": headline numbers for the
// association. Most come live from the member and event pieces, so they stay
// true without anyone editing the page; "custom" covers anything else.

const sources = [
  {
    label: 'project:statMembers',
    value: 'members'
  },
  {
    label: 'project:statColonies',
    value: 'colonies'
  },
  {
    label: 'project:statMentors',
    value: 'mentors'
  },
  {
    label: 'project:statSwarmCollectors',
    value: 'swarmCollectors'
  },
  {
    label: 'project:statUpcomingEvents',
    value: 'upcomingEvents'
  },
  {
    label: 'project:statYearsActive',
    value: 'yearsActive'
  },
  {
    label: 'project:statCustom',
    value: 'custom'
  }
];

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:associationStats',
    description: 'project:associationStatsDescription',
    icon: 'chart-box-icon'
  },
  icons: {
    'chart-box-icon': 'ChartBox'
  },
  fields: {
    add: {
      stats: {
        label: 'project:stats',
        type: 'array',
        titleField: 'label',
        min: 1,
        def: [
          {
            source: 'members',
            label: 'Members'
          },
          {
            source: 'colonies',
            label: 'Colonies'
          },
          {
            source: 'mentors',
            label: 'Mentors'
          }
        ],
        fields: {
          add: {
            source: {
              label: 'project:statSource',
              type: 'select',
              def: 'members',
              choices: sources
            },
            value: {
              label: 'project:statValue',
              help: 'project:statValueHelp',
              type: 'string',
              if: {
                source: 'custom'
              }
            },
            label: {
              label: 'project:statLabel',
              type: 'string',
              required: true
            }
          }
        }
      }
    }
  },
  extendMethods(self) {
    return {
      async load(_super, req, widgets) {
        await _super(req, widgets);
        const wanted = new Set(widgets.flatMap((widget) => (widget.stats || [])
          .map((stat) => stat.source)));
        const counts = await self.getCounts(req, wanted);
        for (const widget of widgets) {
          for (const stat of widget.stats || []) {
            stat._value = (stat.source === 'custom')
              ? stat.value
              : counts[stat.source];
          }
        }
      }
    };
  },
  methods(self) {
    return {
      // Only computes what some widget on the page asked for. Counts respect
      // `req`, so profiles with "login required" visibility are counted only
      // for signed-in visitors, matching what the directory shows them.
      async getCounts(req, wanted) {
        const counts = {};
        const { member, event } = self.apos;
        if (wanted.has('members')) {
          counts.members = await member.find(req).toCount();
        }
        if (wanted.has('colonies')) {
          const profiles = await member.find(req).project({ colonies: 1 }).toArray();
          counts.colonies = profiles
            .reduce((sum, { colonies }) => sum + (colonies || 0), 0);
        }
        if (wanted.has('mentors')) {
          counts.mentors = await member.find(req).roles('mentor').toCount();
        }
        if (wanted.has('swarmCollectors')) {
          counts.swarmCollectors = await member.find(req).roles('swarmCollector').toCount();
        }
        if (wanted.has('upcomingEvents')) {
          counts.upcomingEvents = await event.find(req).when('upcoming').toCount();
        }
        if (wanted.has('yearsActive')) {
          const global = await self.apos.global.findGlobal(req);
          counts.yearsActive = global && global.founded
            ? new Date().getFullYear() - global.founded
            : null;
        }
        return counts;
      }
    };
  }
};
