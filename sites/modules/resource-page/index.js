export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'project:resourcePage',
    pluralLabel: 'project:resourcePages',
    perPage: 18,
    // `/learn/topic/colonyHealth`, `/learn/level/beginner`
    piecesFilters: [
      { name: 'topic' },
      { name: 'level' }
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
