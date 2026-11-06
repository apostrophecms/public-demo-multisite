import linkConfig from '../../lib/link.js';

// A call-to-action for the public: who to ring about a swarm. The number
// defaults to the swarm hotline in the site's global settings, so one change
// there updates every page.

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:swarmHotlineWidget',
    description: 'project:swarmHotlineDescription',
    icon: 'phone-icon'
  },
  icons: {
    'phone-icon': 'Phone'
  },
  fields: {
    add: {
      heading: {
        label: 'project:heading',
        type: 'string',
        def: 'Seen a swarm?'
      },
      text: {
        label: 'project:text',
        type: 'string',
        textarea: true,
        def: 'Don\'t panic, and please don\'t spray them. Swarming bees are rarely aggressive. Call our volunteer collectors and we\'ll find them a new home.'
      },
      phone: {
        label: 'project:swarmHotlinePhone',
        help: 'project:swarmHotlinePhoneHelp',
        type: 'string'
      },
      _image: {
        label: 'project:image',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1,
        aspectRatio: [ 1, 1 ]
      },
      ...linkConfig.link
    }
  }
};
