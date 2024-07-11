// services/userService.ts

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

interface Tag {
    id: string;
    name: string;
}

interface Flash {
    id: string;
    image: string;
    tags: Tag[];
    available: boolean;
}

interface User {
    _id?: string;
    email: string;
    lastname: string;
    firstname: string;
    username: string;
    role: string;
    password?: string;
    flash?: Flash;
    rdv_ids?: string[];
}

export const getOneUser = async (username: string) => {
    const response = await axios.get(`${API_URL}/${username}`);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateUserById = async (userId: string, userData: Partial<User>) => {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return response.data;
};

export const deleteUserById = async (userId: string) => {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
};
