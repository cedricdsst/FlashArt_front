<template>
  <div>
    <div v-if="currentRdv">
      <p class="mb-5"><strong>Adresse:</strong> {{ currentRdv.properties.address }}</p>
      <p class="mb-5"><strong>Date:</strong> {{ formatDate(currentRdv.date) }}</p>
    </div>
    <div id="map" style="height: 400px;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import L from 'leaflet';
import { useRdvStore } from '@/stores/rdvStore';

export default defineComponent({
  name: 'MapDisplay',
  setup() {
    const route = useRoute();
    const rdvStore = useRdvStore();
    const { currentRdv } = storeToRefs(rdvStore);

    const fetchRdvById = async (id: string) => {
      try {
        console.log('Fetching RDV for client...');
        await rdvStore.fetchRdvById(id);
        if (currentRdv.value && currentRdv.value.location) {
          initMap(currentRdv.value);
        }
        console.log('Fetched RDVs:', currentRdv.value);
      } catch (error) {
        console.error('Failed to fetch RDV:', error);
      }
    };

    const initMap = (locationData: any) => {
      const map = L.map('map').setView([locationData.location.coordinates[1], locationData.location.coordinates[0]], 13);
      console.log(locationData);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([locationData.location.coordinates[1], locationData.location.coordinates[0]])
        .addTo(map)
        .bindPopup(locationData.properties.address)
        .openPopup();
    };

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    onMounted(async () => {
      const rdvId = route.params.id as string;
      await fetchRdvById(rdvId);
    });

    return {
      currentRdv,
      formatDate
    };
  }
});
</script>
