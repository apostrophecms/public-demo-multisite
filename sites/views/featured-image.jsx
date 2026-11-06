// The large image at the top of an event, member or resource page, with its
// photo credit. The credit comes from the image piece's `credit` and
// `creditUrl` fields, which apos.image.first() copies onto the attachment as
// `_credit` and `_creditUrl`; many freely licensed photos require it.

export default function FeaturedImage({ attachment, apos, __t }) {
  if (!attachment) {
    return null;
  }
  return (
    <figure className="featured-image">
      <img
        src={apos.attachment.url(attachment, { size: 'full' })}
        srcset={apos.image.srcset(attachment)}
        sizes="(max-width: 900px) 100vw, 66vw"
        alt={attachment._alt || ''}
        width={apos.attachment.getWidth(attachment)}
        height={apos.attachment.getHeight(attachment)}
      />
      {attachment._credit && (
        <figcaption className="featured-image__credit">
          {__t('project:photoCredit')}{' '}
          {attachment._creditUrl
            ? (
              <a href={attachment._creditUrl} target="_blank" rel="noopener noreferrer">
                {attachment._credit}
              </a>
            )
            : attachment._credit
          }
        </figcaption>
      )}
    </figure>
  );
}
