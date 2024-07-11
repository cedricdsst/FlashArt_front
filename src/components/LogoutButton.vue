<!-- src/components/LogoutButton.vue -->
<template>
  <v-btn color="error" @click="logout">
    Se déconnecter
    <v-icon right>mdi-logout</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
  }
};
</script>
