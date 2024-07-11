<template>
  <v-autocomplete
    v-model="selectedTags"
    clearable
    chips
    label="Rechercher..."
    :items="tagItems"
    multiple
    @update:model-value="onTagsUpdate"
  ></v-autocomplete>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTagStore } from "../stores/tagStore";
import { useFlashStore } from "../stores/flashStore";

const tagStore = useTagStore();
const flashStore = useFlashStore();
const { tags } = storeToRefs(tagStore);

const selectedTags = ref([]);

const tagItems = computed(() => {
  return tags.value.map((tag) => tag.name);
});

onBeforeMount(async () => {
  await tagStore.fetchTags();
  await flashStore.fetchFlashes();
});

const onTagsUpdate = async (newTags: string[]) => {
  console.log("Tags updated:", newTags);
  try {
    await flashStore.fetchFlashesByTag(newTags);
    console.log("Flashes fetched successfully");
  } catch (error) {
    console.error("Error fetching flashes:", error);
  }
};
</script>
