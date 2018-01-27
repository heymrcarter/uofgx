<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex sm6>
        <v-card>
          <v-card-title primary-title>
            <h1 class="headline mb-3">Unity of Guardians clan administration</h1>
            <div>To view the roster and run reports you need to sign in with your Bungie account</div>
          </v-card-title>
          <v-card-actions>
            <v-btn :href="bungieNetAuthorizeEndpoint">Sign in with your Bungie.net account</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'login',
  computed: {
    bungieNetAuthorizeEndpoint() {
      return `${process.env.AUTH_ENDPOINT}?client_id=${[process.env.CLIENT_ID]}&response_type=code&state=${btoa(process.env.OAUTH_SECRET)}`
    }
  }
}
</script>

<style scoped>
.headline {
  display: block;
}
</style>
