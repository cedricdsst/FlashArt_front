<style>
@media (min-width: 1024px) {
  #app {
    max-width: 800px;
    margin: 0 auto;
  }
}



.custom-link {
  color: inherit;
  text-decoration: none;
}
.custom-link:hover {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
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
