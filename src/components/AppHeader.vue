<template>
  <v-toolbar app dark fixed>
    <v-btn to="/dashboard" icon v-if="shouldRenderBackButton">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>{{currentPageName}}</v-toolbar-title>
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
    shouldRenderBackButton() {
      return this.$route.name === 'InactivePlayers' || this.$route.name === 'Profile'
    },
    currentPageName() {
      switch (this.$route.name) {
        case 'Home':
          return 'Destiny Clan Manager'
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
    }
  }
}
</script>
