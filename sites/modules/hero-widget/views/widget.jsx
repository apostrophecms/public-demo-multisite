// Rich text editable in place, optionally followed by a row of
// call-to-action buttons.

export default function (data, { Field, Template, apos }) {
  const widget = data.widget;
  const links = widget.links || [];
  return (
    <div className="widget hero-widget">
      <div className="hero-widget__content">
        {/* The `content` richText field, editable in place. `demo-rte` keeps
            the shared rich text styles the old rich text widget carried. */}
        <Field doc={widget} name="content" with={{ class: 'demo-rte hero-widget__text' }} />
      </div>
      {links.length > 0 && (
        <div className="hero-widget__buttons">
          {links.map((item) => (
            <Template
              templateName="link.jsx"
              label={item.linkText}
              path={apos.helper.linkPath(item)}
              target={item.linkTarget}
              linkClass={`button button--${item.style}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
