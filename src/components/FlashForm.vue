<style>
.number-input {
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 10px;
}

.multiselect-input {
  padding-bottom: 2rem;
}

.error {
  color: red;
}
</style>

<template>
  <v-container>
    <v-divider><h2>Créer un Flash</h2></v-divider>
    <div class="mt-5">
      <v-form @submit.prevent="createFlash">
        <div>
          <v-label for="image">Mettre en ligne une image :</v-label>
          <v-file-input
            type="file"
            id="image"
            accept="image/*"
            @change="handleImageChange"
            required
          ></v-file-input>
        </div>

        <div>
          <v-label for="tags">Tags:</v-label>
          <multiselect
            v-model="selectedTags"
            :options="tags"
            :multiple="true"
            :taggable="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Ajouter des tags"
            class="multiselect-input"
            label="name"
            track-by="_id"
          >
          </multiselect>
        </div>

        <div>
          <v-label for="price">Prix :</v-label><br />
          <input
            class="number-input"
            type="number"
            id="price"
            v-model.number="price"
            required
          />
        </div>

        <v-btn class="mt-10" color="brown-darken-3" type="submit"
          >Créer un Flash</v-btn
        >
      </v-form>

      <p class="mt-3 error" v-if="message">{{ message }}</p>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import { useTagStore } from "@/stores/tagStore";
import { useFlashStore } from "@/stores/flashStore";
import { storeToRefs } from "pinia";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { apiUrl } from "@/config";

export default defineComponent({
  name: "FlashForm",
  components: { Multiselect },
  setup() {
    const image = ref<File | null>(null);
    const selectedTags = ref<Array<{ _id: string; name: string }>>([]);
    const price = ref<number | null>(null);

    const message = ref<string>("");

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
        if (
          !image.value ||
          selectedTags.value.length === 0 ||
          price.value === null
        ) {
          message.value = "Please fill in all fields.";
          return;
        }

        const flashObject = {
          tags: selectedTags.value.map((tag) => ({
            id: tag._id,
            name: tag.name,
          })),
          price: price.value,
        };
        await flashStore.createNewFlash(flashObject, image.value);
      } catch (error) {
        console.error("Error:", error);
        message.value = "An error occurred while creating the flash.";
      }
    };

    return {
      tags,
      selectedTags,
      price,
      message,
      handleImageChange,
      createFlash,
    };
  },
});
</script>
