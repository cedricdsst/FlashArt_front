<template>
    <div>
      <!-- Sélecteur de pays -->
      <select v-model="selectedCountry" @change="handleCountryChange">
        <option value="">Sélectionner un pays</option>
        <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
      </select>
      
      <!-- Input d'autocomplétion -->
      <input type="text" v-model="searchQuery" placeholder="Entrez une adresse" @input="handleInput">
      
      <!-- Liste de suggestions -->
      <ul v-if="searchResults.length > 0">
        <li v-for="(result, index) in searchResults" :key="index" @click="selectAddress(result)">{{ result.label }}</li>
      </ul>
      
      <!-- Bouton pour générer la carte -->
      <button @click="generateMap" v-if="showButton">Générer la carte</button>
  
      <!-- Carte Leaflet -->
      <div id="map" style="height: 400px;"></div>
    </div>
  </template>
  
  <script>
 import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/assets/css/leaflet.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

export default {
  name: 'AutoCompletion',
  setup() {
    const searchQuery = ref('');
    const searchResults = ref([]);
    const showButton = ref(false);
    const selectedCountry = ref('');
    const countries = [
      { code: 'fr', name: 'France' },
      { code: 'de', name: 'Allemagne' },
      { code: 'es', name: 'Espagne' },
    ];

    let map = null;
    let markers = [];
    let timer = null; // Variable pour le délai d'attente

    const handleInput = async () => {
      if (!selectedCountry.value || searchQuery.value.trim() === '') {
        searchResults.value = [];
        return;
      }

      const provider = new OpenStreetMapProvider({
        params: {
          countrycodes: [selectedCountry.value]
        }
      });

      // Annuler la recherche en cours si elle existe
      if (timer) {
        clearTimeout(timer);
      }

      // Définir une nouvelle recherche avec un délai de 300ms
      timer = setTimeout(async () => {
        const results = await provider.search({ query: searchQuery.value });
        searchResults.value = results;
      }, 300);
    };

    const handleCountryChange = () => {
      searchQuery.value = '';
      searchResults.value = [];
    };

    const selectAddress = (result) => {
      searchQuery.value = result.label;
      showButton.value = true;
    };

    const generateMap = () => {
      const selectedAddress = searchResults.value.find(result => result.label === searchQuery.value);
      if (!selectedAddress) return;

      markers.forEach(marker => map.removeLayer(marker));
      markers = [];
console.log(selectedAddress);
      const geojson = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedAddress.x, selectedAddress.y]
          },
          properties: {
            title: selectedAddress.label,
            address: selectedAddress.label
          }
        }]
      };

      L.geoJSON(geojson, {
        onEachFeature: (feature, layer) => {
          layer.bindPopup(feature.properties.title);
          markers.push(layer);
        }
      }).addTo(map);

      map.setView([selectedAddress.y, selectedAddress.x], 13);
    };

    onMounted(() => {
      map = L.map('map').setView([48.8566, 2.3522], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    });

    return {
      searchQuery,
      searchResults,
      showButton,
      selectedCountry,
      countries,
      handleInput,
      handleCountryChange,
      selectAddress,
      generateMap
    };
  },
};
  </script>
  
  <style>
  #map {
    width: 100%;
    height: 400px;
  }
  </style>
  