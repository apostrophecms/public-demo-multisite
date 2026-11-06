// A single guide, with its download and outside link in a side panel.

import FeaturedImage from '../../../views/featured-image.jsx';

export default function (data, {
  Extend, Area, apos, __t
}) {
  const resource = data.piece;
  const attachment = apos.image.first(resource._image);
  const file = resource._file && resource._file[0];
  const fileUrl = file && file.attachment && apos.attachment.url(file.attachment);
  const topicUrl = data.page._url + apos.url.getChoiceFilter('topic', resource.topic, 1);

  return (
    <Extend
      templateName="layout.jsx"
      pageTitle={
        <div className="listing-title">
          <div className="layout">
            <div className="listing-title__chips">
              <a className="chip" href={topicUrl}>
                {__t(apos.resource.choiceLabel('topic', resource.topic))}
              </a>
              {resource.level && (
                <span className="chip chip--muted">
                  {__t(apos.resource.choiceLabel('level', resource.level))}
                </span>
              )}
            </div>
            <h1 className="page-title">{resource.title}</h1>
          </div>
        </div>
      }
      main={
        <div className="detail-layout">
          <article className="detail-layout__main general-content">
            <FeaturedImage attachment={attachment} apos={apos} __t={__t} />
            {resource.summary && <p className="detail-layout__lede">{resource.summary}</p>}
            <Area doc={resource} name="main" />
          </article>
          <aside className="detail-panel">
            {fileUrl && (
              <a className="button button--small" href={fileUrl}>
                {__t('project:resourceDownload', {
                  extension: file.attachment.extension.toUpperCase()
                })}
              </a>
            )}
            {resource.externalUrl && (
              <a
                className="button button--small button--outline"
                href={resource.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {__t('project:resourceVisit')}
              </a>
            )}
            <a className="detail-panel__back" href={topicUrl}>
              {__t('project:resourcesMoreTopic', {
                topic: __t(apos.resource.choiceLabel('topic', resource.topic))
              })}
            </a>
            <a className="detail-panel__back" href={data.page._url}>
              {__t('project:resourcesBack')}
            </a>
          </aside>
        </div>
      }
    />
  );
}
