export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'project:eventPage',
    pluralLabel: 'project:eventPages',
    perPage: 12,
    // With `static: true` on @apostrophecms/url these become
    // `/events/when/past` and `/events/eventType/apiary`.
    piecesFilters: [
      { name: 'when' },
      { name: 'eventType' }
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
  },
  extendMethods(self) {
    return {
      // A calendar shows what's coming up unless the visitor asks for the
      // archive, which reads best newest first.
      indexQuery(_super, req) {
        const query = _super(req);
        if (!query.get('when')) {
          query.when('upcoming');
        }
        if (query.get('when') === 'past') {
          query.sort({
            startDate: -1,
            startTime: -1
          });
        }
        return query;
      }
    };
  }
};
