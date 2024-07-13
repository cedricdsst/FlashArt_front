// src/services/authService.ts


const API_URL = 'http://localhost:3000/api'

interface SignupData {
    email: string
    password: string
    username: string
}

interface LoginData {
    email: string
    password: string
}

export const authService = {
    async signup(data: SignupData) {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
    },

    async login(data: LoginData) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        return response.json()
    },

    async logout() {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include'
        })
        return response.json()
    },

    async verifyToken() {
        const response = await fetch(`${API_URL}/auth/verifyToken`, {
            method: 'GET',
            credentials: 'include'
        })


        return response.json()
    }
}