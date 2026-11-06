export default {
  options: {
    groups: [
      {
        name: 'media',
        label: 'project:media',
        items: [
          '@apostrophecms/image',
          '@apostrophecms/file',
          '@apostrophecms/image-tag',
          '@apostrophecms/file-tag'
        ]
      }
    ],
    order: [
      '@apostrophecms/image',
      'event',
      'member',
      'resource',
      'article',
      'article-category'
    ]
  }
};
