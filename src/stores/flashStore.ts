// stores/flashStore.ts

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createFlash, updateFlash, deleteFlash, getAllFlashes, getFlashById } from '../services/flashService';

interface Tag {
    id: string;
    name: string;
}

interface Flash {
    _id?: string;
    image: string;
    tags: Tag[];
    available: boolean;
    user_id: string;
}

export const useFlashStore = defineStore('flash', () => {
    const flashes = ref<Flash[]>([]);
    const currentFlash = ref<Flash | null>(null);

    const fetchFlashes = async (tags?: string[]) => {
        try {
            console.log('Fetching flashes...'); // Journal de débogage
            flashes.value = await getAllFlashes(tags);
            console.log('Flashes fetched:', flashes.value); // Journal de débogage
        } catch (error) {
            console.error('Failed to fetch flashes:', error);
        }
    };

    const fetchFlashesByTag = async (tagName: string) => {
        try {
            console.log('Fetching flashes by tag:', tagName);
            flashes.value = await getAllFlashes([tagName]);
            console.log('Flashes fetched:', flashes.value);
        } catch (error) {
            console.error('Failed to fetch flashes by tag:', error);
        }
    };

    const fetchFlashById = async (flashId: string) => {
        try {
            currentFlash.value = await getFlashById(flashId);
        } catch (error) {
            console.error('Failed to fetch flash:', error);
        }
    };

    const createNewFlash = async (flash: Flash, file: File) => {
        try {
            const createdFlash = await createFlash(flash, file);
            flashes.value.push(createdFlash.flash);
        } catch (error) {
            console.error('Failed to create flash:', error);
        }
    };

    const updateExistingFlash = async (flash: Flash, file?: File) => {
        try {
            const updatedFlash = await updateFlash(flash, file);
            const index = flashes.value.findIndex(f => f._id === updatedFlash.flash._id);
            if (index !== -1) {
                flashes.value[index] = updatedFlash.flash;
            }
        } catch (error) {
            console.error('Failed to update flash:', error);
        }
    };

    const deleteExistingFlash = async (flashId: string) => {
        try {
            await deleteFlash(flashId);
            flashes.value = flashes.value.filter(f => f._id !== flashId);
        } catch (error) {
            console.error('Failed to delete flash:', error);
        }
    };

    return {
        flashes,
        currentFlash,
        fetchFlashesByTag,
        fetchFlashes,
        fetchFlashById,
        createNewFlash,
        updateExistingFlash,
        deleteExistingFlash,
    };
});
