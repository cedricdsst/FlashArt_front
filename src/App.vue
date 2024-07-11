<style>
@media (min-width: 1024px) {
  #app {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>

<template>
  <v-app>
    <v-main>
      <NavBar />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  //
</script>
