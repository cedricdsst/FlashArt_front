// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { authService } from '../services/authService'

interface UserState {
    userId: string | null
    username: string | null
    firstname: string | null
    lastname: string | null
    email: string | null
    role: string | null
}

export const useAuthStore = defineStore('auth', {
    state: (): UserState => ({
        userId: null,
        username: null,
        firstname: null,
        lastname: null,
        email: null,
        role: null
    }),
    actions: {
        async signup(user: { email: string; password: string; username: string }) {
            try {
                const response = await authService.signup(user)
                // Ici, gérer la réponse et stocker les données de l'utilisateur si nécessaire
                // Exemple:
                // this.userId = response.data.userId;
                // this.username = response.data.username;
                // this.email = response.data.email;
            } catch (error) {
                this.clearUser()
                throw error
            }
        },
        async login(user: { email: string; password: string; stayLoggedIn: boolean }) {


            try {
                const response = await authService.login(user);
                // Vérifiez et accédez à la réponse en utilisant response.data
                if (response.data && response.data.userId) {
                    this.userId = response.data.userId;
                    this.username = response.data.username;
                    this.firstname = response.data.firstname;
                    this.lastname = response.data.lastname;
                    this.email = response.data.email;
                    this.role = response.data.role;

                } else {
                    throw new Error('Login failed');
                }
            } catch (error) {
                this.clearUser();
                throw error;
            }
        },
        async logout() {
            try {
                await authService.logout()
                this.clearUser()
            } catch (error) {
                throw error
            }
        },

        async verifyToken() {
            try {
                const response = await authService.verifyToken();

                if (response && response.data) {
                    this.userId = response.data.userId;
                    this.username = response.data.username;
                    this.firstname = response.data.firstname;
                    this.lastname = response.data.lastname;
                    this.email = response.data.email;
                    this.role = response.data.role;
                } else {

                    this.clearUser();
                }
            } catch (error) {

                this.clearUser();
                console.error("Erreur lors de la vérification du token: ", error);
            }
        }
        ,
        clearUser() {
            this.userId = null
            this.username = null
            this.email = null
            this.role = null
        }
    }
})
