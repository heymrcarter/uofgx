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
          :items="characterDropdownOptions"
          :value="selectedCharacter"
          @change="selectedCharacterChanged"></v-select>
      </v-flex>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import analytics from '@/mixins/analytics'
export default {
  name: 'character-selector',
  mixins: [analytics],
  data() {
    return {
      selectedCharacter: undefined
    }
  },
  computed: {
    ...mapState('characters', {
      characters(state) {
        return state.memberCharacters[this.membershipId]
      }
    }),
    membershipId() {
      return this.$route.params.membershipId
    },
    selectedCharacterClass() {
      return this.characters.find(c => c.characterId === this.selectedCharacter).class
    },
    selectedCharacterLight() {
      return this.characters.find(c => c.characterId === this.selectedCharacter).light
    },
    characterDropdownOptions() {
      if (this.characters) {
        return this.characters.map((character, i) => {
          return {
            text: `${character.class} (${character.light})`,
            value: character.characterId
          }
        })
      } else {
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
