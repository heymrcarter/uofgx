<template>
  <v-footer class="pa-2">
    <v-container v-responsive.xs class="pa-0">
      <v-layout row align-center>
        <v-flex class="legal">
          &copy; {{ new Date().getFullYear() }} - Tom Carter
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex>
          <v-btn flat icon href="https://twitter.com/destinyclanmgr"><v-icon size="24px">fab fa-twitter</v-icon></v-btn>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs-6>
          <v-btn flat to="/roadmap" block>Roadmap</v-btn>
        </v-flex>

        <v-flex v-if="hasAccess" xs-6>
          <v-btn flat to="/suggest-feature" block>Suggest a feature</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-responsive.sm.md.lg.xl class="pa-0">
      <v-layout row>
        <v-flex class="legal">
          &copy; {{ new Date().getFullYear() }} - Tom Carter
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex>
          <v-btn flat to="/roadmap">Roadmap</v-btn>
        </v-flex>

        <v-flex v-if="hasAccess">
          <v-btn flat to="/suggest-feature">Suggest a feature</v-btn>
        </v-flex>

        <v-flex>
          <v-btn flat icon href="https://twitter.com/destinyclanmgr"><v-icon size="24px">fab fa-twitter</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-container>
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

<style>
.v-footer {
  height: auto !important;
}
</style>

<style scoped lang="scss">
.legal {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  flex-direction: column;
}
</style>
