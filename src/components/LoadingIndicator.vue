<template>
  <div class="loading-indicator" v-show="isLoading" :class="{active: isLoading}">
    <img src="../assets/loading-ghost.png"> <span><strong>ATTENTION</strong> Contacting Destiny 2 Servers</span>
  </div>
</template>

<script>
export default {
  name: 'loading-indicator',
  props: ['isLoading']
}
</script>

<style scoped>
.loading-indicator {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 0px;
  max-height: 60px;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 10px;
  font-size: 18px;
  transition-property: height;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  z-index: 9999;
}

.loading-indicator.active {
  height: 60px;
}

.loading-indicator img {
  width: 40px;
  margin-right: 15px;
}

.inactive-member-table {
  margin-top: 20px;
}
</style>
