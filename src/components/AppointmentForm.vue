<template>
    <form @submit.prevent="submitForm">
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="formData.date" required>
      
      <label for="time">Heure:</label>
      <input type="time" id="time" v-model="formData.time" required>
      
      <button type="submit">Envoyer</button>
    </form>
  </template>
  
  
  <script setup lang="ts">
import { ref } from 'vue';
import { apiUrl } from '@/config';

const formData = ref({
  date: '',
  time: ''
});

const submitForm = async () => {
  const datetime = `${formData.value.date}T${formData.value.time}:00`;

  try {
    const response = await fetch(apiUrl + "/rdv", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ datetime }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi des données');
    }

    console.log('Réponse de l\'API:', await response.json());
    formData.value.date = '';
    formData.value.time = '';

    alert('Données soumises avec succès!');
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données:', error);
    alert('Erreur lors de l\'envoi des données. Veuillez réessayer.');
  }
};
</script>
