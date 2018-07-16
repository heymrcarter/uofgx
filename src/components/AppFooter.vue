<template>
  <v-footer height="60px" class="pa-2">
    <v-layout row align-center>
      <v-flex flex="1">
        &copy; {{ new Date().getFullYear() }} - Tom Carter
      </v-flex>

      <div>
        <v-btn flat to="/about">Roadmap</v-btn>
      </div>
      <div v-if="hasAccess">
        <v-btn flat to="/about">Suggest a feature</v-btn>
      </div>
      <div>
        <v-btn flat icon href="https://twitter.com/destinyclanmgr"><v-icon size="24px">fab fa-twitter</v-icon></v-btn>
      </div>
    </v-layout>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app-footer',
  computed: {
    ...mapState('session', ['hasAccess'])
  }
}
</script>
