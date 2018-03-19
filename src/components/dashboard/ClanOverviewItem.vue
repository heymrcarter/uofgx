<template>
  <v-list-tile>
    <v-list-tile-avatar v-if="icon">
      <v-icon>{{ icon }}</v-icon>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{ text }}</v-list-tile-title>
    </v-list-tile-content>

    <v-list-tile-action v-if="actionText">
      <v-btn flat @click="$emit('action')">{{ actionText }}</v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  name: 'clan-overview-item',
  props: {
    icon: {
      type: String,
      required: false
    },
    actionText: {
      type: String,
      required: false
    },
    text: {
      type: String,
      require: true
    }
  }
}
</script>
