<!-- DashboardNavItem.vue -->
<template>
  <v-btn :value="buttonValue" :to="buttonRoute">
    <v-icon>{{ buttonIcon }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    const isAuthenticated = computed(() => !!authStore.userId);

    const buttonValue = computed(() =>
      isAuthenticated.value ? "dashboard" : "login"
    );

    const buttonRoute = computed(() => {
      if (!isAuthenticated.value) return "/login";
      return authStore.role === "artist"
        ? "/dashboard/tattoist"
        : "/dashboard/user";
    });

    const buttonIcon = computed(() =>
      isAuthenticated.value ? "mdi-account" : "mdi-login"
    );

    return {
      buttonValue,
      buttonRoute,
      buttonIcon,
    };
  },
});
</script>
