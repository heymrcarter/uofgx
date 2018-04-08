<template>
  <div>
    <v-toolbar app dark fixed>
      <v-btn to="/dashboard" icon v-if="shouldRenderBackButton">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="clan-name">{{currentPageName}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="this.roadmap">
        <v-btn flat @click="showRoadmap">Roadmap</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-dialog v-model="shouldRenderRoadmap"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay="false"
      scrollable>
      <div class="roadmap">
        <v-toolbar>
          <v-btn icon @click.native="shouldRenderRoadmap = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Roadmap</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="mt-2">
          <v-card class="mb-3">
            <v-card-title class="headline">In progress</v-card-title>
            <v-card-text>
              <v-list two-line>
                <template v-for="(item, i) in inProgress">
                  <v-list-tile :key="i">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-chip :color="getChipColor(item.type)">{{ item.type | initialCap }}</v-chip>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider :key="(i + 1) * 10" v-if="i !== inProgress.length - 1"></v-divider>
                </template>
              </v-list>
            </v-card-text>
          </v-card>

          <v-card class="mb-3">
            <v-card-title class="headline">Planned</v-card-title>
            <v-card-text>
              <v-list two-line>
                <template v-for="(item, i) in planned">
                  <v-list-tile :key="i">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-chip :color="getChipColor(item.type)">{{ item.type | initialCap }}</v-chip>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider :key="(i + 1) * 100" v-if="i !== planned.length - 1"></v-divider>
                </template>
              </v-list>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-title class="headline">Down the road</v-card-title>
            <v-card-text>
              <v-list two-line>
                <template v-for="(item, i) in downTheRoad">
                  <v-list-tile :key="i">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-chip :color="getChipColor(item.type)">{{ item.type | initialCap }}</v-chip>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider :key="(i + 1) * 1000" v-if="i !== downTheRoad.length - 1"></v-divider>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-card-text>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'app-header',
  data() {
    return {
      shouldRenderRoadmap: false
    }
  },
  filters: {
    initialCap(value) {
      let replacementValue = value.substring(0, 1).toUpperCase() + value.substring(1)
      return replacementValue
    }
  },
  computed: {
    ...mapState(['clanName']),
    ...mapState({
      roadmap(state) {
        return state.roadmap.roadmap
      }
    }),
    ...mapGetters('members/active', ['activeMember']),
    shouldRenderBackButton() {
      return this.$route.name === 'InactivePlayers' || this.$route.name === 'Profile'
    },
    currentPageName() {
      switch (this.$route.name) {
        case 'Home':
          return 'Destiny Clan Manager'
        case 'OAuth':
          return 'Processing login...'
        case 'Dashboard':
          return this.clanName
        case 'InactivePlayers':
          return 'Inactive players'
        case 'Profile':
          return this.activeMember && this.activeMember.gamertag ? this.activeMember.gamertag : 'Loading...'
        default:
          return 'Not found!'
      }
    },
    inProgress() {
      return this.roadmap ? this.roadmap['In Progress'] : []
    },
    planned() {
      return this.roadmap ? this.roadmap['Planned'] : []
    },
    downTheRoad() {
      return this.roadmap ? this.roadmap['Down the Road'] : []
    }
  },
  methods: {
    ...mapActions(['getRoadmap']),
    showRoadmap() {
      this.shouldRenderRoadmap = true
    },
    getChipColor(type) {
      switch (type) {
        case 'feature':
          return 'yellow'
        case 'bug':
          return 'red'
        case 'epic':
          return 'blue'
      }
    }
  },
  mounted() {
    if (!this.roadmap) {
      this.getRoadmap()
    }
  }
}
</script>

<style scoped>
.roadmap {
  width: 100%;
  background-color: #2A2A2A;
}
</style>
