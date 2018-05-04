<template>
  <div :class="'wrapper ' + wrapperClass">
    <v-container fluid class="pa-0 about">
      <v-toolbar tabs>
        <v-toolbar-title><router-link to="/">Destiny Clan Manager</router-link></v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu bottom left offset-y v-responsive.xs.sm>
          <v-btn icon slot="activator"><v-icon>more_vert</v-icon></v-btn>
          <v-list>
            <v-list-tile v-if="sessionIsActive" @click="$router.push('/dashboard')">
              <v-list-tile-title>{{ clanName }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-else @click="goToBungieLogin">
              <v-list-tile-title>Log in</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-toolbar-items v-responsive.md.lg.xl>
          <v-btn flat v-if="sessionIsActive" to="/dashboard">{{ clanName }}</v-btn>
          <v-btn flat v-else :href="bungieNetAuthorizeEndpoint">Log in</v-btn>
        </v-toolbar-items>

        <v-tabs slot="extension" v-model="tab" align-with-title color="grey darken-4" slider-color="yellow">
          <v-tabs-slider></v-tabs-slider>
          <v-tab @click="changeTab('roadmap')">Roadmap</v-tab>
          <v-tab v-if="sessionIsActive" @click="changeTab('suggestion')">Suggest a feature</v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <roadmap></roadmap>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>

        <v-tab-item v-if="sessionIsActive" class="suggestion-box">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <suggestion-box></suggestion-box>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-container>

    <v-footer height="60px" class="pa-2">
      <v-layout row align-center>
        <v-flex flex="1">
          &copy; {{ new Date().getFullYear() }} - Tom Carter
        </v-flex>

        <div>
          <v-btn flat icon href="https://twitter.com/destinyclanmgr"><v-icon size="24px">fab fa-twitter</v-icon></v-btn>
        </div>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
import analytics from '@/mixins/analytics'
import Roadmap from '@/components/about/Roadmap'
import SuggestionBox from '@/components/about/SuggestionBox'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'about',
  mixins: [analytics],
  data() {
    return {
      tab: null,
      wrapperClass: ''
    }
  },
  computed: {
    ...mapState({
      roadmap(state) {
        return state.roadmap.roadmap
      },
      sessionIsActive(state) {
        return state.session.accessToken !== undefined
      },
      clanName(state) {
        return state.clanName
      }
    }),
    bungieNetAuthorizeEndpoint() {
      return `${process.env.AUTH_ENDPOINT}?client_id=${[process.env.CLIENT_ID]}&response_type=code&state=${btoa(process.env.OAUTH_SECRET)}`
    }
  },
  watch: {
    tab(nextTab) {
      if (nextTab === '1') {
        this.wrapperClass = 'suggestion-tab'
      } else {
        this.wrapperClass = ''
      }
    }
  },
  methods: {
    ...mapActions(['getRoadmap']),
    changeTab(tab) {
      this.recordEvent('About', 'View', 'Tab', tab)
    },
    goToBungieLogin() {
      document.location = this.bungieNetAuthorizeEndpoint
    }
  },
  components: {
    Roadmap,
    SuggestionBox
  },
  mounted() {
    if (!this.roadmap) {
      this.getRoadmap()
    }
  }
}
</script>
<style scoped lang="scss">
main {
  padding-top: 0;
}

.toolbar__title a {
  color: white;
  text-decoration: none;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &.suggestion-tab {
    height: 100vh;
  }

  .content {
    display: flex;
    flex-direction: column;
  }
}

.about {
  height: 100%;
  margin: unset;
}

.suggestion-box {
  height: 100%;
}
</style>
