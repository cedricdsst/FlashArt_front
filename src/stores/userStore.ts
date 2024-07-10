// stores/userStore.ts

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getOneUser, getAllUsers, updateUserById, deleteUserById } from '../services/userService';

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

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([]);
    const currentUser = ref<User | null>(null);

    const fetchUsers = async () => {
        try {
            users.value = await getAllUsers();
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const fetchUserByUsername = async (username: string) => {
        try {
            currentUser.value = await getOneUser(username);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    const updateUser = async (userId: string, userData: Partial<User>) => {
        try {
            const updatedUser = await updateUserById(userId, userData);
            const index = users.value.findIndex(u => u._id === updatedUser.user._id);
            if (index !== -1) {
                users.value[index] = updatedUser.user;
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            await deleteUserById(userId);
            users.value = users.value.filter(u => u._id !== userId);
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return {
        users,
        currentUser,
        fetchUsers,
        fetchUserByUsername,
        updateUser,
        deleteUser,
    };
});
