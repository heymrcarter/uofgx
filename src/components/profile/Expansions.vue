<template>
  <v-card height="100%" class="expansions">
    <v-card-title>
      <h3 class="headline">Expansions</h3>
      <v-icon v-if="hasAllExpansions === false">warning</v-icon>
    </v-card-title>
    <v-card-text>
      <loadable-indicator v-if="isLoading"></loadable-indicator>
      <loadable-failure
        v-else-if="loadError"
        message="Failed to load expansions"
        :retryable="true"
        @retry="reload"></loadable-failure>
      <v-list v-else>
        <template v-for="(expansion, i) in loadResult">
          <v-list-tile avatar :key="i">
            <v-list-tile-avatar><img :src="getExpansionIcon(expansion)"></v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ expansion }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset :key="expansion"></v-divider>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import loadable from '@/mixins/loadable'
import LoadableFailure from '@/components/LoadableFailure'
import LoadableIndicator from '@/components/LoadableIndicator'

const d2 = require('../../assets/d2.png')
const coo = require('../../assets/coo.png')
const wm = require('../../assets/wm.png')
const forsaken = require('../../assets/forsaken.png')
const ba = require('../../assets/ba.png')
const jw = require('../../assets/jw.png')
const penumbra = require('../../assets/penumbra.png')

export default {
  name: 'expansions',
  mixins: [loadable],
  data() {
    return {
      loadAction: 'members/getExpansions',
      loadParams: this.$route.params.membershipId,
      actionOptions: { root: true }
    }
  },
  methods: {
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
    }
  },
  computed: {
    hasAllExpansions() {
      if (this.loadResult) {
        return this.loadResult.length >= 4
      }
    }
  },
  components: {
    LoadableFailure,
    LoadableIndicator
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
