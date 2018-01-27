export function mapCharacters(charactersResponse) {
  const characters = []
  Object.keys(charactersResponse).forEach(key => {
    const characterObject = charactersResponse[key]
    const character = {
      lastPlayed: characterObject.dateLastPlayed,
      minutesPlayedThisSession: characterObject.minutesPlayedThisSession,
      light: characterObject.light,
      emblem: characterObject.emblemBackgroundPath,
      level: characterObject.levelProgression.level
    }

    switch (characterObject.classType) {
      case 0:
        character.class = 'Titan'
        break
      case 1:
        character.class = 'Hunter'
        break
      case 2:
        character.class = 'Warlock'
        break
    }

    characters.push(character)
  })

  return characters
}
