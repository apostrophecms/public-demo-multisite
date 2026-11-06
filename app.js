import multisite from '@apostrophecms-pro/multisite';
import sites from './sites/index.js';
import dashboard from './dashboard/index.js';
import domains from './domains.js';

const env = process.env.ENV || 'local';
const protocol = (process.env.NODE_ENV === 'production') ? 'https' : 'http';
const dashboardShortName = process.env.APOS_DASHBOARD_SHORTNAME || 'dashboard';

try {
  await multisite({
    root: import.meta,
    // Distinct from the upstream public-demo-multisite prefix, so both projects
    // can run against one local MongoDB without sharing a dashboard
    shortNamePrefix: 'beekeeping-',
    // Default port, for dev
    port: 3000,
    mongodbUrl: 'mongodb://localhost:27017',
    dashboardShortName,
    sessionSecret: 'M1C0p#q(@(*#Y(WE&H',

    sites,
    dashboard,

    orphan: function (req, res) {
      const domain = domains[env] || domains.local;
      return res.redirect(`${protocol}://${dashboardShortName}.${domain}`);
    }
  });
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('An error occurred while starting the multisite application:', e);
  process.exit(1);
}
