<style scoped></style>

<template>
  <ImageIntroduction />

  <v-container>
    <!-- Menu user -->
    <!-- <v-select
      label="Aller vers ..."
      :items="['Mes informations', 'Mes reservations']"
    ></v-select> -->

    <h2>Créneaux réservés</h2>

    <v-row v-for="rdv in rdvs" :key="rdv._id" width="100%" class="mt-1 d-block">
      <router-link
        :to="{ name: 'UserSingleBookedPage', params: { id: rdv._id } }"
        class="text-decoration-none custom-link v-col v-col-4"
      >
        <v-col>
          <v-img
            width="1000px"
            cover
            aspect-ratio="1"
            :src="rdv.flash_id.image"
          ></v-img>
        </v-col>
        <v-col>
          <div class="time rounded">
            <p class="text-center">{{ formatDate(rdv.date) }}</p>
          </div>
        </v-col>
        <v-col>
          <div class="location pa-0">
            <p>
              <v-icon>mdi-map-marker</v-icon>
              <span>{{ rdv.properties.address }}</span>
            </p>
          </div>
        </v-col>
      </router-link>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import ImageIntroduction from "@/components/ImageIntroduction.vue";
import { useRdvStore } from "@/stores/rdvStore";

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
