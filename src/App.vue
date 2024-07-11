<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";

export default {
  computed: {
    isInAdminSection() {
      return this.$route.path.startsWith("/admin");
    },
    isInLoginSection() {
      return this.$route.path.startsWith("/login");
    },
  },
};
</script>
