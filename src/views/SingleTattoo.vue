<template>
  <v-container>
    <v-alert
      v-if="notification.message"
      :type="notification.type"
      dismissible
      @input="clearNotification"
      transition="fade"
      class="fixed-top"
    >
      {{ notification.message }}
    </v-alert>

    <div v-if="currentFlash">
      <Card :flash="currentFlash" />
      <Timetable v-if="currentFlash.available" :rdvs="currentFlash.user_id.rdv_ids" :flashId="currentFlash._id" @book="book" />
      
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useFlashStore } from '../stores/flashStore';
import { useRdvStore } from '../stores/rdvStore'; 
import Card from '../components/Card.vue'; 
import Timetable from '../components/Timetable.vue'; 

console.log('SingleTattoo component setup initialized'); 

const route = useRoute();
const flashStore = useFlashStore();
const rdvStore = useRdvStore();
const { currentFlash } = storeToRefs(flashStore);

const notification = ref({ message: '', type: '' });

const fetchData = async () => {
  const flashId = route.params.flashId;
  console.log('Fetching data for flash ID:', flashId); 

  await flashStore.fetchFlashById(flashId);
  console.log('Fetched flash data:', currentFlash.value); 
};

onMounted(fetchData);

const book = async (rdvId) => {
  console.log('Book method called for RDV ID:', rdvId);
  try {
    await rdvStore.bookExistingRdv(rdvId, currentFlash.value._id);
    notification.value = { message: 'RDV booked successfully!', type: 'success' };
    console.log('RDV booked successfully');
    await fetchData(); 
  } catch (error) {
    console.error('Failed to book RDV:', error);
    notification.value = { message: 'Failed to book RDV.', type: 'error' };
  }
  setTimeout(clearNotification, 4000); 
};

const clearNotification = () => {
  console.log('Clearing notification');
  notification.value = { message: '', type: '' };
};
</script>

<style scoped>
.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
}
</style>
