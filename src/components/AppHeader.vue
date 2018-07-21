<template>
  <v-toolbar app dark fixed v-if="shouldRenderToolbar">
    <v-btn to="/dashboard" icon v-if="shouldRenderBackButton">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title class="clan-name">
      <router-link to="/" v-if="shouldRenderTitleAsLinkToHomepage">{{ currentPageName }}</router-link>
      <span v-else>{{ currentPageName }}</span>
      <v-chip v-if="currentMemberLevel" color="grey darken-2" text-color="white">{{ currentMemberLevel }}</v-chip>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn v-if="shouldRenderLogin" flat :href="bungieNetAuthorizeEndpoint">Log in</v-btn>
      <v-btn v-if="shouldRenderDashboadLink" flat to="/dashboard">{{ clanName }}</v-btn>
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
    ...mapState('session', {
      isAuthenticated(state) {
        return state.hasAccess
      }
    }),
    ...mapState('members', {
      currentMemberLevel(state) {
        if (this.$route.name !== 'Profile') {
          return undefined
        }

        const member = state.list.find(m => m.xboxMembershipId === this.activeMember.membershipId)

        return this.memberTypeToMemberLevel(member.memberType)
      }
    }),
    ...mapGetters('members/active', ['activeMember']),
    bungieNetAuthorizeEndpoint() {
      return `${process.env.AUTH_ENDPOINT}?client_id=${[process.env.CLIENT_ID]}&response_type=code&state=${btoa(process.env.OAUTH_SECRET)}`
    },
    shouldRenderBackButton() {
      return this.$route.name === 'InactivePlayers' || this.$route.name === 'Profile'
    },
    shouldRenderToolbar() {
      return this.$route.name !== 'About'
    },
    shouldRenderLogin() {
      return !this.isAuthenticated && (this.$route.name === 'Roadmap' || this.$route.name === 'SuggestFeature')
    },
    shouldRenderDashboadLink() {
      return this.isAuthenticated && (this.$route.name === 'Roadmap' || this.$route.name === 'SuggestFeature' || this.$route.name === 'Home')
    },
    shouldRenderTitleAsLinkToHomepage() {
      return this.$route.name === 'Roadmap' || this.$route.name === 'SuggestFeature' || this.$route.name === 'Home'
    },
    currentPageName() {
      switch (this.$route.name) {
        case 'Home':
        case 'About':
        case 'Roadmap':
        case 'SuggestFeature':
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
  },
  methods: {
    memberTypeToMemberLevel(memberType) {
      switch (memberType) {
        case 0:
          return 'None'
        case 1:
          return 'Beginner'
        case 2:
          return 'Member'
        case 3:
          return 'Admin'
        case 4:
          return 'ActingFounder'
        case 5:
          return 'Founder'
      }
    }
  }
}
</script>

<style scoped>
.clan-name a {
  color: white;
  text-decoration: none;
}
</style>
