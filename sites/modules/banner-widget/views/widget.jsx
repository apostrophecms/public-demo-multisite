// The image fills the banner with object-fit, so it keeps its srcset; a
// gradient keeps the overlaid text readable on any photo.

export default function (data, {
  Area, Template, apos, __t
}) {
  const widget = data.widget;
  const attachment = apos.image.first(widget._image);
  const links = widget.links || [];
  return (
    <section className={`widget banner-widget banner-widget--${widget.height || 'tall'} banner-widget--align-${widget.align || 'left'}`}>
      {attachment && (
        <img
          className="banner-widget__image"
          src={apos.attachment.url(attachment, { size: 'max' })}
          srcset={apos.image.srcset(attachment)}
          sizes="(max-width: 1140px) 100vw, 1100px"
          alt={attachment._alt || ''}
          width={apos.attachment.getWidth(attachment)}
          height={apos.attachment.getHeight(attachment)}
          style={`object-position: ${apos.attachment.focalPointToObjectPosition(attachment)}`}
        />
      )}
      <div className="banner-widget__overlay">
        <div className="banner-widget__content">
          <Area doc={widget} name="content" />
        </div>
        {links.length > 0 && (
          <div className="banner-widget__buttons">
            {links.map((item) => (
              <Template
                templateName="link.jsx"
                label={item.linkText}
                path={apos.helper.linkPath(item)}
                target={item.linkTarget}
                linkClass={`button button--${item.style || 'primary'}`}
              />
            ))}
          </div>
        )}
      </div>
      {attachment && attachment._credit && (
        <p className="banner-widget__credit">
          {__t('project:photoCredit')}{' '}
          {attachment._creditUrl
            ? (
              <a href={attachment._creditUrl} target="_blank" rel="noopener noreferrer">
                {attachment._credit}
              </a>
            )
            : attachment._credit
          }
        </p>
      )}
    </section>
  );
}
