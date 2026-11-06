import linkConfig from '../../lib/link.js';

// A photograph with a heading and buttons laid over it. The hero widget's
// image-led sibling, for the top of the home page and section landing pages.

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:banner',
    description: 'project:bannerDescription',
    icon: 'image-area-icon'
  },
  icons: {
    'image-area-icon': 'ImageArea'
  },
  fields: {
    add: {
      _image: {
        label: 'project:image',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1,
        required: true
      },
      content: {
        label: 'project:textContent',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'styles', 'bold', 'italic', 'link' ],
              styles: [
                {
                  tag: 'p',
                  label: 'project:rtParagraph'
                },
                {
                  tag: 'p',
                  class: 'large',
                  label: 'project:rtParagraphLarge'
                },
                {
                  tag: 'h2',
                  label: 'project:rtH2'
                },
                {
                  tag: 'h6',
                  class: 'meta',
                  label: 'project:rtMetaH6'
                }
              ]
            }
          }
        }
      },
      links: {
        label: 'project:buttonLinks',
        type: 'array',
        titleField: 'linkText',
        fields: {
          add: {
            ...linkConfig.link,
            style: {
              type: 'select',
              label: 'project:style',
              def: 'primary',
              choices: [
                {
                  label: 'project:primary',
                  value: 'primary'
                },
                {
                  label: 'project:outline',
                  value: 'outline'
                }
              ]
            }
          }
        }
      },
      height: {
        label: 'project:bannerHeight',
        type: 'select',
        def: 'tall',
        choices: [
          {
            label: 'project:bannerMedium',
            value: 'medium'
          },
          {
            label: 'project:bannerTall',
            value: 'tall'
          }
        ]
      },
      align: {
        label: 'project:align',
        type: 'radio',
        buttons: true,
        def: 'left',
        choices: [
          {
            label: 'project:left',
            value: 'left',
            icon: 'format-align-left-icon'
          },
          {
            label: 'project:center',
            value: 'center',
            icon: 'format-align-center-icon'
          }
        ]
      }
    }
  }
};
