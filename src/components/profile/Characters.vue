<template>
  <v-card class="characters-card">
    <v-card-title class="headline">Characters</v-card-title>
    <v-card-text>
      <ul class="characters" v-if="!isLoading && characters.length > 0">
        <li
          v-for="(character, i) in characters"
          :key="i"
          class="character">
          <div class="character-emblem"><img :src="`https://bungie.net/${character.emblem}`"></div>
          <div class="character-details">
            <span class="class">{{character.class}}</span>
            <div class="last-played">
              <span class="last-played-date">Last played {{formatDate(character.lastPlayed)}}</span>
              <span class="last-played-duration">{{character.minutesPlayedThisSession}} minutes</span>
            </div>
            <span class="light">{{character.light}}</span>
            <span class="level">{{character.level}}</span>
          </div>
        </li>
      </ul>
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

.characters {
  list-style: none;
}

.characters .character {
  display: block;
  height: 96px;
  position: relative;
  margin-bottom: 20px;
  max-width: 474px;
}

.characters .character .character-emblem {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 474px;
  height: 96px;
  max-width: 100%;
}

.characters .character .character-emblem img {
  z-index: 9000;
  max-width: 100%;
}

.characters .character .character-details {
  z-index: 9999;
  color: white;
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 96px;
  text-shadow: #000 1px 1px 5px;
}

.characters .character .character-details .class {
  position: absolute;
  top: 7px;
  left: 100px;
  font-size: 18px;
  font-weight: bold;
}

.characters .character .character-details .last-played {
  position: absolute;
  top: 32px;
  left: 100px;
  font-size: 14px;
}

.characters .character .character-details .last-played span {
  display: block;
}

.characters .character .character-details .light {
  position: absolute;
  top: 7px;
  right: 20px;
  font-size: 18px;
  font-weight: bold;
}

.characters .character .character-details .level {
  position: absolute;
  top: 32px;
  right: 20px;
  font-size: 20px;
}
</style>
