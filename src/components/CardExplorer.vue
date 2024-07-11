<template>
  <div>
    <div class="explorer-grid" v-if="flashes.length">
      <div v-for="flash in flashes" :key="flash._id" class="grid-item">
        <v-img
          :src="flash.image"
          :aspect-ratio="1"
          :alt="flash.tags.map((tag) => tag.name).join(', ')"
          cover
        ></v-img>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlashStore } from '../stores/flashStore';

const flashStore = useFlashStore();
const { flashes } = storeToRefs(flashStore);

onMounted(() => {
  flashStore.clearFlashes(); // Clear flashes on component load
});
</script>

<style scoped>
.explorer-grid {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5px;
}

.grid-item {
  flex: 0 0 33.333%;
  aspect-ratio: 1 / 1;
  padding: 0.5px;
  box-sizing: border-box;
}

.grid-item .v-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

/* Pour les tablettes */
@media (min-width: 600px) {
  .grid-item {
    flex: 0 0 25%;
  }
}

/* Pour les desktops */
@media (min-width: 960px) {
  .grid-item {
    flex: 0 0 20%;
  }
}
</style>
