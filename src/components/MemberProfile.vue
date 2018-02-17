<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md5 fill-height>
        <characters></characters>
      </v-flex>

      <v-flex xs12 md7 fill-height>
        <exemptions></exemptions>
      </v-flex>
    </v-layout>

    <activity-history></activity-history>
  </v-container>
</template>

<script>
import Characters from './profile/Characters'
import Exemptions from './profile/Exemptions'
import ActivityHistory from './profile/ActivityHistory'

export default {
  name: 'member-profile',
  components: {
    Characters,
    Exemptions,
    ActivityHistory
  }
}
</script>

<style scoped>

</style>
