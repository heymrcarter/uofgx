<template>
  <v-app dark>
    <app-header></app-header>
    <main :class="$route.name.toLowerCase()">
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
import { mapGetters } from 'vuex'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapGetters('session', ['showSessionExpirationDialog']),
    bungieNetAuthorizeEndpoint() {
      return `${process.env.AUTH_ENDPOINT}?client_id=${[process.env.CLIENT_ID]}&response_type=code&state=${btoa(process.env.OAUTH_SECRET)}`
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

main {
  padding-top: 50px;
  display: flex;
  flex-grow: 1;

  &.about {
    padding-top: 0;
  }

  &.profile .container {
    margin-top: 0;
  }
}
</style>
