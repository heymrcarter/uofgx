<template>
  <div class="loader">
    <p class="sr-only">Loading</p>
    <v-progress-linear color="accent" height="5" indeterminate></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: 'loadable-indicator'
}
</script>

<style scoped lang="scss">
.sr-only {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  width: 1px;
  word-wrap: normal !important;
}

.loader {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  > .progress-linear {
    margin: 0;
  }
}
</style>
