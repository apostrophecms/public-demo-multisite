// Home page. Sets the body class, supplies the page title, and renders the
// page's `main` area inside the home wrapper.
//
// Beekeeping platform: diverges from public-demo deliberately. The home page
// opens with a banner widget, so the visible "Home" chip title is replaced by
// a visually hidden <h1> naming the association, which keeps one <h1> per page.

export default function (data, { Extend, Area }) {
  const siteTitle = (data.global && data.global.siteTitle) || data.page.title;
  return (
    <Extend
      templateName="layout.jsx"
      bodyClass="home-page"
      pageTitle={<h1 className="sr-only">{siteTitle}</h1>}
      main={
        <div className="home">
          <div className="content">
            <div className="general-content">
              <Area doc={data.page} name="main" />
            </div>
          </div>
        </div>
      }
    />
  );
}
