<template>
  <v-list-tile>
    <v-list-tile-avatar v-if="selectable">
      <v-checkbox color="accent" :input-value="selected" @change="select" :disabled="isCurrentlyExempt"></v-checkbox>
    </v-list-tile-avatar>

    <v-list-tile-content @click="click">
      <v-list-tile-title>{{ profile.gamertag }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ formatDate(profile.dateLastPlayed) }} ({{ profile.daysSinceLastPlayed }} days ago)</v-list-tile-sub-title>
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
import dateFormatter from "@/mixins/date-formatter";
export default {
  name: "inactivity-report-row",
  mixins: [dateFormatter],
  props: {
    profile: Object,
    isCurrentlyExempt: Boolean,
    numberExemptions: Number,
    selectable: Boolean,
    selected: Boolean
  },
  methods: {
    click(e) {
      this.$emit("click", e);
    },
    select(e) {
      this.$emit("select", e);
    }
  }
};
</script>
