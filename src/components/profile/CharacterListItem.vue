<template>
  <v-list-tile avatar>
    <v-list-tile-avatar tile :size="60" class="mr-3">
      <img :src="`https://www.bungie.net${character.emblem}`">
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title class="title">{{character.class}}</v-list-tile-title>
      <v-list-tile-sub-title>Last played {{character.lastPlayed | formatDate}}</v-list-tile-sub-title>
      <v-list-tile-sub-title>{{character.minutesPlayedThisSession}} minutes</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <p class="light title">{{character.light}}</p>
      <p class="level">{{character.level}}</p>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import dateFormatter from '@/mixins/date-formatter'
export default {
  name: 'character-list-item',
  mixins: [dateFormatter],
  props: {
    character: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.light {
  color: #ffeb3b;
}
</style>
