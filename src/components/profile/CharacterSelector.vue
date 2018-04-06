<template>
  <v-card class="activity-card">
    <v-card-title>
      <v-flex xs12 md9>
        <p class="headline">Character activity <span v-if="selectedCharacter !== undefined">for {{selectedCharacterClass}} ({{ selectedCharacterLight }})</span></p>
      </v-flex>

      <v-flex xs12 md3>
        <v-select
          color="yellow"
          label="Select character"
          :loading="isLoadingCharacters ? 'yellow' : false"
          :items="characterDropdownOptions"
          :value="selectedCharacter"
          @change="selectedCharacterChanged"></v-select>
      </v-flex>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import analytics from '@/mixins/analytics'
export default {
  name: 'character-selector',
  mixins: [analytics],
  data() {
    return {
      selectedCharacter: undefined,
      isLoadingCharacters: false
    }
  },
  computed: {
    ...mapGetters('members/active', ['activeMember']),
    selectedCharacterClass() {
      return this.activeMember.characters.find(c => c.characterId === this.selectedCharacter).class
    },
    selectedCharacterLight() {
      return this.activeMember.characters.find(c => c.characterId === this.selectedCharacter).light
    },
    characterDropdownOptions() {
      if (this.activeMember.characters) {
        this.isLoadingCharacters = false // eslint-disable-line
        return this.activeMember.characters.map((character, i) => {
          return {
            text: `${character.class} (${character.light})`,
            value: character.characterId
          }
        })
      } else {
        this.isLoadingCharacters = true // eslint-disable-line
        return []
      }
    }
  },
  methods: {
    selectedCharacterChanged(characterId) {
      this.recordEvent('Member Profile', 'Select', 'Character')
      this.selectedCharacter = characterId
      this.$emit('characterChanged', characterId)
    }
  }
}
</script>
