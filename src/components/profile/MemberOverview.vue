<template>
  <v-card height="100%">
    <v-card-text>
      <section>
        <v-container fluid class="pa-0 mb-2">
          <v-layout row>
            <v-flex xs12>
              <h1 class="display-2 mb-3">{{ gamertag }}</h1>
              <v-container fluid class="pa-0">
                <v-layout row wrap>
                  <v-flex xs12 md3 class="inline">
                    <v-chip :color="getChipColor(membershipData.memberType)">{{ memberTypeToMemberLevel(membershipData.memberType) }}</v-chip>
                    <span class="subheading ml-3">Member since: {{ membershipData.joinDate | formatDate }}</span>
                  </v-flex>

                  <v-flex xs12 md9 class="inline">
                    <v-chip v-if="isCurrentlyExempt">
                      <v-avatar><v-icon>error_outline</v-icon></v-avatar>
                      Exempt
                    </v-chip>
                    <v-chip v-if="isInactive">
                      <v-avatar><v-icon>error_outline</v-icon></v-avatar>
                      Inactive
                    </v-chip>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>

        <v-divider></v-divider>

        <loadable-indicator v-if="isLoading"></loadable-indicator>
        <v-container v-else fluid class="pa-0">
          <v-layout row wrap>
            <v-flex xs12 md5 offset-md-1>
              <loadable-failure v-if="charactersLoadError" message="Failed to load characters" :retryable="true" @retry="fetchCharacters"></loadable-failure>
              <character-list v-else :characters="memberCharacters"></character-list>
            </v-flex>

            <v-divider v-responsive.xs.sm></v-divider>

            <v-flex xs12 md5 offset-md-1>
              <ul class="member-overview-items">
                <li class="member-overview-item">
                  <v-container class="pa-0">
                    <v-layout row wrap>
                      <v-flex xs12 sm7>
                        <dl>
                          <dt>Latest expansion</dt>
                          <dd class="title">{{ latestExpansion }}</dd>
                        </dl>
                      </v-flex>

                      <v-flex xs12 sm5>
                        <button flat @click="openExpansionsDialog">View expansions</button>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </li>

                <li class="member-overview-item">
                  <v-container class="pa-0">
                    <v-layout row wrap>
                      <v-flex xs12 sm7>
                        <dl>
                          <dt>Times exempt</dt>
                          <dd class="title">{{ totalNumberExemptions }}</dd>
                        </dl>
                      </v-flex>

                      <v-flex xs12 sm5>
                        <button flat @click="openExemptionsDialog">View exemptions</button>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </li>

                <li class="member-overview-item">
                  <v-container class="pa-0">
                    <v-layout row wrap>
                      <v-flex xs12 sm7>
                        <dl>
                          <dt>Notes</dt>
                          <dd class="title">{{ numberNotes }}</dd>
                        </dl>
                      </v-flex>

                      <v-flex xs12 sm5>
                        <button flat @click="openNotesDialog">View notes</button>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </li>
              </ul>
            </v-flex>

            <v-divider v-responsive.xs.sm></v-divider>

            <v-flex xs12 md2>
              <profile-actions class="mt-3"></profile-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-card-text>

    <expansions :active="shouldRenderExpansionsDialog" @close="shouldRenderExpansionsDialog = false"></expansions>
    <exemptions :active="shouldRenderExemptionsDialog" @close="shouldRenderExemptionsDialog = false"></exemptions>
    <notes :active="shouldRenderNotesDialog" @close="shouldRenderNotesDialog = false"></notes>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
import analytics from '@/mixins/analytics'
import CharacterList from './CharacterList'
import LoadableIndicator from '../LoadableIndicator'
import LoadableFailure from '../LoadableFailure'
import Expansions from './Expansions'
import Exemptions from './Exemptions'
import ProfileActions from './ProfileActions'
import Notes from './Notes'
import moment from 'moment-timezone'
import sort from 'fast-sort'
export default {
  name: 'member-overview',
  mixins: [dateFormatter, analytics],
  data() {
    return {
      isLoadingCharacters: false,
      charactersLoadError: false,
      isLoadingExpansions: false,
      expansionsLoadError: false,
      notesLoadError: false,
      isLoadingNotes: false,
      shouldRenderExpansionsDialog: false,
      shouldRenderExemptionsDialog: false,
      shouldRenderNotesDialog: false,
      isInactive: false
    }
  },
  computed: {
    ...mapGetters(['activityReport']),
    ...mapState('members', {
      membershipData(state) {
        const member = state.list.find(m => m.xboxMembershipId === this.membershipId)
        return member || {}
      },
      latestExpansion(state) {
        if (state.expansions && state.expansions[this.membershipId]) {
          const expansions = state.expansions[this.membershipId]
          return expansions[expansions.length - 1]
        }
      }
    }),
    ...mapState('members/active', ['gamertag']),
    ...mapState('characters', {
      memberCharacters(state) {
        return state.memberCharacters[this.membershipId] || []
      }
    }),
    ...mapState('notes', {
      numberNotes(state) {
        if (state.notes[this.membershipId]) {
          return state.notes[this.membershipId].length
        } else {
          return 0
        }
      }
    }),
    ...mapState({
      exemptions(state) {
        return state.exemptions.exemptions
      },
      totalNumberExemptions(state) {
        if (state.exemptions.exemptions[this.membershipId]) {
          return state.exemptions.exemptions[this.membershipId].numberExemptions
        } else {
          return 0
        }
      }
    }),
    membershipId() {
      return this.$route.params.membershipId
    },
    isLoading() {
      return this.isLoadingCharacters || this.isLoadingExpansions || this.isLoadingNotes
    },
    isCurrentlyExempt() {
      if (this.exemptions) {
        if (!this.exemptions[this.membershipId]) {
          return false
        }

        const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[this.membershipId].history))).asc(h => h.startDate)
        const endDate = memberHistory[memberHistory.length - 1].endDate
        const today = moment.utc().format()

        return today <= endDate
      }
    }
  },
  methods: {
    ...mapActions('characters', ['getCharactersForMember']),
    ...mapActions('members', ['getExpansions']),
    ...mapActions('notes', ['getNotes']),
    memberTypeToMemberLevel(memberType) {
      switch (memberType) {
        case 0:
          return 'None'
        case 1:
          return 'Beginner'
        case 2:
          return 'Member'
        case 3:
          return 'Admin'
        case 4:
          return 'ActingFounder'
        case 5:
          return 'Founder'
      }
    },
    getChipColor(memberType) {
      switch (memberType) {
        case 0:
          return 'None'
        case 1:
          return 'grey'
        case 2:
          return 'grey'
        case 3:
          return 'blue'
        case 4:
          return 'yellow'
        case 5:
          return 'yellow'
      }
    },
    fetchAll() {
      this.fetchCharacters()
      this.fetchExpansions()
      this.fetchNotes()
    },
    fetchCharacters() {
      this.charactersLoadError = false
      this.isLoadingCharacters = true
      this.getCharactersForMember(this.membershipId)
        .catch(() => {
          this.charactersLoadError = true
        })
        .finally(() => {
          this.isLoadingCharacters = false
        })
    },
    fetchExpansions() {
      this.expansionsLoadError = false
      this.isLoadingExpansions = true
      this.getExpansions(this.membershipId)
        .catch(() => {
          this.expansionsLoadError = true
        })
        .finally(() => {
          this.isLoadingExpansions = false
        })
    },
    fetchNotes() {
      this.notesLoadError = false
      this.isLoadingNotes = true
      this.getNotes(this.membershipId)
        .catch(() => {
          this.notesLoadError = true
        })
        .finally(() => {
          this.isLoadingNotes = false
        })
    },
    openExpansionsDialog() {
      this.recordEvent('Member Profile', 'View', 'Expansions')
      this.shouldRenderExpansionsDialog = true
    },
    openExemptionsDialog() {
      this.recordEvent('Member Profile', 'View', 'Exemptions')
      this.shouldRenderExemptionsDialog = true
    },
    openNotesDialog() {
      this.recordEvent('Member Profile', 'View', 'Notes')
      this.shouldRenderNotesDialog = true
    }
  },
  mounted() {
    this.fetchAll()

    const member = this.activityReport.find(m => m.membershipId === this.$route.params.membershipId)
    if (member && member.isInactive) {
      this.isInactive = true
    }
  },
  components: {
    CharacterList,
    LoadableIndicator,
    LoadableFailure,
    Expansions,
    Exemptions,
    Notes,
    ProfileActions
  }
}
</script>

<style scoped lang="scss">
.inline {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.member-overview-items {
  list-style: none;

  .member-overview-item {
    display: flex;
    flex-direction: row;
    padding: 16px 0;

    dl {
      margin-right: 16px;

      dt {
        margin-bottom: 8px;
      }
    }

    button {
      // margin-top: 28px;
      font-size: 16px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
// 600px > < 960px
@media screen and (min-width: 600px) {
  button {
    margin-top: 28px;
  }
}
</style>
