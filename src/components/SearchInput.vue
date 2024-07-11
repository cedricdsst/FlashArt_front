<template>
  <v-container class="bottom-border">
    <v-autocomplete
      v-model="selectedTags"
      clearable
      chips
      label="Rechercher..."
      :items="tagItems"
      multiple
    ></v-autocomplete>

    <div>
      <v-btn
        v-for="option in dayOptions"
        :key="option.value"
        :class="{ 'v-btn--active': selectedDays === option.value }"
        @click="selectedDays = option.value"
        class="m-2"
      >
        {{ option.label }}
      </v-btn>
    </div>
    
    <br>
    <v-row align="center">
    <v-col cols="auto">
      <v-btn @click="getLocation">Get Location</v-btn>
    </v-col>
    <v-col>
      <p v-if="userLocationCity" class="bold">{{ userLocationCity }}</p>
    </v-col>
  </v-row>
    <v-slider
      v-if="userLocation"
      v-model="selectedKm"
      :min="1"
      :max="150"
      :step="1"
    >
      <template v-slot:label class="bold">
        {{ selectedKm }} Km
      </template>
    </v-slider>
    
    
    <br>
    <br>
    <v-row justify="center">
    <v-col cols="auto" style="padding-top:0px">
      <v-btn @click="onSubmitSearch">Submit Search</v-btn>
      <p v-if="flashCount !== null" align="center" class="flash-count">{{ flashCount }} flash(s)</p>
    </v-col>
  </v-row>
    
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useTagStore } from "../stores/tagStore";
import { useFlashStore } from "../stores/flashStore";

const tagStore = useTagStore();
const flashStore = useFlashStore();
const { tags } = storeToRefs(tagStore);

const selectedTags = ref<string[]>([]);
const selectedDays = ref<number>(7); // Default to 1 day (tomorrow)
const selectedKm = ref<number>(5);
const userLocation = ref<[number, number] | null>(null);
const userLocationCity = ref<string | null>(null);
const flashCount = ref<number | null>(null);

const dayOptions = [
  { label: 'Demain', value: 1 },
  { label: "7 Jours", value: 7 },
  { label: "30 Jours", value: 30 }
];

const tagItems = computed(() => {
  return tags.value.map((tag) => tag.name);
});

onMounted(async () => {
  await tagStore.fetchTags();
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
    flashCount.value = flashStore.flashes.length;
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
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location[1]}&lon=${location[0]}`
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

<style>
.v-btn--active {
  background-color: #493208 !important;
  color: white !important;
}

.bottom-border {
  border-bottom: 1px solid grey;
  margin-bottom: 5px;
}

.flash-count{
  margin-top: 2px;
  
}

.bold{
  font-weight: bold;
}
</style>
