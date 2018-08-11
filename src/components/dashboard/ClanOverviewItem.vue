<template>
  <v-list-tile>
    <v-list-tile-avatar v-if="icon">
      <v-icon>{{ icon }}</v-icon>
    </v-list-tile-avatar>

    <v-list-tile-content @click="triggerAction">
      <v-list-tile-title>{{ text }}</v-list-tile-title>
    </v-list-tile-content>

    <v-list-tile-action v-if="actionText">
      <v-btn v-responsive.xs flat @click="$emit('action')" icon><v-icon>{{ mobileButtonIcon }}</v-icon></v-btn>
      <v-btn v-responsive.sm.md.lg.xl flat @click="$emit('action')">{{ actionText }}</v-btn>
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
  },
  computed: {
    mobileButtonIcon() {
      if (this.actionText === 'Reload' || this.actionText === 'Retry') {
        return 'refresh'
      }

      return 'arrow_forward'
    }
  },
  methods: {
    triggerAction() {
      if (this.$vuetify.breakpoint.name === 'xs') {
        this.$emit('action')
      }
    }
  }
}
</script>
