<template>
  <v-toolbar app dark fixed>
    <v-menu offset-y :disabled="!renderDropDownIcon">
      <v-toolbar-title class="clan-name" slot="activator">
        <span>{{currentPageName}}</span>
        <v-icon dark v-if="renderDropDownIcon">arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list dark>
        <v-list-tile @click="$router.push('/dashboard')">
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push('/inactive-players')" v-if="shouldRenderInactiveMembers">
          <v-list-tile-title>Inactive Members</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'app-header',
  data() {
    return {
      shouldRenderInactiveMembers: true
    }
  },
  computed: {
    ...mapState(['clanName']),
    ...mapGetters('members/active', ['activeMember']),
    currentPageName() {
      switch (this.$route.name) {
        case 'Home':
          return 'Unity of Guardians'
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
    shouldRenderProfilActions() {
      return this.$route.name === 'Profile'
    },
    renderDropDownIcon() {
      return this.$route.name !== 'OAuth'
    }
  }
}
</script>
