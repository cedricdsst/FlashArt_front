<template>
  <ImageIntroduction></ImageIntroduction>
  <v-container>
    <!-- Menu user -->
    <v-select
      v-model="selectedSection"
      label="Aller vers ..."
      :items="['Mes informations', 'Créneaux', 'Flash']"
    ></v-select>

    <div v-if="selectedSection === 'Mes informations'">
      <v-divider><h2>Mes informations</h2></v-divider>
      <v-card class="mt-5 pa-5">
        <v-row>
          <v-col cols="12" sm="6">
            <p>
              <strong>Nom d'utilisateur:</strong>
              {{ authStore.username }}
            </p>
            <p>
              <strong>Prénom:</strong>
              {{ authStore.firstname }}
            </p>
            <p><strong>Nom:</strong> {{ authStore.lastname }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Email:</strong> {{ authStore.email }}</p>
            <p><strong>Rôle:</strong> {{ authStore.role }}</p>
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>
      </v-card>
    </div>

    <div v-if="selectedSection === 'Créneaux'">
      <v-divider><h2>Liste des RDV</h2></v-divider>

      <div v-if="rdvStore.rdvs.length === 0" class="text-center my-5">
        <p>Aucun rendez-vous n'est disponible pour le moment.</p>
      </div>

      <div v-else>
        <v-row
          v-for="rdv in rdvStore.rdvs"
          :key="rdv.artist_id"
          align="center"
          class="mt-1"
        >
          <v-col class="v-col-4">
            <div v-if="rdv.booked === true">
              <v-img cover aspect-ratio="1" :src="rdv.flash_id.image"></v-img>
            </div>
            <div v-else>
              <v-img cover aspect-ratio="1" src="/src/assets/logo.png"></v-img>
            </div>
          </v-col>
          <v-col class="v-col-4">
            <div class="time rounded">
              <p class="text-center">{{ formatDate(rdv.date) }}</p>
            </div>
          </v-col>
          <v-col>
            <div class="location v-col-auto pa-0">
              <p>
                <v-icon>mdi-map-marker</v-icon>
                <span>{{ rdv.properties.address }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
      </div>

      <v-divider><h2>Créer un créneau</h2></v-divider>
      <div class="mt-5">
        <v-form @submit.prevent="createAppointment">
          <div>
            <v-label for="date">Date:</v-label>
            <v-text-field
              type="datetime-local"
              id="date"
              v-model="date"
              required
            ></v-text-field>
          </div>

          <div>
            <v-label for="country">Pays :</v-label><br />
            <!-- Sélecteur de pays -->
            <select
              class="mb-3"
              id="country"
              :items="countries"
              item-value="code"
              item-text="name"
              v-model="selectedCountry"
              @change="handleCountryChange"
            >
              <option value="">Sélectionner un pays</option>
              <option
                v-for="country in countries"
                :key="country.code"
                :value="country.code"
              >
                {{ country.name }}
              </option>
            </select>
          </div>

          <div>
            <v-label for="address">Adresse :</v-label>
            <!-- Input d'autocomplétion pour l'adresse -->
            <v-text-field
              id="address"
              type="text"
              v-model="searchQuery"
              placeholder="Entrez une adresse"
              @input="handleInput"
            ></v-text-field>
          </div>

          <!-- Liste de suggestions -->
          <div v-if="searchResults.length > 0">
            <v-row
              class="ml-1 mr-1"
              v-for="(result, index) in searchResults"
              :key="index"
              @click="selectAddress(result)"
            >
              {{ result.label }}
              <v-divider class="mt-4 mb-4"></v-divider>
            </v-row>
          </div>

          <v-btn class="mt-10" color="brown-darken-3" type="submit"
            >Créer le créneau</v-btn
          >
        </v-form>

        <p class="mt-3 error" v-if="message">{{ message }}</p>
        <p v-if="rdvId">Appointment ID: {{ rdvId }}</p>
      </div>
    </div>

    <div v-if="selectedSection === 'Flash'">
      <v-divider><h2>Liste des Flashs</h2></v-divider>

      <div v-if="flashStore.flashes.length === 0" class="text-center my-5">
        <p>Vous n'avez aucun flash pour le moment.</p>
      </div>

      <div v-else>
        <v-row
          v-for="flash in flashStore.flashes"
          :key="flash.user_id"
          align="center"
          class="mt-1"
        >
          <v-col class="v-col-4">
            <v-img cover aspect-ratio="1" :src="flash.image"></v-img>
          </v-col>
          <v-col class="v-col-4">
            <div class="time rounded">
              <p class="text-center">{{ formatPrice(flash.price) }}</p>
            </div>
          </v-col>
          <v-col>
            <div class="location v-col-auto pa-0">
              <p>
                <v-icon>{{
                  flash.available ? "mdi-check" : "mdi-close"
                }}</v-icon>
                <span>{{
                  flash.available ? "Disponible" : "Non disponible"
                }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
      <flashForm></flashForm>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import ImageIntroduction from "@/components/ImageIntroduction.vue";
import { useRdvStore } from "@/stores/rdvStore";
import { useAuthStore } from "@/stores/authStore";
import { useFlashStore } from "@/stores/flashStore";
import { useUserStore } from "@/stores/userStore";

export default defineComponent({
  name: "AppointmentForm",
  components: { ImageIntroduction },
  setup() {
    const date = ref<string>("");
    const searchQuery = ref("");
    const searchResults = ref([]);
    const selectedCountry = ref("");
    const countries = [
      { code: "fr", name: "France" },
      { code: "de", name: "Allemagne" },
      { code: "es", name: "Espagne" },
    ];

    const message = ref<string>("");
    const rdvId = ref<string | null>(null);
    const selectedCity = ref<string>("");

    const selectedSection = ref("Mes informations");
    const router = useRouter();
    const rdvStore = useRdvStore();
    const authStore = useAuthStore();
    const flashStore = useFlashStore();
    const userStore = useUserStore();
    const { rdvs } = storeToRefs(userStore);
    let searchTimer: ReturnType<typeof setTimeout> | null = null;

    const fetchRdvsArtist = async () => {
      try {
        console.log("Fetching RDVs for artist...");
        await rdvStore.fetchRdvsArtist();
        console.log("Fetched RDVs:", rdvs.value);
        console.log("Fetched RDV image:", rdvs.flash_id.image);
      } catch (error) {
        console.error("Failed to fetch RDVs:", error);
      }
    };
    onMounted(fetchRdvsArtist);

    const formatDate = (dateString) => {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("fr-FR", options);
    };

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(price);
    };

    const handleInput = async () => {
      if (!selectedCountry.value || searchQuery.value.trim() === "") {
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
            countrycodes: [selectedCountry.value],
          },
        });

        const results = await provider.search({ query: searchQuery.value });
        searchResults.value = results;
      }, 800); // Délai d'attente avant de lancer la recherche
    };

    const handleCountryChange = () => {
      searchQuery.value = "";
      searchResults.value = [];
    };

    let longitude = 0;
    let latitude = 0;
    const selectAddress = (result) => {
      searchQuery.value = result.label;
      longitude = result.x;
      latitude = result.y;

      // Extract the city from the result object
      selectedCity.value =
        result.raw.address.city ||
        result.raw.address.town ||
        result.raw.address.village ||
        "Unknown city";
    };

    const createAppointment = async () => {
      try {
        if (
          !date.value ||
          !selectedCountry.value ||
          searchQuery.value.trim() === ""
        ) {
          message.value = "Veuillez remplir tous les champs.";
          return;
        }

        const appointmentObject = {
          date: new Date(date.value).toISOString(),
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          properties: {
            title: "Title",
            address: searchQuery.value,
          },
        };

        const response = await rdvStore.createNewRdv(appointmentObject);
        message.value = "Le rendez-vous a été créé!";
        rdvId.value = response._id; // assuming response contains the created rdv object with _id
      } catch (error) {
        console.error("Error:", error);
        //message.value = 'Erreur lors de la création de rendez-vous';
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
      createAppointment,
      selectedSection,
      authStore,
      rdvStore,
      flashStore,
      formatPrice,
      formatDate,
    };
  },
});
</script>
