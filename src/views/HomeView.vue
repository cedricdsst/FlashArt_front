<template>
  <ImageIntroduction />

  <h2 class="text-center pa-7">Les plus populaires</h2>


    <v-for
      v-for="flash in flashes"
      :key="flash._id"
      cols="12"
      md="4"
      @click="navigateToSinglePage(flash._id)"
      style="cursor: pointer;"
    >
      <Card :flash="flash" />
    </v-for>

</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useFlashStore } from '../stores/flashStore';
import ImageIntroduction from '../components/ImageIntroduction.vue'; // Adjust the import path as necessary
import Card from '../components/Card.vue'; // Adjust the import path as necessary

const flashStore = useFlashStore();
const { flashes } = storeToRefs(flashStore);
const router = useRouter();

onBeforeMount(async () => {
  await flashStore.fetchFlashes();
  console.log(flashes.value);
});

const navigateToSinglePage = (flashId) => {
  router.push({ name: 'SingleTattooPage', params: { flashId } });
};
</script>
