<template>
  <v-toolbar app dark fixed v-if="shouldRenderToolbar">
    <v-btn to="/dashboard" icon v-if="shouldRenderBackButton">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title class="clan-name">{{currentPageName}}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu bottom left offset-y v-responsive.xs.sm>
      <v-btn icon slot="activator"><v-icon>more_vert</v-icon></v-btn>
      <v-list>
        <v-list-tile @click="$router.push('/about')">
          <v-list-tile-title>About</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-toolbar-items v-responsive.md.lg.xl>
      <v-btn flat to="/about">About</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import analytics from '@/mixins/analytics'
export default {
  name: 'app-header',
  data() {
    return {
      shouldRenderRoadmap: false
    }
  },
  mixins: [analytics],
  filters: {
    initialCap(value) {
      let replacementValue = value.substring(0, 1).toUpperCase() + value.substring(1)
      return replacementValue
    }
  },
  computed: {
    ...mapState(['clanName']),
    ...mapGetters('members/active', ['activeMember']),
    shouldRenderBackButton() {
      return this.$route.name === 'InactivePlayers' || this.$route.name === 'Profile'
    },
    shouldRenderToolbar() {
      return this.$route.name !== 'About'
    },
    currentPageName() {
      switch (this.$route.name) {
        case 'Home':
        case 'About':
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
