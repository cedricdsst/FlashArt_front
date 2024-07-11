<template>
  <div>
    <h1>Create Flash</h1>
    <form @submit.prevent="createFlash">
      <label for="image">Upload Image:</label>
      <input type="file" id="image" accept="image/*" @change="handleImageChange" required><br><br>

      <label for="tags">Tags:</label>
      <multiselect 
        v-model="selectedTags" 
        :options="tags" 
        :multiple="true" 
        :taggable="true" 
        :close-on-select="false" 
        :clear-on-select="false" 
        :preserve-search="true"
        placeholder="Ajouter des tags"
        label="name"
        track-by="_id">
      </multiselect><br><br>

      <label for="price">Price:</label>
      <input type="number" id="price" v-model.number="price" required><br><br>

      <button type="submit">Créer un Flash</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useTagStore } from '@/stores/tagStore';
import { useFlashStore } from '@/stores/flashStore';
import { storeToRefs } from 'pinia';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import { apiUrl } from '@/config';

export default defineComponent({
  name: 'FlashForm',
  components: { Multiselect },
  setup() {
    const image = ref<File | null>(null);
    const selectedTags = ref<Array<{ _id: string, name: string }>>([]);
    const price = ref<number | null>(null);

    const message = ref<string>('');

    const tagStore = useTagStore();
    const flashStore = useFlashStore();
    const { tags } = storeToRefs(tagStore);

  onBeforeMount(async () => {
    await tagStore.fetchTags();
  }); 

    const handleImageChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        image.value = target.files[0];
      }
    };

    const createFlash = async () => {
      try {
        if (!image.value || selectedTags.value.length === 0 || price.value === null) {
          message.value = 'Please fill in all fields.';
          return;
        }

        const flashObject = {
          tags: selectedTags.value.map(tag => ({ id: tag._id, name: tag.name })),
          price: price.value
        };
        await flashStore.createNewFlash(flashObject, image.value);
      } catch (error) {
        console.error('Error:', error);
        message.value = 'An error occurred while creating the flash.';
      }
    };

    return {
      tags,
      selectedTags,
      price,
      message,
      handleImageChange,
      createFlash
    };
  }
});
</script>