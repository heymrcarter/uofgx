<template>
  <section class="wrapper">
    <v-container grid-list-lg fluid class="content">
      <v-layout>
        <v-flex xs12>
          <v-card>
            <v-card-title><h1 class="display-2">Roadmap</h1></v-card-title>
            <v-card-text>
              <div class="subheading">
                <p>The roadmap shows where the app is heading. Items on the roadmap are broken down into the following categories:</p>

                <ul>
                  <li>Features</li>
                  <li>Epics</li>
                  <li>Bugs</li>
                </ul>

                <p class="mt-3">Epics are higher level items that are more conceptuals and are used as placeholders for groups of features.</p>

                <p>Items may move around as things are prioritized.</p>
              </div>

              <v-divider v-if="isLoggedIn" class="my-3"></v-divider>

              <div v-if="isLoggedIn">
                <h2 class="title mb-2">Have a suggestion?</h2>
                <v-btn class="ml-0" to="/suggest-feature">Submit a feature request!</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs12>
          <roadmap></roadmap>
        </v-flex>
      </v-layout>
    </v-container>

    <app-footer></app-footer>
  </section>
</template>

<script>
import Roadmap from './about/Roadmap'
import AppFooter from './AppFooter'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'roadmap-page',
  computed: {
    ...mapState({
      roadmap(state) {
        return state.roadmap.roadmap
      }
    }),
    ...mapState('session', {
      isLoggedIn(state) {
        return state.hasAccess
      }
    })
  },
  methods: {
    ...mapActions(['getRoadmap'])
  },
  mounted() {
    if (!this.roadmap) {
      this.getRoadmap()
    }
  },
  components: {
    Roadmap,
    AppFooter
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  .content {
    display: flex;
    flex-direction: column;
  }
}
</style>
