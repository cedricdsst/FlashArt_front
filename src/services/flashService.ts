import axios from 'axios';
import { apiUrl } from '@/config';
axios.defaults.withCredentials = true
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
    formData.append('image', file);

    const response = await axios.post(`${apiUrl}/flash`, formData, {
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

    const response = await axios.put(`${apiUrl}/flash`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const deleteFlash = async (flashId: string) => {
    const response = await axios.delete(`${apiUrl}/flash`, {
    
        data: { flashId },
    });

    return response.data;
};

export const getAllFlashes = async (tags?: string[]) => {
    const response = await axios.get(`${apiUrl}/flash`, {
        params: { tags: tags?.join(',') },
        withCredentials: false,
/* export const getAllFlashes = async (tags?: string[], days?:number, location?:number[], km?:number) => {
    console.log({tags,days,location,km})
    const response = await axios.get(API_URL, {
        params: { tags: tags?.join(','), days: days, location: location?.join(','), km: km },
    });
} */
    });
    return response.data;
};

export const getFlashById = async (flashId: string) => {
    const response = await axios.get(`${apiUrl}/flash/${flashId}`, {
        withCredentials: false,
    });

    return response.data;
};
