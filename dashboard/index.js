export default {
  root: import.meta,
  privateDashboards: true,
  modules: {
    '@apostrophecms/uploadfs': {
      options: {
        uploadfs: {
          disabledFileKey: '983y497y9H@(*UH'
        }
      }
    },
    '@apostrophecms-pro/multisite-dashboard': {},
    site: {},
    'site-page': {},
    // Use Vite bundler
    '@apostrophecms/vite': {}
  }
};
