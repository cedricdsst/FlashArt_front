<template>
  <v-container>
    <h2>Créneaux disponibles</h2>

    <v-row v-for="rdv in rdvs" :key="rdv._id" align="center" class="mt-1">
      <v-col class="v-col-4">
        <div class="time rounded">
          <p class="text-center">{{ formatDate(rdv.date) }}</p>
        </div>
      </v-col>
      <v-col>
        <div class="location v-col-auto pa-0">
          <p><v-icon>mdi-map-marker</v-icon> <span>{{ rdv.properties.address }}</span></p>
        </div>
      </v-col>
      <v-col class="v-col-auto">
        <v-btn
          :color="rdv.booked ? 'grey' : 'brown-darken-3'"
          :disabled="rdv.booked"
          @click="rdv.booked ? null : () => $emit('book', rdv._id)"
        >
          <v-icon>mdi-calendar-month</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  rdvs: Array,
  flashId: String,
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};
</script>

<style scoped>
.time {
  padding: 5px;
  background-color: rgba(61, 17, 5, 0.2);
}
</style>
