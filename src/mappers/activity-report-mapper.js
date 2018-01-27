import sort from 'fast-sort'

function numDaysBetween(d1, d2) {
  var diff = Math.abs(d1.getTime() - d2.getTime())
  return diff / (1000 * 60 * 60 * 24)
}

export function createActivityReport(profile = {}) {
  const report = {
    gamertag: profile.userInfo.displayName,
    dateLastPlayed: profile.dateLastPlayed,
    daysSinceLastSession: numDaysBetween(new Date(), new Date(profile.dateLastPlayed)),
    characterIds: profile.characterIds,
    numberOfCharacters: profile.characters.length,
    isInactive: numDaysBetween(new Date(), new Date(profile.dateLastPlayed)) >= 30
  }

  switch (profile.versionsOwned) {
    case 1:
      report.expansions = ['Destiny 2']
      break
    case 2:
      report.expansions = ['Destiny 2', 'Curse of Osiris']
      break
    case 3:
      report.expansions = ['Destiny 2', 'Curse of Osiris', 'DLC2']
      break
  }
  report.latestExpansion = report.expansions.pop()
  return report
}

export function sortByActivity(activityReports = []) {
  return sort(activityReports).desc(r => r.daysSinceLastSession)
}
