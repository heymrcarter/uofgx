<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>{{ item.name }}</v-list-tile-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-chip :color="getChipColor(item.type)">{{ item.type | initialCap }}</v-chip>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  name: 'roadmap-item',
  props: {
    item: Object
  },
  filters: {
    initialCap(value) {
      let replacementValue = value.substring(0, 1).toUpperCase() + value.substring(1)
      return replacementValue
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>
.list__tile__action {
  min-width: unset;
  width: 78px;
}

.list__tile__content {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}
</style>
