export default {
  options: {
    // Re-park the home page and site (dashboard)
    minimumPark: [
      {
        slug: '/',
        parkedId: 'home',
        type: '@apostrophecms/home-page',
        _defaults: {
          title: 'ApostropheCMS Demo'
        },
        _children: [
          {
            slug: '/archive',
            parkedId: 'archive',
            type: '@apostrophecms/archive-page',
            archived: true,
            orphan: true,
            title: 'Archive'
          }
        ]
      },
      {
        // Ensure /dashboard is our dashboard (instead of subdomain and /)
        slug: '/dashboard',
        parkedId: 'dashboard',
        type: 'site-page',
        _defaults: {
          title: 'Dashboard'
        }
      }
    ],
    types: [
      {
        name: 'site-page',
        label: 'Sites Index'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home Page'
      }
    ],
    quickCreate: false
  },
  methods(self, options) {
    return {
      // This ensures:
      // 1. A logged-in admin visiting the dashboard root is redirected to /dashboard
      // 2. Anyone who is not logged in is redirected to /login
      async serveNotFound(req) {
        // Ensure no bad things happen in tasks.
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        // Admins should be redirected to the dashboard
        if (url.pathname === '/' && req.user) {
          req.redirect = '/dashboard';
          return;
        }
        if (!req.user) {
          req.redirect = '/login';
          return;
        }
        if (self.isFound(req)) {
          return;
        }
        req.redirect = '/login';
      }
    };
  }
};
