import seasonalTasks from '../../lib/seasonalTasks.js';

// "This month in the apiary": a task list per month, highlighting the current
// one. The months are editable because the beekeeping year depends on the
// local climate and hemisphere.

const months = Array.from({ length: 12 }, (_, i) => ({
  label: `project:month${i + 1}`,
  value: String(i + 1)
}));

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:seasonalCalendar',
    description: 'project:seasonalCalendarDescription',
    icon: 'calendar-month-icon'
  },
  icons: {
    'calendar-month-icon': 'CalendarMonth'
  },
  fields: {
    add: {
      display: {
        label: 'project:display',
        type: 'select',
        def: 'current',
        choices: [
          {
            label: 'project:seasonalDisplayCurrent',
            value: 'current'
          },
          {
            label: 'project:seasonalDisplayYear',
            value: 'year'
          }
        ]
      },
      months: {
        label: 'project:seasonalMonths',
        type: 'array',
        titleField: 'headline',
        def: seasonalTasks.map(({
          month, headline, tasks
        }) => ({
          month: String(month),
          headline,
          tasks: tasks.map((task) => ({ task }))
        })),
        fields: {
          add: {
            month: {
              label: 'project:month',
              type: 'select',
              required: true,
              choices: months
            },
            headline: {
              label: 'project:heading',
              type: 'string'
            },
            tasks: {
              label: 'project:seasonalTasks',
              type: 'array',
              inline: true,
              fields: {
                add: {
                  task: {
                    label: 'project:seasonalTask',
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
