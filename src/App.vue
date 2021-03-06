<template>
  <v-app dark :class="$route.name.toLowerCase()">
    <app-header></app-header>
    <main>
      <section class="wrapper">
        <router-view></router-view>
        <app-footer></app-footer>
      </section>
    </main>

    <v-dialog v-model="showSessionExpirationDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">Session expired</v-card-title>

        <v-card-text>
          Please sign back in with your Bungie.net account.
        </v-card-text>

        <v-card-actions>
          <v-btn :href="bungieNetAuthorizeEndpoint">Sign in with your Bungie.net account</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import moment from 'moment-timezone'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapState('session', ['expiresAt', 'hasAccess']),
    ...mapGetters('session', ['showSessionExpirationDialog']),
    bungieNetAuthorizeEndpoint() {
      return `${process.env.AUTH_ENDPOINT}?client_id=${[process.env.CLIENT_ID]}&response_type=code&state=${btoa(process.env.OAUTH_SECRET)}`
    }
  },
  methods: {
    ...mapActions('session', ['clearSession'])
  },
  mounted() {
    if (this.hasAccess) {
      const now = moment
        .utc()
        .tz('America/New_York')
        .format()
      if (now < this.expiresAt) {
        this.$router.replace('/dashboard')
      } else {
        this.clearSession({ showDialog: false })
      }
    }
  }
}
</script>

<style lang="scss">
.about,
.home {
  main {
    padding-top: 0;
  }
}

main {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    min-height: calc(100vh - 50px);
  }

  &.profile .container {
    margin-top: 0;
  }
}
</style>
