<template>
  <section class="wrapper">
    <v-container fluid grid-list-lg>
      <v-layout row wrap class="mt-2">
        <v-flex xs12 md5>
          <characters :membershipId="currentMembershipId"></characters>
        </v-flex>

        <v-flex xs12 md4>
          <expansions></expansions>
        </v-flex>

        <v-flex xs12 md3>
          <profile-actions></profile-actions>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 md6>
          <exemptions></exemptions>
        </v-flex>

        <v-flex xs12 md6>
          <notes :membership-id="currentMembershipId"></notes>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs v-model="activeTab" slider-color="yellow">
            <v-tab>Activity Overview</v-tab>
            <v-tab>Character activity</v-tab>
          </v-tabs>

          <v-tabs-items v-model="activeTab">
            <v-tab-item class="profile-tab mt-3">
              <activity-overview></activity-overview>
            </v-tab-item>

            <v-tab-item class="profile-tab mt-3">
              <character-activity></character-activity>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-container>

    <app-footer></app-footer>
  </section>
</template>

<script>
import Characters from './profile/Characters'
import Exemptions from './profile/Exemptions'
import ProfileActions from './profile/ProfileActions'
import Notes from './profile/Notes'
import Expansions from './profile/Expansions'
import AppFooter from './AppFooter'
import ActivityOverview from './profile/ActivityOverview'
import CharacterActivity from './profile/CharacterActivity'

export default {
  name: 'member-profile',
  components: {
    Characters,
    Exemptions,
    ProfileActions,
    Notes,
    Expansions,
    AppFooter,
    ActivityOverview,
    CharacterActivity
  },
  data() {
    return {
      activeTab: null
    }
  },
  computed: {
    currentMembershipId() {
      return this.$route.params.membershipId
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
}

.profile-tab {
  .container {
    padding: unset;
  }
}
</style>
