<template>
    <v-container>
      <v-row>
        <h1>Card</h1>
        <v-col
          v-for="flash in flashes"
          :key="flash._id"
          cols="12"
          md="4"
        >
          <v-card>
            <v-img
              :src="flash.image"
              :alt="flash.tags.map(tag => tag.name).join(', ')"
              height="200px"
            ></v-img>
            <v-card-title>
              <v-chip-group column>
                <v-chip
                  v-for="tag in flash.tags"
                  :key="tag.id"
                >
                  {{ tag.name }}
                </v-chip>
              </v-chip-group>
            </v-card-title>
            <v-card-subtitle>
              {{ flash.available ? 'Available' : 'Not Available' }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, defineComponent, onBeforeMount } from 'vue';
  import {storeToRefs} from 'pinia'
  import { useFlashStore } from '../stores/flashStore';

  

  const flashStore = useFlashStore();

  const {flashes} = storeToRefs(flashStore)

  onBeforeMount(async ()=>{
    const fetchFlash = await flashStore.fetchFlashes()
    console.log(flashes.value)

  })
//   export default defineComponent({
//     setup() {
      
  
//       onMounted(() => {console.log('t')
//         flashStore.fetchFlashes().then(() => {
//           console.log('Flashes in component:', flashStore.flashes); // Journal de débogage
//         });
//       });
  
//       return {
//         flashes: flashStore.flashes,
//       };
//     },
//   });
  </script>
  