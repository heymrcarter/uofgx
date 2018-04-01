<template>
  <v-app dark>
    <app-header></app-header>
    <main>
      <router-view></router-view>
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
export default {
  name: 'App',
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters('session', ['showSessionExpirationDialog']),
    bungieNetAuthorizeEndpoint() {
      return `${process.env.AUTH_ENDPOINT}?client_id=${[process.env.CLIENT_ID]}&response_type=code&state=${btoa(process.env.OAUTH_SECRET)}`
    }
  }
}
</script>

<style>
main {
  padding-top: 50px;
}
</style>
