<style scoped>
label,
input {
  display: block;
  margin-bottom: 0rem;
}

label {
  margin-bottom: 0.4rem;
}

input {
  border: 1px solid #c0c0c0;
  width: 100%;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

button {
  background-color: #4e342e;
  padding: 0.5rem;
  width: 100%;
  margin-top: 2rem;
  color: white;
}

.error {
  color: red;
}
</style>

<template>
  <ImageIntroduction />

  <v-container>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <form class="ma-auto" @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { apiUrl } from "@/config";
import { useAuthStore } from "@/stores/authStore";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
       
        const authStore = useAuthStore();
        await authStore.login({
          email: this.email,
          password: this.password,
          stayLoggedIn: true,
        });

       
        if (authStore.role === "artist") {
          this.$router.push("/dashboard/tattoist");
        } else if (authStore.role === "client") {
          this.$router.push("/dashboard/user");
        } else {
          
          console.error("Rôle non reconnu");
          this.$router.push("/");
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
});
</script>
