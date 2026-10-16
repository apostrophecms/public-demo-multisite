import themes from '../../../themes.js';
import baseUrlDomains from '../../../domains.js';

export default {
  options: {
    themes,
    baseUrlDomains,
    localizedSites: true
  },
  fields: {
    add: {
      // Read by `sites/index.js` and passed to the `url-remap` module
      frontendBaseUrl: {
        type: 'url',
        label: 'Frontend Base URL',
        help: 'Optional. When this site is served by a separate frontend, page and piece links are rewritten to this origin (e.g. https://www.example.com) for visitors and API clients. Editors still see the CMS domain.'
      }
    },
    group: {
      frontend: {
        label: 'Frontend',
        fields: [ 'frontendBaseUrl' ]
      }
    }
  }
};
