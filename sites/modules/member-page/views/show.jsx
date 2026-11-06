// A member's profile: their bio beside a panel of beekeeping details and the
// ways they help the association.

import {
  Avatar, RoleChips, Experience
} from './fragments.jsx';

const hiveTypeLabels = {
  langstroth: 'project:hiveLangstroth',
  warre: 'project:hiveWarre',
  topBar: 'project:hiveTopBar',
  flow: 'project:hiveFlow',
  observation: 'project:hiveObservation'
};

const membershipLabels = {
  full: 'project:membershipFull',
  family: 'project:membershipFamily',
  junior: 'project:membershipJunior',
  honorary: 'project:membershipHonorary'
};

export default function (data, {
  Extend, Area, apos, __t
}) {
  const member = data.piece;
  const roles = member.roles || [];
  const hiveTypes = (member.hiveTypes || []).map((type) => __t(hiveTypeLabels[type]));
  const rolesUrl = (role) => data.page._url + apos.url.getChoiceFilter('roles', role, 1);

  return (
    <Extend
      templateName="layout.jsx"
      pageTitle={
        <div className="listing-title member-profile-title">
          <div className="layout">
            <Avatar member={member} apos={apos} size="large" />
            <h1 className="page-title">{member.title}</h1>
            {member.town && <p className="listing-title__subtitle">{member.town}</p>}
            <RoleChips member={member} apos={apos} __t={__t} />
          </div>
        </div>
      }
      main={
        <div className="detail-layout">
          <article className="detail-layout__main general-content">
            <Experience member={member} apos={apos} __t={__t} />
            {apos.area.isEmpty(member, 'bio')
              ? <p className="placeholder">{__t('project:memberNoBio')}</p>
              : <Area doc={member} name="bio" />
            }
            {roles.includes('swarmCollector') && (
              <section className="member-help">
                <h2>{__t('project:roleSwarmCollector')}</h2>
                {member.swarmArea && <p>{__t('project:swarmCovers')} {member.swarmArea}</p>}
                {member.swarmPhone && (
                  <p>
                    <a
                      className="button button--small"
                      href={`tel:${member.swarmPhone.replace(/[^\d+]/g, '')}`}
                    >
                      {__t('project:swarmCall', { phone: member.swarmPhone })}
                    </a>
                  </p>
                )}
              </section>
            )}
            {roles.includes('honeySeller') && member.honeyNote && (
              <section className="member-help">
                <h2>{__t('project:roleHoneySeller')}</h2>
                <p>{member.honeyNote}</p>
              </section>
            )}
          </article>
          <aside className="detail-panel">
            <dl>
              {member.membershipType && (
                <>
                  <dt>{__t('project:membershipType')}</dt>
                  <dd>{__t(membershipLabels[member.membershipType])}</dd>
                </>
              )}
              {member.memberSince && (
                <>
                  <dt>{__t('project:memberSince')}</dt>
                  <dd>{member.memberSince}</dd>
                </>
              )}
              {member.beekeepingSince && (
                <>
                  <dt>{__t('project:beekeepingSince')}</dt>
                  <dd>{member.beekeepingSince}</dd>
                </>
              )}
              {member.colonies > 0 && (
                <>
                  <dt>{__t('project:colonies')}</dt>
                  <dd>{member.colonies}</dd>
                </>
              )}
              {hiveTypes.length > 0 && (
                <>
                  <dt>{__t('project:hiveTypes')}</dt>
                  <dd>{hiveTypes.join(', ')}</dd>
                </>
              )}
            </dl>
            {roles.length > 0 && (
              <ul className="detail-panel__links">
                {roles.map((role) => (
                  <li>
                    <a href={rolesUrl(role)}>
                      {__t('project:seeAllRole', { role: __t(apos.member.roleLabel(role)) })}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <a className="detail-panel__back" href={data.page._url}>
              {__t('project:membersBack')}
            </a>
          </aside>
        </div>
      }
    />
  );
}
