// The membership directory: every member visible to the visitor, with one
// filter chip per role (`/roles/mentor`, `/roles/swarmCollector`, ...).

import Pager, { activeFilter, filterPageUrl } from '../../../views/pager.jsx';
import { MemberCard } from './fragments.jsx';

export default function (data, {
  Extend, Area, apos, helpers, __t
}) {
  const page = data.page;
  const filters = data.filters || [];
  const active = activeFilter(filters);
  const roleChoices = (filters.find((filter) => filter.name === 'roles') || {}).choices || [];
  const members = data.pieces || [];

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
                  {__t('project:allMembers')}
                </a>
              </li>
              {roleChoices.map((choice) => (
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
        <section className="member-index">
          <header className="listing-intro general-content">
            <Area doc={page} name="intro" />
          </header>
          {members.length === 0 && (
            <p className="placeholder">{__t('project:membersNone')}</p>
          )}
          <div className="member-grid">
            {members.map((member) => (
              <MemberCard
                member={member}
                show={active && active.value}
                apos={apos}
                __t={__t}
              />
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
