<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card tile class="expansions">
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Expansions</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-list two-line>
          <template v-for="(expansion, i) in expansions">
            <v-list-tile avatar :key="i">
              <v-list-tile-avatar><img :src="getExpansionIcon(expansion)"></v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ expansion }}</v-list-tile-title>
                <v-list-tile-sub-title>Release: {{ getExpansionReleaseDate(expansion) }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset :key="expansion"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
const d2 = require('../../assets/d2.png')
const coo = require('../../assets/coo.png')
const wm = require('../../assets/wm.png')
const forsaken = require('../../assets/forsaken.png')
const ba = require('../../assets/ba.png')
const jw = require('../../assets/jw.png')
const penumbra = require('../../assets/penumbra.png')

const expansionsReleaseDates = {
  'Destiny 2': '09/06/2017',
  'Curse of Osiris': '12/05/2017',
  Warmind: '05/08/2018',
  Forsaken: '09/04/2018',
  'Black Armory': 'Winter 2018',
  Penumbra: 'Summer 2019'
}

expansionsReleaseDates[`Joker's Wild`] = 'Spring 2019'

export default {
  name: 'expansions',
  props: {
    active: Boolean
  },
  data() {
    return {}
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    getExpansionIcon(expansion) {
      switch (expansion) {
        case 'Destiny 2':
          return d2
        case 'Curse of Osiris':
          return coo
        case 'Warmind':
          return wm
        case 'Forsaken':
          return forsaken
        case 'Black Armory':
          return ba
        case `Joker's Wild`:
          return jw
        case 'Penumbra':
          return penumbra
      }
    },
    getExpansionReleaseDate(expansion) {
      return expansionsReleaseDates[expansion]
    }
  },
  computed: {
    ...mapState('members', {
      expansions(state) {
        if (state.expansions[this.membershipid]) {
          return state.expansions[this.membershipid]
        }
      }
    }),
    membershipid() {
      return this.$route.params.membershipId
    }
  }
}
</script>

<style scoped>
.expansions {
  position: relative;
}

.v-card__title {
  display: flex;
  justify-content: space-between;
}

.card__text {
  height: 100%;
}
</style>
