<!-- src/views/dashboards/User.vue -->
<template>
  <NavBar />
  <v-container>
    <h2>User vue</h2>
    <LogoutButton class="mt-4" />
  </v-container>
</template>

<script setup lang="ts">
import LogoutButton from "@/components/LogoutButton.vue";
</script>
