<template>
  <ImageIntroduction />

  <v-container>
    <!-- Menu user -->
    <v-select
      v-model="selectedSelection"
      label="Aller vers ..."
      :items="['Mes informations', 'Mes reservations']"
    ></v-select>

    <v-container v-if="selectedSelection === 'Mes reservations'">
      <h2>Créneaux reservés</h2>

      <v-row v-for="rdv in rdvs" :key="rdv._id" align="center" class="mt-1">
        <v-col class="v-col-4">
          <v-img cover aspect-ratio="1" :src="rdv.flash_id.image"></v-img>
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
    </v-container>
    <v-container v-if="selectedSelection === 'Mes informations'">
      <h2 class="mt-5 mb-7">Modifier mes informations</h2>
      <v-form>
        <div>
          <v-label>Nom</v-label>
          <v-text-field placeholder="HINDERSCHIETTE"></v-text-field>
        </div>
        <div>
          <v-label>Prénom</v-label>
          <v-text-field placeholder="Maxime"></v-text-field>
        </div>
        <div>
          <v-label>Nom d'utilisateur</v-label>
          <v-text-field placeholder="elmax67"></v-text-field>
        </div>
        <div>
          <v-label>Email</v-label>
          <v-text-field disabled>mhin******@myges.fr</v-text-field>
          <small
            >Contactez l'administrateur du site pour changer votre adresse
            mail.</small
          >
        </div>
        <v-btn color="brown-darken-3" width="100%" class="mt-5" type="submit"
          >Enregistrer</v-btn
        >
      </v-form>
    </v-container>
  </v-container>
  <div class="d-flex justify-center gap-4">
    <LogoutButton class="mt-4" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRdvStore } from "@/stores/rdvStore";
import LogoutButton from "@/components/LogoutButton.vue";
import ImageIntroduction from "@/components/ImageIntroduction.vue";

const selectedSelection = ref("Mes informations");

const rdvStore = useRdvStore();
const { rdvs } = storeToRefs(rdvStore);

const fetchRdvsClient = async () => {
  try {
    console.log("Fetching RDVs for client...");
    await rdvStore.fetchRdvsClient();
    console.log("Fetched RDVs:", rdvs.value);
  } catch (error) {
    console.error("Failed to fetch RDVs:", error);
  }
};

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

onMounted(fetchRdvsClient);
</script>

<style scoped>
.time {
  padding: 5px;
  background-color: rgba(61, 17, 5, 0.2);
}
</style>
