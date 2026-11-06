const defaultRtConfig = {
  toolbar: [
    'styles',
    'bold',
    'italic',
    'strike',
    'link',
    'anchor',
    'bulletList',
    'orderedList',
    'blockquote',
    'alignLeft',
    'alignCenter',
    'alignRight',
    'codeBlock',
    'undo',
    'redo'
  ],
  insert: [ 'table', 'image' ],
  styles: [
    // you may also use a `class` property with these
    {
      tag: 'p',
      label: 'project:rtParagraph',
      class: null
    },
    {
      class: 'large',
      tag: 'p',
      label: 'project:rtParagraphLarge'
    },
    {
      tag: 'h2',
      label: 'project:rtH2'
    },
    {
      tag: 'h3',
      label: 'project:rtH3'
    },
    {
      tag: 'h4',
      label: 'project:rtH4'
    },
    {
      tag: 'h5',
      label: 'project:rtH5'
    },
    {
      tag: 'h6',
      label: 'project:rtMetaH6',
      class: 'meta'
    },
    {
      tag: 'span',
      class: 'highlight-red',
      label: 'project:rtHighlightRed'
    },
    {
      tag: 'span',
      class: 'highlight-seafoam',
      label: 'project:rtHighlightSeafoam'
    },
    {
      tag: 'span',
      class: 'highlight-blue',
      label: 'project:rtHighlightBlue'
    },
    {
      tag: 'span',
      class: 'highlight-mustard',
      label: 'project:rtHighlightMustard'
    },
    {
      tag: 'span',
      class: 'highlight-purple',
      label: 'project:rtHighlightPurple'
    }
  ]
};

// Widgets specific to a beekeeping association. Kept apart so they can be
// offered as their own group in the expanded widget menu.
const associationWidgets = {
  banner: {},
  'upcoming-events': {},
  members: {},
  'association-stats': {},
  'swarm-hotline': {},
  'seasonal-calendar': {}
};

const basicConfig = {
  '@apostrophecms/image': {},
  '@apostrophecms/video': {},
  '@apostrophecms/rich-text': defaultRtConfig,
  '@apostrophecms/layout': {},
  button: {},
  'github-prs': {}
};

const fullConfig = Object.assign({
  '@apostrophecms/layout': {},
  article: {},
  card: {},
  'price-card': {}
}, associationWidgets, basicConfig);

const fullConfigExpandedGroups = {
  layout: {
    label: 'project:layoutTools',
    widgets: {
      '@apostrophecms/layout': {}
    },
    columns: 1
  },
  association: {
    label: 'project:association',
    widgets: associationWidgets,
    columns: 3
  },
  media: {
    label: 'project:media',
    widgets: {
      '@apostrophecms/image': {},
      '@apostrophecms/video': {}
    },
    columns: 2
  },
  elements: {
    label: 'project:elements',
    widgets: {
      hero: {},
      button: {},
      'github-prs': {},
      '@apostrophecms/rich-text': defaultRtConfig,
      article: {},
      'price-card': {}
    },
    columns: 3
  }
};

export {
  defaultRtConfig,
  basicConfig,
  fullConfig,
  fullConfigExpandedGroups
};
