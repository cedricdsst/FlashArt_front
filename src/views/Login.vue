<style scoped>

label, input {
  display: block;
  margin-bottom: 0rem;
}

label {
  margin-bottom: 0.4rem;
}

input {
  border: 1px solid #C0C0C0;
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

    <NavBar />

    <ImageIntroduction />

    <v-container>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <form class="ma-auto" @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </v-container>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue';
  import { apiUrl } from '@/config';

  export default defineComponent({
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch(apiUrl + '/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            }),
            credentials: 'include'
          });
          const responseData = await response.json();
          console.log(responseData);
          if (!response.ok) {
            throw new Error('Identifiants incorrects');
          }

          // Si la réponse est OK, rediriger ou traiter la réponse
          // par exemple, enregistrement de token ou redirection
          // this.$router.push('/dashboard');
        } catch (error) {
          this.errorMessage = error.message;
        }
      }
    }
  });
  </script>
