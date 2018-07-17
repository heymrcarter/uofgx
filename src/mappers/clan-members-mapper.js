import sort from 'fast-sort'

function sortByMemberType(member) {
  switch (member.memberType) {
    case 0:
      return 5
    case 1:
      return 4
    case 2:
      return 3
    case 3:
      return 2
    case 4:
      return 1
    case 5:
      return 0
  }
}

export function mapResponseToView(results) {
  let members = results.map(result => {
    return {
      memberType: result.memberType,
      joinDate: result.joinDate,
      isOnline: result.isOnline,
      bungieNetAvatar: result.bungieNetUserInfo ? `https://bungie.net/${result.bungieNetUserInfo.iconPath}` : '',
      bungieNetUserName: result.bungieNetUserInfo ? result.bungieNetUserInfo.displayName : '',
      xboxUserName: result.destinyUserInfo.displayName,
      bungieNetMembershipId: result.bungieNetUserInfo ? result.bungieNetUserInfo.membershipId : '',
      xboxMembershipId: result.destinyUserInfo.membershipId,
      xboxMembershipType: result.destinyUserInfo.membershipType
    }
  })

  return sort(members).asc([m => sortByMemberType(m), m => new Date(m.joinDate), m => m.xboxUserName.toLowerCase()])
}
