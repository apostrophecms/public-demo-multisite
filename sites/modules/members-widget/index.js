import memberRoles from '../../lib/memberRoles.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:membersWidget',
    description: 'project:membersWidgetDescription',
    icon: 'account-group-icon'
  },
  icons: {
    'account-group-icon': 'AccountGroup'
  },
  fields: {
    add: {
      show: {
        label: 'project:membersShow',
        type: 'select',
        def: 'committee',
        required: true,
        choices: [
          {
            label: 'project:membersShowCommittee',
            value: 'committee'
          },
          ...memberRoles,
          {
            label: 'project:membersShowSelected',
            value: 'selected'
          }
        ]
      },
      _members: {
        label: 'project:members',
        type: 'relationship',
        withType: 'member',
        if: {
          show: 'selected'
        }
      },
      limit: {
        label: 'project:limit',
        type: 'integer',
        def: 8,
        min: 1,
        max: 24,
        if: {
          show: { $ne: 'selected' }
        }
      }
    }
  }
};
