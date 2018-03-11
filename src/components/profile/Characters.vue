<template>
  <v-card class="characters-card">
    <v-card-title class="headline">Characters</v-card-title>
    <v-card-text>
      <loadable-indicator v-if="isLoading"></loadable-indicator>
      <loadable-failure
        v-else-if="loadError"
        :message="`Couldn't load characters.`"
        :retryable="true"
        @retry="reload"></loadable-failure>

      <character-list :characters="characters" v-else></character-list>
    </v-card-text>
  </v-card>
</template>

<script>
import dateFormatter from '@/mixins/date-formatter'
import loadable from '@/mixins/loadable'
import LoadableIndicator from '@/components/LoadableIndicator'
import CharacterList from '@/components/profile/CharacterList'
import LoadableFailure from '@/components/LoadableFailure'
export default {
  name: 'characters',
  mixins: [dateFormatter, loadable],
  components: {
    LoadableIndicator,
    LoadableFailure,
    CharacterList
  },
  data() {
    return {
      loadAction: 'members/active/getCharactersForMember',
      loadParams: this.membershipId
    }
  },
  props: {
    membershipId: {
      required: true,
      type: String
    }
  },
  computed: {
    characters() {
      return this.loadResult !== undefined && Array.isArray(this.loadResult) ? this.loadResult : []
    }
  }
}
</script>
