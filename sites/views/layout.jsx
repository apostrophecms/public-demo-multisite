// Top-level project layout. Extends Apostrophe's outerLayout (a Nunjucks
// template) and accepts these named props from page templates:
//
//   title       string used as the document <title>, overriding the
//               piece/page title. Templates with no page or piece in scope
//               (notFound.jsx) rely on this.
//   bodyClass   string appended to <body class>
//   pageTitle   JSX node rendered in place of the default page-title block
//   breadcrumbs JSX node rendered in place of the default breadcrumb trail
//   main        JSX node providing the page's main content
//
// Extending a Nunjucks template from JSX uses the bridge implemented in
// `jsxRender.js`: each prop becomes a {% block %} override on the
// underlying Nunjucks template.

import locales from './locales.jsx';
import Logo from './logo.jsx';

function defaultTitle(data) {
  const piece = data.piece && data.piece.title;
  const page = data.page && data.page.title;
  return piece || page;
}

function siteTitle(data) {
  return (data.global && data.global.siteTitle) || 'ApostropheCMS Demo';
}

function logoUrls(data, apos) {
  const logoAttachment = apos.image.first(data.global && data.global._siteLogo);
  const logoAttachmentDark = apos.image.first(data.global && data.global._siteLogoDark);
  return {
    logoAttachment,
    logoAttachmentDark,
    logoUrl: logoAttachment && apos.attachment.url(logoAttachment, { size: 'one-third' }),
    logoUrlDark: logoAttachmentDark && apos.attachment.url(logoAttachmentDark, { size: 'one-third' })
  };
}

function NavLinks({ data }) {
  const homeSlug = data.home && data.home.slug;
  const pageSlug = data.page && data.page.slug;
  const children = (data.home && data.home._children) || [];
  return (
    <ul>
      <li>
        <a
          className={pageSlug === homeSlug ? 'active' : undefined}
          href={data.home && data.home._url}
        >
          {data.home && data.home.title}
        </a>
      </li>
      {children.map((page) => page.visibility === 'public' && (
        <li>
          <a
            className={pageSlug === page.slug ? 'active' : undefined}
            href={page._url}
          >
            {page.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Breadcrumbs({ data }) {
  const ancestors = (data.page && data.page._ancestors) || [];
  if (!ancestors.length) {
    return null;
  }
  return (
    <div className="layout">
      <nav className="breadcrumb">
        {ancestors.map((page) => (
          <a href={page._url}>{page.title}</a>
        ))}
        <a
          className={!data.piece ? 'current-page' : undefined}
          href={data.page && data.page._url}
        >
          {data.page && data.page.title}
        </a>
        {data.piece && (
          <a className="current-page" href={data.piece._url}>{data.piece.title}</a>
        )}
      </nav>
    </div>
  );
}

function PageTitle({ data }) {
  const title = (data.piece && data.piece.title) || (data.page && data.page.title);
  return (
    <div className="page-title-wrapper">
      <h1 className="page-title">{title}</h1>
    </div>
  );
}

// Preload the webfonts so text paints in the real face rather than swapping
// in later (`font-display: swap` otherwise reflows the page mid-render).
//
// The filenames must match what the built CSS actually requests. Vite
// fingerprints the fonts referenced by `@font-face` in `_global.scss`, so the
// source path (`/modules/asset/fonts/poppins.subset.woff2`) is NOT the URL the
// browser asks for (`/assets/poppins.subset-DvBIGq--.woff2`). Preloading the
// source path downloads every font twice and warms nothing.
//
// So read the hashed names back out of the build manifest instead of hardcoding
// them. `entrypoints[].manifest.files.assets` is populated after a successful
// build; in dev it is empty and we emit no preloads, which is correct because
// the Vite dev server serves fonts unhashed.
//
// Note: `currentBuildManifest` is internal to @apostrophecms/asset, not
// documented public API. If a future release reshapes it, this degrades to
// rendering no preload tags rather than breaking the page.
function preloadedFonts(apos) {
  const entrypoints = apos.asset.currentBuildManifest?.entrypoints || [];
  const assets = entrypoints.flatMap((entrypoint) => entrypoint.manifest?.files?.assets || []);
  return [ ...new Set(assets) ].filter((asset) => asset.endsWith('.woff2'));
}

function ExtraHead({ apos }) {
  return (
    <>
      {preloadedFonts(apos).map((font) => (
        <link
          rel="preload"
          href={apos.asset.url(`/${font}`)}
          as="font"
          type="font/woff2"
          crossorigin
        />
      ))}
    </>
  );
}

function Header({ data, apos }) {
  const {
    logoAttachment, logoAttachmentDark, logoUrl, logoUrlDark
  } = logoUrls(data, apos);
  return (
    <header className="header">
      <div className="nav-bar">
        <h2>
          {/* Locale-aware: a hardcoded "/" sends visitors from /fr or /de to
              the English home page. data.home._url carries the locale prefix. */}
          <a href={(data.home && data.home._url) || '/'}>
            {logoAttachment
              ? (
                <img
                  id="nav-logo"
                  src={logoUrl}
                  alt={data.global && data.global.siteTitle}
                  width={apos.attachment.getWidth(logoAttachment) || '100'}
                  height={apos.attachment.getHeight(logoAttachment) || '36'}
                  data-dark-url={logoAttachmentDark ? logoUrlDark : undefined}
                  data-light-url={logoUrl}
                />
              )
              : (
                data.global && data.global.siteTitle
              )
            }
          </a>
        </h2>
        <nav className="nav" role="navigation">
          <NavLinks data={data} />
        </nav>
        <div className="nav-bar__end">
          {locales(data, apos)}
        </div>
        <button className="nav__mobile-button" data-mobile-trigger aria-controls="mobile-nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu-icon lucide-menu"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
}

function MobileNav({ data, apos }) {
  return (
    <div className="mobile-nav" data-mobile-nav="hidden" aria-hidden="true">
      <button className="mobile-nav__close-trigger" data-mobile-close-trigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span>Close</span>
      </button>
      <nav id="mobile-nav" className="mobile-nav__nav" role="navigation">
        <NavLinks data={data} />
      </nav>
      <div className="mobile-nav__locales">
        {locales(data, apos)}
      </div>
    </div>
  );
}

function Footer({ data }) {
  return (
    <footer className="footer">
      <div className="footer__section footer__top">
        <div className="footer__column footer__column--logo">
          <a href={(data.home && data.home._url) || '/'} className="footer__logo">
            <Logo />
          </a>
        </div>
        <div className="footer__column">
          <h4>Explore ApostropheCMS</h4>
          <ul>
            <li><a href="http://apostrophecms.com/?utm_source=demo" target="_blank" rel="noopener noreferrer">ApostropheCMS.com</a></li>
            <li><a href="https://docs.apostrophecms.org/?utm_source=demo" target="_blank" rel="noopener noreferrer">ApostropheCMS Docs</a></li>
            <li><a href="https://docs.apostrophecms.org/guide/development-setup.html?utm_source=demo" target="_blank" rel="noopener noreferrer">Getting Started</a></li>
            <li><a href="https://apostrophecms.com/assembly?utm_source=demo" target="_blank" rel="noopener noreferrer">ApostropheCMS Multisite</a></li>
            <li><a href="https://meetings.hubspot.com/tom-boutell/demo-meeting?utm_source=demo" target="_blank" rel="noopener noreferrer">Book a Call</a></li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>Product</h4>
          <ul>
            <li><a href="https://apostrophecms.com/extensions?license=pro&utm_source=demo" target="_blank" rel="noopener noreferrer">Pro Feature</a></li>
            <li><a href="https://apostrophecms.com/hosting?utm_source=demo" target="_blank" rel="noopener noreferrer">Hosting</a></li>
            <li><a href="https://apostrophecms.com/blog?category=product-updates&utm_source=demo" target="_blank" rel="noopener noreferrer">Changelog</a></li>
            <li><a href="https://apostrophecms.com/accessibility?utm_source=demo" target="_blank" rel="noopener noreferrer">Accessibility</a></li>
            <li><a href="https://apostrophecms.com/security?utm_source=demo" target="_blank" rel="noopener noreferrer">Security</a></li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>Social Media</h4>
          <ul>
            <li><a href="https://bsky.app/profile/apostrophecms.com" target="_blank" rel="noopener noreferrer">Bluesky</a></li>
            <li><a href="https://x.com/apostrophecms" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
            <li><a href="https://discord.com/invite/HwntQpADJr" target="_blank" rel="noopener noreferrer">Join the Discord</a></li>
            <li><a href="https://youtube.com/c/apostrophecms" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://www.linkedin.com/company/apostrophecms/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function ModeSwitch() {
  return (
    <div className="mode-switch" data-mode-switch>
      <label htmlFor="light-dark-toggle">
        <span className="sr-only">Toggle dark mode</span>
        <input
          className="toggle-checkbox"
          type="checkbox"
          name="light-dark-toggle"
          id="light-dark-toggle"
          role="switch"
          aria-label="Toggle dark mode"
        />
        <div className="toggle-slot">
          <div className="sun-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="sun-icon"
            >
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </g>
            </svg>
          </div>
          <div className="toggle-button" />
          <div className="moon-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="moon-icon"
            >
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79" />
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
}

export default function (data, { Extend, apos }) {
  // `data.title` is how a page template overrides the document title — the
  // JSX equivalent of Nunjucks `{% block title %}`.
  const title = data.title || defaultTitle(data);

  if (!title) {
    apos.util.log('Looks like you forgot to override the title block in a template that does not have access to an Apostrophe page or piece.');
  }

  return (
    <Extend
      templateName={data.outerLayout}
      title={title ? `${title} - ${siteTitle(data)}` : siteTitle(data)}
      bodyClass={data.bodyClass || ''}
      extraHead={<ExtraHead apos={apos} />}
      main={
        <>
          <Header data={data} apos={apos} />
          <MobileNav data={data} apos={apos} />
          {data.breadcrumbs !== undefined ? data.breadcrumbs : <Breadcrumbs data={data} />}
          {data.pageTitle !== undefined ? data.pageTitle : <PageTitle data={data} />}
          <div className="layout">
            <main>
              {data.main}
            </main>
          </div>
          <Footer data={data} />
        </>
      }
      extraBody={<ModeSwitch />}
    />
  );
}
