import memberRoles from '../../lib/memberRoles.js';

// Association members, as listed in the membership directory (member-page).
//
// A member is a profile, not a login: most members never edit the site. Give
// a member a site account with the "guest" role if they should see content
// whose visibility is "login required", such as a members' area page.
//
// Members can keep themselves out of public view with the standard
// `visibility` field; "login required" profiles appear only to signed-in
// members.

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'member',
    label: 'project:member',
    pluralLabel: 'project:members',
    // One profile per person, shared by every locale, like author bylines.
    localized: false,
    sort: { title: 1 },
    seoFields: false,
    openGraph: false
  },
  fields: {
    add: {
      title: {
        label: 'project:memberName',
        type: 'string',
        required: true
      },
      _photo: {
        label: 'project:memberPhoto',
        help: 'project:memberPhotoHelp',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1,
        aspectRatio: [ 1, 1 ]
      },
      town: {
        label: 'project:memberTown',
        type: 'string'
      },
      membershipType: {
        label: 'project:membershipType',
        type: 'select',
        def: 'full',
        choices: [
          {
            label: 'project:membershipFull',
            value: 'full'
          },
          {
            label: 'project:membershipFamily',
            value: 'family'
          },
          {
            label: 'project:membershipJunior',
            value: 'junior'
          },
          {
            label: 'project:membershipHonorary',
            value: 'honorary'
          }
        ]
      },
      memberSince: {
        label: 'project:memberSince',
        type: 'integer',
        min: 1900,
        max: 2100
      },
      beekeepingSince: {
        label: 'project:beekeepingSince',
        type: 'integer',
        min: 1900,
        max: 2100
      },
      colonies: {
        label: 'project:colonies',
        help: 'project:coloniesHelp',
        type: 'integer',
        min: 0,
        def: 0
      },
      hiveTypes: {
        label: 'project:hiveTypes',
        type: 'checkboxes',
        choices: [
          {
            label: 'project:hiveLangstroth',
            value: 'langstroth'
          },
          {
            label: 'project:hiveWarre',
            value: 'warre'
          },
          {
            label: 'project:hiveTopBar',
            value: 'topBar'
          },
          {
            label: 'project:hiveFlow',
            value: 'flow'
          },
          {
            label: 'project:hiveObservation',
            value: 'observation'
          }
        ]
      },
      roles: {
        label: 'project:memberRoles',
        type: 'checkboxes',
        choices: memberRoles
      },
      swarmArea: {
        label: 'project:swarmArea',
        help: 'project:swarmAreaHelp',
        type: 'string'
      },
      swarmPhone: {
        label: 'project:swarmPhone',
        help: 'project:swarmPhoneHelp',
        type: 'string'
      },
      honeyNote: {
        label: 'project:honeyNote',
        help: 'project:honeyNoteHelp',
        type: 'string',
        textarea: true
      },
      committeeRole: {
        label: 'project:committeeRole',
        help: 'project:committeeRoleHelp',
        type: 'string'
      },
      committeeOrder: {
        label: 'project:committeeOrder',
        help: 'project:committeeOrderHelp',
        type: 'integer',
        def: 0
      },
      bio: {
        label: 'project:memberBio',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic', 'link', 'bulletList' ]
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: 'project:basics',
        fields: [
          'title',
          '_photo',
          'town',
          'bio'
        ]
      },
      beekeeping: {
        label: 'project:memberBeekeeping',
        fields: [
          'membershipType',
          'memberSince',
          'beekeepingSince',
          'colonies',
          'hiveTypes'
        ]
      },
      helping: {
        label: 'project:memberHelping',
        fields: [
          'roles',
          'swarmArea',
          'swarmPhone',
          'honeyNote',
          'committeeRole',
          'committeeOrder'
        ]
      }
    }
  },
  columns: {
    add: {
      town: {
        label: 'project:memberTown'
      },
      committeeRole: {
        label: 'project:committeeRole'
      }
    }
  },
  filters: {
    add: {
      roles: {
        label: 'project:memberRoles'
      }
    }
  },
  queries(self, query) {
    return {
      builders: {
        // Members holding a committee post.
        committee: {
          finalize() {
            if (query.get('committee')) {
              query.and({ committeeRole: { $nin: [ null, '' ] } });
            }
          }
        }
      }
    };
  },
  components(self) {
    return {
      // Rendered by members-widget. `show` is a role, "committee" or
      // "selected" (the editor's own picks, in their order).
      async list(req, data) {
        let members;
        if (data.show === 'selected') {
          members = data.members || [];
        } else {
          const query = self.find(req).limit(data.limit || 6);
          if (data.show === 'committee') {
            query.committee(true).sort({
              committeeOrder: 1,
              title: 1
            });
          } else {
            query.roles(data.show);
          }
          members = await query.toArray();
        }
        return {
          members,
          show: data.show
        };
      }
    };
  },
  methods(self) {
    return {
      // "Jane Q. Bloggs" => "JB", for the avatar of a member with no photo.
      initials(member) {
        const words = String(member.title || '').trim().split(/\s+/).filter(Boolean);
        if (!words.length) {
          return '?';
        }
        const first = words[0][0];
        const last = words.length > 1 ? words[words.length - 1][0] : '';
        return (first + last).toUpperCase();
      },
      // Whole years since `since`, for "keeping bees for 12 years".
      yearsSince(since) {
        return since ? Math.max(0, new Date().getFullYear() - since) : null;
      },
      roleLabel(value) {
        const role = memberRoles.find((choice) => choice.value === value);
        return role && role.label;
      }
    };
  }
};
