<template>
  <v-card class="characters-card">
    <v-card-title class="headline">Characters</v-card-title>
    <v-card-text>
      <v-list three-line v-if="!isLoading && characters.length > 0">
        <template v-for="(character, i) in characters">
          <v-list-tile avatar :key="i">
            <v-list-tile-avatar :tile="true" :size="60" class="mr-3">
              <img :src="`https://www.bungie.net${character.emblem}`">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="title">{{character.class}}</v-list-tile-title>
              <v-list-tile-sub-title>Last played {{formatDate(character.lastPlayed)}}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{character.minutesPlayedThisSession}} minutes</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <p class="light title">{{character.light}}</p>
              <p class="level">{{character.level}}</p>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>

      <div class="loader" v-else-if="isLoading">
        <p class="sr-only">Loading</p>
        <v-progress-circular color="yellow" :size="100" indeterminate></v-progress-circular>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
export default {
  name: 'characters',
  mixins: [dateFormatter],
  data() {
    return {
      isLoading: false,
      characters: []
    }
  },
  props: {
    membershipId: {
      required: true,
      type: String
    }
  },
  methods: {
    ...mapActions(['getCharactersForMember'])
  },
  mounted() {
    this.isLoading = true
    this.getCharactersForMember(this.membershipId)
      .then(characters => {
        this.characters = characters
        this.isLoading = false
      })
      .catch(error => {
        console.error(error)
        this.isLoading = false
      })
  }
}
</script>

<style scoped>
.sr-only {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  width: 1px;
  word-wrap: normal !important;
}

.loader {
  display: flex;
  justify-content: center;
  height: 100%;
}

.light {
  color: #ffeb3b;
}
</style>
