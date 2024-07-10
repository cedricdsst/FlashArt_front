<template>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Se connecter</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
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
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  