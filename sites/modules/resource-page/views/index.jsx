// The resource library: a card per guide, filterable by topic or level.

import Pager, { activeFilter, filterPageUrl } from '../../../views/pager.jsx';

function ResourceCard({
  resource, apos, __t
}) {
  const attachment = apos.image.first(resource._image);
  return (
    <article className="resource-card">
      {attachment && (
        <a className="resource-card__image" href={resource._url}>
          <img
            loading="lazy"
            src={apos.attachment.url(attachment, { size: 'one-third' })}
            srcset={apos.image.srcset(attachment)}
            sizes="(max-width: 800px) 100vw, 33vw"
            alt=""
            width={apos.attachment.getWidth(attachment)}
            height={apos.attachment.getHeight(attachment)}
          />
        </a>
      )}
      <div className="resource-card__body">
        <div className="resource-card__chips">
          <span className="chip">{__t(apos.resource.choiceLabel('topic', resource.topic))}</span>
          {resource.level && (
            <span className="chip chip--muted">{__t(apos.resource.choiceLabel('level', resource.level))}</span>
          )}
        </div>
        <h3 className="resource-card__title">
          <a href={resource._url}>{resource.title}</a>
        </h3>
        {resource.summary && <p>{resource.summary}</p>}
      </div>
    </article>
  );
}

export default function (data, {
  Extend, Area, apos, helpers, __t
}) {
  const page = data.page;
  const filters = data.filters || [];
  const active = activeFilter(filters);
  const topicChoices = (filters.find((filter) => filter.name === 'topic') || {}).choices || [];
  const resources = data.pieces || [];

  return (
    <Extend
      templateName="layout.jsx"
      pageTitle={
        <div className="listing-title">
          <div className="layout">
            <h1 className="page-title">{page.title}</h1>
            <ul className="listing-filters">
              <li>
                <a href={page._url} className={!active ? 'active' : undefined}>
                  {__t('project:allTopics')}
                </a>
              </li>
              {topicChoices.map((choice) => (
                <li>
                  <a href={choice._url} className={choice.active ? 'active' : undefined}>
                    {__t(choice.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
      main={
        <section className="resource-index">
          <header className="listing-intro general-content">
            <Area doc={page} name="intro" />
          </header>
          {resources.length === 0 && (
            <p className="placeholder">{__t('project:resourcesNone')}</p>
          )}
          <div className="resource-grid">
            {resources.map((resource) => (
              <ResourceCard resource={resource} apos={apos} __t={__t} />
            ))}
          </div>
          <Pager
            current={data.currentPage}
            total={data.totalPages}
            pageUrl={filterPageUrl({
              page,
              filters,
              apos
            })}
            helpers={helpers}
          />
        </section>
      }
    />
  );
}
