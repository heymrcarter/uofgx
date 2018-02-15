<template>
  <v-toolbar app dark fixed>
    <v-menu>
      <v-toolbar-title slot="activator">
        <span>{{currentPageName}}</span>
        <v-icon dark v-if="renderDropDownIcon">arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list dark>
        <v-list-tile @click="$router.push('/member-list')">
          <v-list-tile-title>Member List</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push('/inactive-players')" v-if="shouldRenderInactiveMembers">
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
import { mapGetters } from 'vuex'
export default {
  name: 'app-header',
  data() {
    return {
      shouldRenderInactiveMembers: true
    }
  },
  computed: {
    ...mapGetters(['activeMember']),
    currentPageName() {
      switch (this.$route.name) {
        case 'Home':
          return 'Unity of Guardians'
        case 'OAuth':
          return 'Processing login...'
        case 'MemberList':
          return 'Unity of Guardians'
        case 'InactivePlayers':
          return 'Inactive players'
        case 'Profile':
          return this.activeMember.gamertag
        default:
          return 'Not found!'
      }
    },
    renderRefreshIcon() {
      return this.$route.name === 'Inactive Players'
    },
    renderDropDownIcon() {
      return this.$route.name !== 'OAuth'
    }
  }
}
</script>

<style scoped>
.toolbar--fixed {
  z-index: 10000;
}
</style>
