import axios from 'axios';
import { apiUrl } from '@/config';
axios.defaults.withCredentials = true;

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

export const createRdv = async (rdv: Rdv) => {
    const response = await axios.post(`${apiUrl}/rdv`, rdv, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const bookRdv = async (rdvId: string, flashId: string) => {
    const response = await axios.post(`${apiUrl}/rdv/book`, { rdvId, flashId }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const getRdvById = async (rdvId: string) => {
    const response = await axios.get(`${apiUrl}/rdv/${rdvId}`);
    return response.data;
};

export const getAllRdvsArtist = async () => {
    const response = await axios.get(`${apiUrl}/rdv/artist`);
    return response.data;
};

export const getAllRdvsClient = async () => {
    const response = await axios.get(`${apiUrl}/rdv/client`);
    return response.data;
};

export const updateRdvById = async (rdvId: string, updateData: Partial<Rdv>) => {
    const response = await axios.patch(`${apiUrl}/rdv/${rdvId}`, updateData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteRdvById = async (rdvId: string) => {
    const response = await axios.delete(`${apiUrl}/rdv/${rdvId}`);
    return response.data;
};
