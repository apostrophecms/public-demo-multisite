export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'project:memberPage',
    pluralLabel: 'project:memberPages',
    perPage: 24,
    // `/members/roles/mentor`, `/members/roles/swarmCollector`, ...
    piecesFilters: [
      { name: 'roles' }
    ]
  },
  fields: {
    add: {
      intro: {
        label: 'project:intro',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'project:basics',
        fields: [ 'intro' ]
      }
    }
  }
};
