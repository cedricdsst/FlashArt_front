import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createTag, getAllTags, getTagById, updateTagById, deleteTagById } from '@/services/tagService';

interface Tag {
  _id?: string;
  name: string;
}

export const useTagStore = defineStore('tag', () => {
  const tags = ref<Tag[]>([]);
  const currentTag = ref<Tag | null>(null);

  const fetchTags = async () => {
    try {

      tags.value = await getAllTags();

    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const fetchTagById = async (id: string) => {
    try {
      currentTag.value = await getTagById(id);
    } catch (error) {
      console.error('Failed to fetch tag:', error);
    }
  };

  const createNewTag = async (tag: Tag) => {
    try {
      const createdTag = await createTag(tag);
      tags.value.push(createdTag.tag);
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  };

  const updateExistingTag = async (id: string, tag: Tag) => {
    try {
      const updatedTag = await updateTagById(id, tag);
      const index = tags.value.findIndex(t => t._id === id);
      if (index !== -1) {
        tags.value[index] = updatedTag.tag;
      }
    } catch (error) {
      console.error('Failed to update tag:', error);
    }
  };

  const deleteExistingTag = async (id: string) => {
    try {
      await deleteTagById(id);
      tags.value = tags.value.filter(t => t._id !== id);
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  };

  return {
    tags,
    currentTag,
    fetchTags,
    fetchTagById,
    createNewTag,
    updateExistingTag,
    deleteExistingTag,
  };
});
