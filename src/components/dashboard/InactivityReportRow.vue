<template>
  <v-list-tile @click="click">
    <v-list-tile-content>
      <v-list-tile-title>{{ profile.gamertag }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ formatDate(profile.dateLastPlayed) }} ({{ profile.daysSinceLastPlayed }} days ago)</v-list-tile-sub-title>
      <v-list-tile-sub-title>Lastest expansion: {{ latestExpansion(profile.expansions) }}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-badge color="black" right overlap v-if="isCurrentlyExempt">
        <span slot="badge" v-if="numberExemptions > 1">{{numberExemptions}}</span>
        <v-icon large>explicit</v-icon>
      </v-badge>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import dateFormatter from '@/mixins/date-formatter'
export default {
  name: 'inactivity-report-row',
  mixins: [dateFormatter],
  props: ['profile', 'isCurrentlyExempt', 'numberExemptions'],
  methods: {
    click(e) {
      this.$emit('click', e)
    },
    latestExpansion(expansions) {
      return expansions[expansions.length - 1]
    }
  }
}
</script>
