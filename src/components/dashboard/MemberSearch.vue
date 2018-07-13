<template>
  <v-card>
    <v-card-title class="headline">Member search</v-card-title>
    <v-card-text>
      <member-search-bar></member-search-bar>
    </v-card-text>
  </v-card>
</template>

<script>
import MemberSearchBar from './MemberSearchBar'
export default {
  name: 'member-search',
  components: { MemberSearchBar }
}
</script>

<style scoped>
</style>
