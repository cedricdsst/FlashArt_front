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
import { defineComponent, ref, onMounted } from 'vue';
import Multiselect from 'vue-multiselect';
// import 'vue-multiselect/dist/vue-multiselect.min.css';
import 'vue-multiselect/dist/vue-multiselect.css';
import { apiUrl } from '@/config';

export default defineComponent({
  name: 'FlashForm',
  components: { Multiselect },
  setup() {
    const image = ref<File | null>(null);
    const tags = ref<Array<{ _id: string, name: string }>>([]);
    const selectedTags = ref<Array<{ _id: string, name: string }>>([]);
    const price = ref<number | null>(null);

    const message = ref<string>('');

    const fetchTags = async () => {
      try {
        const response = await fetch(apiUrl + '/tag');
        const result = await response.json();
        if (response.ok) {
          tags.value = result;
        } else {
          message.value = `Error: ${result.message}`;
        }
      } catch (error) {
        console.error('Error:', error);
        message.value = 'An error occurred while fetching tags.';
      }
    };

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

        const formData = new FormData();
        formData.append('image', image.value);

        const flashObject = {
          tags: selectedTags.value.map(tag => ({ id: tag._id, name: tag.name })),
          price: price.value
        };

        formData.append('flash', JSON.stringify(flashObject));

        const response = await fetch(apiUrl + '/flash', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });

        const result = await response.json();
        if (response.ok) {
          message.value = 'Flash created successfully!';
        } else {
          message.value = `Error: ${result.message}`;
        }
      } catch (error) {
        console.error('Error:', error);
        message.value = 'An error occurred while creating the flash.';
      }
    };

    onMounted(() => {
      fetchTags();
    });

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