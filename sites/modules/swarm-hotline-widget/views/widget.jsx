// The swarm call-to-action: heading, reassurance, a tap-to-call number and an
// optional link to a fuller "what to do" page.

export default function (data, { Template, apos, __t }) {
  const widget = data.widget;
  const phone = widget.phone || (data.global && data.global.swarmHotline);
  const attachment = apos.image.first(widget._image);
  return (
    <aside className="widget swarm-hotline-widget">
      {attachment && (
        <img
          className="swarm-hotline-widget__image"
          loading="lazy"
          src={apos.attachment.url(attachment, { size: 'one-third' })}
          alt={attachment._alt || ''}
          width={apos.attachment.getWidth(attachment)}
          height={apos.attachment.getHeight(attachment)}
        />
      )}
      <div className="swarm-hotline-widget__body">
        {widget.heading && <h2 className="swarm-hotline-widget__heading">{widget.heading}</h2>}
        {widget.text && <p>{widget.text}</p>}
        <div className="swarm-hotline-widget__actions">
          {phone
            ? (
              <a className="swarm-hotline-widget__phone" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
                {phone}
              </a>
            )
            : <p className="placeholder">{__t('project:swarmHotlineMissing')}</p>
          }
          {widget.linkText && (
            <Template
              templateName="link.jsx"
              label={widget.linkText}
              path={apos.helper.linkPath(widget)}
              target={widget.linkTarget}
              linkClass="button button--outline"
            />
          )}
        </div>
      </div>
    </aside>
  );
}
