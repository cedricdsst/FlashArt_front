<style scoped>
.flash-title {
  font-size: 1.5rem;
  font-weight: 500;
}

.price {
  font-size: 1.5rem;
  font-weight: 500;
}

.profile-img + img {
  width: 10px !important;
}

.start-at {
  font-size: 0.6rem;
  width: 50%;
}

.location {
  font-size: 0.7rem;
}

.tags span {
  background-color: #f5f5f5;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  margin-right: 0.5rem;
  font-size: 0.7rem;
}


</style>

<template>
    
<v-card class="pb-5"  
            v-for="flash in flashes"
          :key="flash._id"
          cols="12"
          md="4"
>
    <v-img width="100%" aspect-ratio=1/1 :src="flash.image"
              :alt="flash.tags.map(tag => tag.name).join(', ')"></v-img>
    <v-container class="tags pt-4 pb-0 ma-0" v-for="tag in flash.tags"
                  :key="tag.id">
      <span  @click="handleTagClick(tag.name)" style="cursor: pointer;">{{ tag.name }}</span>
    </v-container>
    <v-container width="100%" class="pt-2 pb-1 d-flex justify-space-between align-center">
      <v-container class="pa-0 d-flex align-center">
        <div>
          <v-img :width="45" aspect-ratio="1/1" class="profile-img rounded-circle" src="https://img.freepik.com/photos-gratuite/portrait-homme-riant_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1720310400&semt=ais_user"></v-img>
        </div>
        <div class="pl-4">
          <v-card-text class="pa-0"> {{flash.user_id.firstname}} {{flash.user_id.lastname}}</v-card-text>
          <p class="location"><v-icon>mdi-map-marker</v-icon> Lyon</p>
        </div>

      </v-container>
      <p class="pa-0 text-right start-at">à partir de<br> <span class="price">{{flash.price}} €</span></p>
    </v-container>

</v-card>

</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import {storeToRefs} from 'pinia'
import { useFlashStore } from '../stores/flashStore';



const flashStore = useFlashStore();

const {flashes } = storeToRefs(flashStore)

onBeforeMount(async ()=>{
  const fetchFlash = await flashStore.fetchFlashes()
  console.log(flashes.value)

})

const handleTagClick = async (tagName: string) => {
  await flashStore.fetchFlashesByTag(tagName);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

</script>
