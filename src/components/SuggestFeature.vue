<template>
  <section class="wrapper">
    <v-container grid-list-lg fluid class="content">
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-card-title><h1 class="display-2">Suggest a feature</h1></v-card-title>
            <v-card-text>
              <p class="title">Have a great idea?</p>

              <p>Whether you have an idea to make the app better for you or for everyone, we want to hear about it. Input your idea into the form below to send it to the suggestion box. We'll review your suggestion and if we agree it should be in the app we'll prioritize it in the backlog accoringly!</p>
            </v-card-text>

            <v-card-actions>
              <v-btn to="/roadmap">Check out the roadmap</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12>
          <suggestion-box></suggestion-box>
        </v-flex>
      </v-layout>
    </v-container>

    <app-footer></app-footer>
  </section>
</template>

<script>
import SuggestionBox from './about/SuggestionBox'
import AppFooter from './AppFooter'
export default {
  name: 'suggest-feature',
  components: {
    AppFooter,
    SuggestionBox
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
</style>
