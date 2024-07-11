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
          <p>
            <v-icon>mdi-map-marker</v-icon>
            <span @click="openModal(rdv.properties.address)" style="cursor: pointer;">
              {{ truncateAddress(rdv.properties.address) }}
            </span>
          </p>
        </div>
      </v-col>
      <v-col class="v-col-auto">
        <v-btn
          :color="rdv.booked ? 'grey' : 'brown-darken-3'"
          :disabled="rdv.booked"
          @click="handleClick(rdv._id)"
        >
          <v-icon>mdi-calendar-month</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="300px">
      <v-card>
        <v-card-text>
          <p>
            <v-icon>mdi-map-marker</v-icon>
            {{ fullAddress }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

console.log('Timetable component setup initialized');

const props = defineProps({
  rdvs: Array,
  flashId: String,
});

const emits = defineEmits(['book']);

const dialog = ref(false);
const fullAddress = ref('');

const handleClick = (rdvId) => {
  console.log('Button clicked for RDV ID:', rdvId);
  emits('book', rdvId);
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const truncateAddress = (address: string) => {
  return address.length > 5 ? address.slice(0, 5) + '...' : address;
};

const openModal = (address: string) => {
  fullAddress.value = address;
  dialog.value = true;
};
</script>

<style scoped>
.time {
  padding: 5px;
  background-color: rgba(61, 17, 5, 0.2);
}
</style>