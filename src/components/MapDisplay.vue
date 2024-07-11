<template>
  <div>
    <h1>Location Map</h1>
    <div id="map" style="height: 400px;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import L from 'leaflet';
import { apiUrl } from '@/config';

export default defineComponent({
  name: 'MapDisplay',
  setup() {
    const route = useRoute();

    const fetchRdvData = async (id: string) => {
      try {
        const response = await fetch(`${apiUrl}/rdv/${id}`);
        const result = await response.json();
        if (response.ok) {
          return result;
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    };

    const initMap = (locationData: any) => {
      const map = L.map('map').setView([locationData.geometry.coordinates[1], locationData.geometry.coordinates[0]], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([locationData.geometry.coordinates[1], locationData.geometry.coordinates[0]])
        .addTo(map)
        .bindPopup(locationData.properties.name)
        .openPopup();
    };

    onMounted(async () => {
      const rdvId = route.params.id as string;
      const rdvData = await fetchRdvData(rdvId);
      if (rdvData && rdvData.location) {
        initMap(rdvData.location);
      }
    });

    return {};
  }
});
</script>

<style>
#map {
  height: 100%;
}
</style>
