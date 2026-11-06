import { fullConfig } from '../../lib/area.js';

// Guides, checklists and downloads: the association's library for new and
// experienced beekeepers. A resource can be a full article in `main`, a
// downloadable file, a link elsewhere, or any mix of the three.

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'resource',
    label: 'project:resource',
    pluralLabel: 'project:resources',
    sort: { title: 1 }
  },
  fields: {
    add: {
      topic: {
        label: 'project:resourceTopic',
        type: 'select',
        required: true,
        def: 'gettingStarted',
        choices: [
          {
            label: 'project:topicGettingStarted',
            value: 'gettingStarted'
          },
          {
            label: 'project:topicColonyHealth',
            value: 'colonyHealth'
          },
          {
            label: 'project:topicSeasonal',
            value: 'seasonal'
          },
          {
            label: 'project:topicSwarms',
            value: 'swarms'
          },
          {
            label: 'project:topicHoney',
            value: 'honey'
          }
        ]
      },
      level: {
        label: 'project:resourceLevel',
        type: 'select',
        def: 'beginner',
        choices: [
          {
            label: 'project:levelBeginner',
            value: 'beginner'
          },
          {
            label: 'project:levelIntermediate',
            value: 'intermediate'
          },
          {
            label: 'project:levelAdvanced',
            value: 'advanced'
          }
        ]
      },
      summary: {
        label: 'project:summary',
        type: 'string',
        textarea: true
      },
      _image: {
        label: 'project:featuredImage',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1,
        aspectRatio: [ 3, 2 ]
      },
      _file: {
        label: 'project:resourceFile',
        help: 'project:resourceFileHelp',
        type: 'relationship',
        withType: '@apostrophecms/file',
        max: 1
      },
      externalUrl: {
        label: 'project:resourceLink',
        help: 'project:resourceLinkHelp',
        type: 'url'
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
          'topic',
          'level',
          'summary'
        ]
      },
      main: {
        label: 'project:content',
        fields: [
          '_image',
          'main',
          '_file',
          'externalUrl'
        ]
      }
    }
  },
  columns: {
    add: {
      topic: {
        label: 'project:resourceTopic'
      },
      level: {
        label: 'project:resourceLevel'
      }
    }
  },
  filters: {
    add: {
      topic: {
        label: 'project:resourceTopic'
      }
    }
  },
  methods(self) {
    return {
      // The label key of a select field's value, e.g. "project:levelBeginner"
      // for `choiceLabel('level', 'beginner')`.
      choiceLabel(fieldName, value) {
        const field = self.schema.find((field) => field.name === fieldName);
        const choice = field && field.choices.find((choice) => choice.value === value);
        return choice ? choice.label : value;
      }
    };
  }
};
