<template>
  <v-list three-line>
    <template v-for="(character, i) in characters">
      <character-list-item :character="character" :key="i"></character-list-item>
    </template>
  </v-list>
</template>

<script>
import CharacterListItem from './CharacterListItem'
export default {
  name: 'character-list',
  components: { CharacterListItem },
  props: {
    characters: {
      type: Array,
      required: true
    }
  }
}
</script>
