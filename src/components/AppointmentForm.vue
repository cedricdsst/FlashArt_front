<template>
  <div>
    <h1>Create Appointment</h1>
    <form @submit.prevent="createAppointment">
      <label for="date">Date:</label>
      <input type="datetime-local" id="date" v-model="date" required><br><br>

      <!-- Sélecteur de pays -->
      <select v-model="selectedCountry" @change="handleCountryChange">
        <option value="">Sélectionner un pays</option>
        <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
      </select>
      
      <!-- Input d'autocomplétion pour l'adresse -->
      <input type="text" v-model="searchQuery" placeholder="Entrez une adresse" @input="handleInput">
      
      <!-- Liste de suggestions -->
      <ul v-if="searchResults.length > 0">
        <li v-for="(result, index) in searchResults" :key="index" @click="selectAddress(result)">{{ result.label }}</li>
      </ul>

      <button type="submit">Create Appointment</button>
    </form>

    <p v-if="message">{{ message }}</p>
    <p v-if="rdvId">Appointment ID: {{ rdvId }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useRdvStore } from '@/stores/rdvStore';

export default defineComponent({
  name: 'AppointmentForm',
  setup() {
    const date = ref<string>('');
    const searchQuery = ref('');
    const searchResults = ref([]);
    const selectedCountry = ref('');
    const countries = [
      { code: 'fr', name: 'France' },
      { code: 'de', name: 'Allemagne' },
      { code: 'es', name: 'Espagne' },
    ];

    const message = ref<string>('');
    const rdvId = ref<string | null>(null);

    const router = useRouter();
    const rdvStore = useRdvStore();
    let searchTimer: ReturnType<typeof setTimeout> | null = null;

    const handleInput = async () => {
      if (!selectedCountry.value || searchQuery.value.trim() === '') {
        searchResults.value = [];
        return;
      }

      // Annuler la recherche en cours si elle existe
      if (searchTimer) {
        clearTimeout(searchTimer);
      }

      searchTimer = setTimeout(async () => {
        const provider = new OpenStreetMapProvider({
          params: {
            countrycodes: [selectedCountry.value]
          }
        });

        const results = await provider.search({ query: searchQuery.value });
        searchResults.value = results;
      }, 800); // Délai d'attente avant de lancer la recherche
    };

    const handleCountryChange = () => {
      searchQuery.value = '';
      searchResults.value = [];
    };

    let longitude = 0;
    let latitude = 0;
    const selectAddress = (result) => {
      searchQuery.value = result.label;
      console.log(result.x);
      longitude = result.x;
      latitude = result.y;
    };

    const createAppointment = async () => {
      try {
        if (!date.value || !selectedCountry.value || searchQuery.value.trim() === '') {
          message.value = 'Veuillez remplir tous les champs.';
          return;
        }

        const appointmentObject = {
          date: new Date(date.value).toISOString(),
          location: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          properties: {
              title: 'Title',
              address: searchQuery.value
            }
        };

        await rdvStore.createNewRdv(appointmentObject);
        message.value = 'Le rendez-vous a été créé!';
        rdvId.value = appointmentObject._id;
      } catch (error) {
        console.error('Error:', error);
        message.value = 'Erreur lors de la création de rendez-vous';
      }
    };

    return {
      date,
      searchQuery,
      searchResults,
      selectedCountry,
      countries,
      message,
      rdvId,
      handleInput,
      handleCountryChange,
      selectAddress,
      createAppointment
    };
  }
});
</script>

