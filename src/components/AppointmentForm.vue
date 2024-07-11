<style>
.error {
  color: red;
}
</style>

<template>
  <ImageIntroduction></ImageIntroduction>
  <v-container>

    <!-- Menu user -->
    <v-select
      label="Aller vers ..."
      :items="['Mes informations', 'Mes reservations', 'Ajouter créneau / FlashArt']"
    ></v-select>

    <v-divider><h2>Créer un créneau</h2></v-divider>
    <div class="mt-5">
      <v-form @submit.prevent="createAppointment">
        <div>
          <v-label for="date">Date:</v-label>
          <v-text-field type="datetime-local" id="date" v-model="date" required></v-text-field>
        </div>

        <div>
          <v-label for="country">Pays :</v-label><br/>
          <!-- Sélecteur de pays -->
          <select class="mb-3" id="country" :items="countries" item-value="code" item-text="name" v-model="selectedCountry" @change="handleCountryChange">
            <option value="">Sélectionner un pays</option>
            <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
          </select>
        </div>

        <div>
          <v-label for="address">Adresse :</v-label>
          <!-- Input d'autocomplétion pour l'adresse -->
          <v-text-field id="address" type="text" v-model="searchQuery" placeholder="Entrez une adresse" @input="handleInput"></v-text-field>
        </div>

        <!-- Liste de suggestions -->
        <div v-if="searchResults.length > 0">
          <v-row class="ml-1 mr-1" v-for="(result, index) in searchResults" :key="index" @click="selectAddress(result)">
            {{ result.label }}
            <v-divider class="mt-4 mb-4"></v-divider>
          </v-row>
        </div>

        <v-btn class="mt-10" color="brown-darken-3" type="submit">Créer le créneau</v-btn>
      </v-form>

      <p class="mt-3 error" v-if="message">{{ message }}</p>
      <p v-if="rdvId">Appointment ID: {{ rdvId }}</p>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import ImageIntroduction from "@/components/ImageIntroduction.vue";
import { useRdvStore } from '@/stores/rdvStore';

export default defineComponent({
  name: 'AppointmentForm',
  components: {ImageIntroduction},
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
  },
});

</script>

