<template>
  <v-app dark>
    <app-header></app-header>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader'
export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
main {
  padding-top: 70px;
}
</style>
