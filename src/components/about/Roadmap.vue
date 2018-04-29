<template>
  <div class="roadmap">
    <v-card class="mb-3" v-if="inProgress.length > 0">
      <v-card-title class="headline">In progress</v-card-title>
      <v-card-text>
        <v-list two-line>
          <template v-for="(item, i) in inProgress">
            <roadmap-item :item="item" :key="i"></roadmap-item>
            <v-divider :key="(i + 1) * 10" v-if="i !== inProgress.length - 1"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="mb-3" v-if="planned.length > 0">
      <v-card-title class="headline">Planned</v-card-title>
      <v-card-text>
        <v-list two-line>
          <template v-for="(item, i) in planned">
            <roadmap-item :item="item" :key="i"></roadmap-item>
            <v-divider :key="(i + 1) * 100" v-if="i !== planned.length - 1"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card v-if="downTheRoad.length > 0">
      <v-card-title class="headline">Down the road</v-card-title>
      <v-card-text>
        <v-list two-line>
          <template v-for="(item, i) in downTheRoad">
            <roadmap-item :item="item" :key="i"></roadmap-item>
            <v-divider :key="(i + 1) * 1000" v-if="i !== downTheRoad.length - 1"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RoadmapItem from './RoadmapItem'
export default {
  name: 'roadmap',
  computed: {
    ...mapState({
      roadmap(state) {
        return state.roadmap.roadmap
      }
    }),
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
  components: {
    RoadmapItem
  }
}
</script>
