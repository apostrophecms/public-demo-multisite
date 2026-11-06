// The member module's `list` component, rendered by members-widget.

import { MemberCard } from '../../member-page/views/fragments.jsx';

export default function (data, { apos, __t }) {
  const members = data.members || [];
  return (
    <div className={`widget members-widget members-widget--${data.show}`}>
      {members.length > 0
        ? (
          <div className="member-grid">
            {members.map((member) => (
              <MemberCard member={member} show={data.show} apos={apos} __t={__t} />
            ))}
          </div>
        )
        : <p className="placeholder">{__t('project:membersNone')}</p>
      }
    </div>
  );
}
