import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createRdv, bookRdv, getAllRdvsArtist, getAllRdvsClient, getRdvById, updateRdvById, deleteRdvById } from '@/services/rdvService';

interface Location {
    type: string;
    coordinates: number[];
}

interface Properties {
    title: string;
    address: string;
}

interface Rdv {
    _id?: string;
    artist_id: string;
    client_id?: string;
    date: Date;
    location: Location;
    properties: Properties;
    booked?: boolean;
    flash_id?: string;
}

export const useRdvStore = defineStore('rdv', () => {
    const rdvs = ref<Rdv[]>([]);
    const currentRdv = ref<Rdv | null>(null);

    const fetchRdvsArtist = async () => {
        try {
            rdvs.value = await getAllRdvsArtist();
        } catch (error) {
            console.error('Failed to fetch RDVs:', error);
        }
    };

    const fetchRdvsClient = async () => {
        try {
            rdvs.value = await getAllRdvsClient();
        } catch (error) {
            console.error('Failed to fetch RDVs:', error);
        }
    };

    const fetchRdvById = async (rdvId: string) => {
        try {
            currentRdv.value = await getRdvById(rdvId);
        } catch (error) {
            console.error('Failed to fetch RDV:', error);
        }
    };

    const createNewRdv = async (rdv: Rdv) => {
        try {
            const createdRdv = await createRdv(rdv);
            rdvs.value.push(createdRdv.rdv);
        } catch (error) {
            console.error('Failed to create RDV:', error);
        }
    };

    const bookExistingRdv = async (rdvId, flashId) => {
        try {
            const bookedRdv = await bookRdv(rdvId, flashId);
            const index = rdvs.value.findIndex(r => r._id === bookedRdv.rdv._id);
            if (index !== -1) {
                rdvs.value[index] = bookedRdv.rdv;
            }
        } catch (error) {
            console.error('Failed to book RDV:', error);
            throw error;
        }
    };

    const updateExistingRdv = async (rdvId: string, updateData: Partial<Rdv>) => {
        try {
            const updatedRdv = await updateRdvById(rdvId, updateData);
            const index = rdvs.value.findIndex(r => r._id === updatedRdv.rdv._id);
            if (index !== -1) {
                rdvs.value[index] = updatedRdv.rdv;
            }
        } catch (error) {
            console.error('Failed to update RDV:', error);
        }
    };

    const deleteExistingRdv = async (rdvId: string) => {
        try {
            await deleteRdvById(rdvId);
            rdvs.value = rdvs.value.filter(r => r._id !== rdvId);
        } catch (error) {
            console.error('Failed to delete RDV:', error);
        }
    };

    return {
        rdvs,
        currentRdv,
        fetchRdvsArtist,
        fetchRdvsClient,
        fetchRdvById,
        createNewRdv,
        bookExistingRdv,
        updateExistingRdv,
        deleteExistingRdv,
    };
});
