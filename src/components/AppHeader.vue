<template>
  <v-toolbar app dark fixed>
    <v-menu>
      <v-toolbar-title slot="activator">
        <span>{{currentPageName}}</span>
        <v-icon dark>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list dark>
        <v-list-tile @click="$router.push('/')">
          <v-list-tile-title>Member List</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push('/inactive-players')">
          <v-list-tile-title>Inactive Members</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-btn icon v-if="renderRefreshIcon">
      <v-icon>refresh</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'app-header',
  computed: {
    currentPageName() {
      return this.$route.name
    },
    renderRefreshIcon() {
      return this.$route.name === 'Inactive Players'
    }
  }
}
</script>

<style scoped>

</style>
