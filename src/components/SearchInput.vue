<template>
  <v-container>
    <v-autocomplete
      v-model="selectedTags"
      clearable
      chips
      label="Rechercher..."
      :items="tagItems"
      multiple
    ></v-autocomplete>

    <v-slider
      v-model="selectedDays"
      :min="1"
      :max="30"
      :step="1"
      label="Days"
    ></v-slider>
    <p>Selected Days: {{ selectedDays }}</p>

    <v-slider
      v-model="selectedKm"
      :min="1"
      :max="1000"
      :step="1"
      label="Kilometers"
    ></v-slider>
    <p>Selected Kilometers: {{ selectedKm }}</p>

    <v-btn @click="getLocation">Get Location</v-btn>
    <p v-if="userLocationCity">Location: {{ userLocationCity }}</p>

    <v-btn @click="onSubmitSearch">Submit Search</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useTagStore } from "../stores/tagStore";
import { useFlashStore } from "../stores/flashStore";

const tagStore = useTagStore();
const flashStore = useFlashStore();
const { tags } = storeToRefs(tagStore);

const selectedTags = ref<string[]>([]);
const selectedDays = ref<number>(1);
const selectedKm = ref<number>(1);
const userLocation = ref<[number, number] | null>(null);
const userLocationCity = ref<string | null>(null);

const tagItems = computed(() => {
  return tags.value.map((tag) => tag.name);
});

onBeforeMount(async () => {
  await tagStore.fetchTags();
  await flashStore.fetchFlashes();
});

const onSubmitSearch = async () => {
  console.log("Selected Tags:", selectedTags.value);
  console.log("Selected Days:", selectedDays.value);
  console.log("Selected Km:", selectedKm.value);
  console.log("User Location:", userLocation.value);
  try {
    await flashStore.fetchFlashes(
      selectedTags.value,
      selectedDays.value,
      userLocation.value,
      selectedKm.value
    );
    console.log("Flashes fetched successfully");
  } catch (error) {
    console.error("Error fetching flashes:", error);
  }
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        userLocation.value = [
           position.coords.longitude,
           position.coords.latitude,
         
        ];
        console.log("User Coordinates:", userLocation.value);
        await fetchCityName(userLocation.value);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

const fetchCityName = async (location: [number, number]) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location[0]}&lon=${location[1]}`
    );
    userLocationCity.value =
      response.data.address.city ||
      response.data.address.town ||
      response.data.address.village ||
      "Unknown location";
    console.log("User Location City:", userLocationCity.value);
  } catch (error) {
    console.error("Error fetching city name:", error);
    userLocationCity.value = "Unknown location";
  }
};
</script>
