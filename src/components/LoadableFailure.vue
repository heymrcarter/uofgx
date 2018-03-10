<template>
  <v-flex justify-center class="loadable-failure">
    <p><v-icon size="75px">warning</v-icon></p>

    <p>
      {{ message }}
      <v-btn v-if="retryable" flat @click="$emit('retry')">
        Try again
        <v-icon class="ml-2">refresh</v-icon>
      </v-btn>
    </p>
  </v-flex>
</template>

<script>
export default {
  name: 'loadable-failure',
  props: {
    message: {
      type: String,
      default: 'Failed to load data'
    },
    retryable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.loadable-failure {
  p {
    text-align: center;
  }
}
</style>
