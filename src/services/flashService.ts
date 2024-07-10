// services/flashService.ts

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/flash';

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

export const createFlash = async (flash: Flash, file: File) => {
    const formData = new FormData();
    formData.append('flash', JSON.stringify(flash));
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const updateFlash = async (flash: Flash, file?: File) => {
    const formData = new FormData();
    formData.append('flash', JSON.stringify(flash));
    if (file) {
        formData.append('file', file);
    }

    const response = await axios.put(`${API_URL}/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const deleteFlash = async (flashId: string) => {
    const response = await axios.delete(`${API_URL}/delete`, {
        data: { flashId },
    });

    return response.data;
};

export const getAllFlashes = async (tags?: string[]) => {
    const response = await axios.get(API_URL, {
        params: { tags: tags?.join(',') },
    });

    return response.data;
};

export const getFlashById = async (flashId: string) => {
    const response = await axios.get(`${API_URL}/${flashId}`);

    return response.data;
};
