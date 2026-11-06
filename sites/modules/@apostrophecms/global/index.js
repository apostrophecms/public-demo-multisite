export default {
  fields: {
    add: {
      siteTitle: {
        label: 'project:siteTitle',
        type: 'string',
        def: 'ApostropheCMS Site'
      },
      _siteLogo: {
        label: 'project:siteLogo',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1
      },
      _siteLogoDark: {
        label: 'project:siteLogoDark',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1
      },
      // Association details. Each site is one association, so these appear in
      // the footer and are the fallback for widgets such as the swarm hotline.
      tagline: {
        label: 'project:tagline',
        type: 'string'
      },
      founded: {
        label: 'project:founded',
        type: 'integer',
        min: 1800,
        max: 2100
      },
      contactEmail: {
        label: 'project:contactEmail',
        type: 'email'
      },
      contactPhone: {
        label: 'project:contactPhone',
        type: 'string'
      },
      swarmHotline: {
        label: 'project:swarmHotline',
        help: 'project:swarmHotlineHelp',
        type: 'string'
      },
      mailingAddress: {
        label: 'project:mailingAddress',
        type: 'string',
        textarea: true
      },
      legalNote: {
        label: 'project:legalNote',
        help: 'project:legalNoteHelp',
        type: 'string'
      },
      socialLinks: {
        label: 'project:socialLinks',
        type: 'array',
        titleField: 'platform',
        inline: true,
        fields: {
          add: {
            platform: {
              label: 'project:platform',
              type: 'select',
              required: true,
              choices: [
                {
                  label: 'Facebook',
                  value: 'Facebook'
                },
                {
                  label: 'Instagram',
                  value: 'Instagram'
                },
                {
                  label: 'Bluesky',
                  value: 'Bluesky'
                },
                {
                  label: 'YouTube',
                  value: 'YouTube'
                },
                {
                  label: 'project:newsletter',
                  value: 'Newsletter'
                }
              ]
            },
            url: {
              label: 'project:url',
              type: 'url',
              required: true
            }
          }
        }
      }
    },
    group: {
      general: {
        label: 'project:general',
        fields: [ 'siteTitle', '_siteLogo', '_siteLogoDark', 'favicon' ]
      },
      association: {
        label: 'project:association',
        fields: [
          'tagline',
          'founded',
          'contactEmail',
          'contactPhone',
          'swarmHotline',
          'mailingAddress',
          'legalNote',
          'socialLinks'
        ]
      }
    }
  }
};
