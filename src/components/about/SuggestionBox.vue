<template>
  <v-card>
    <v-card-text>
      <div>
        <v-text-field v-model="idea" label="Idea" color="accent" required></v-text-field>
      </div>

      <div>
        <v-textarea v-model="description" outline label="Explain" color="accent"></v-textarea>
      </div>

      <div>
        <v-btn @click="submit" :disabled="isSubmitting">Submit</v-btn>
      </div>
    </v-card-text>

    <v-snackbar top v-model="showSuccessMessage">Thanks for your suggestion!</v-snackbar>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import analytics from '@/mixins/analytics'
export default {
  name: 'suggestion-box',
  mixins: [analytics],
  data() {
    return {
      idea: undefined,
      description: undefined,
      isSubmitting: false,
      showSuccessMessage: false
    }
  },
  methods: {
    ...mapActions(['submitSuggestion']),
    submit() {
      if (this.idea === undefined) {
        return
      }

      this.recordEvent('About', 'Submit', 'Suggestion')
      this.isSubmitting = true

      const suggestion = {
        idea: this.idea,
        description: this.description
      }
      this.submitSuggestion(suggestion)
        .then(() => {
          this.isSubmitting = false
          this.idea = undefined
          this.description = undefined
          this.showSuccessMessage = true
        })
        .catch(error => {
          console.error(error)
          this.isSubmitting = false
        })
    }
  }
}
</script>
