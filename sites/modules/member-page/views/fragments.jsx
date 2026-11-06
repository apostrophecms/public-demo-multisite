// Member markup shared by the directory (index.jsx, show.jsx) and
// members-widget (member/views/list.jsx).
//
// Imported components get only their props, so `apos` and `__t` are passed in.

export function Avatar({
  member, apos, size = 'small'
}) {
  const attachment = apos.image.first(member._photo);
  return (
    <span className={`member-avatar member-avatar--${size}`}>
      {attachment
        ? (
          <img
            loading="lazy"
            src={apos.attachment.url(attachment, { size: size === 'large' ? 'one-half' : 'one-sixth' })}
            alt=""
            width={apos.attachment.getWidth(attachment)}
            height={apos.attachment.getHeight(attachment)}
          />
        )
        : <span aria-hidden="true">{apos.member.initials(member)}</span>
      }
    </span>
  );
}

export function RoleChips({ member, apos, __t }) {
  const roles = member.roles || [];
  if (!roles.length && !member.committeeRole) {
    return null;
  }
  return (
    <div className="member-roles">
      {member.committeeRole && <span className="chip chip--strong">{member.committeeRole}</span>}
      {roles.map((role) => (
        <span className={`chip chip--role-${role}`}>{__t(apos.member.roleLabel(role))}</span>
      ))}
    </div>
  );
}

// "Keeping bees for 12 years · 6 colonies"
export function Experience({ member, apos, __t }) {
  const years = apos.member.yearsSince(member.beekeepingSince);
  const parts = [];
  if (years !== null) {
    parts.push(years < 1
      ? __t('project:memberFirstSeason')
      : __t('project:memberYearsKeeping', { count: years }));
  }
  if (member.colonies) {
    parts.push(__t('project:memberColonyCount', { count: member.colonies }));
  }
  return parts.length ? <p className="member-experience">{parts.join(' · ')}</p> : null;
}

// What a visitor needs from a swarm collector or honey seller, shown when the
// widget or directory is listing that role.
export function RoleDetail({ member, show, __t }) {
  if (show === 'swarmCollector' && (member.swarmArea || member.swarmPhone)) {
    return (
      <p className="member-card__detail">
        {member.swarmArea && <>{__t('project:swarmCovers')} {member.swarmArea}</>}
        {member.swarmArea && member.swarmPhone && <br />}
        {member.swarmPhone && (
          <a href={`tel:${member.swarmPhone.replace(/[^\d+]/g, '')}`}>{member.swarmPhone}</a>
        )}
      </p>
    );
  }
  if (show === 'honeySeller' && member.honeyNote) {
    return <p className="member-card__detail">{member.honeyNote}</p>;
  }
  return null;
}

export function MemberCard({
  member, show, apos, __t
}) {
  return (
    <article className="member-card">
      <Avatar member={member} apos={apos} />
      <div className="member-card__body">
        <h3 className="member-card__name">
          {member._url ? <a href={member._url}>{member.title}</a> : member.title}
        </h3>
        {show === 'committee' && member.committeeRole
          ? <p className="member-card__committee">{member.committeeRole}</p>
          : member.town && <p className="member-card__town">{member.town}</p>
        }
        <RoleDetail member={member} show={show} __t={__t} />
        {show !== 'swarmCollector' && show !== 'honeySeller' && (
          <Experience member={member} apos={apos} __t={__t} />
        )}
      </div>
    </article>
  );
}
