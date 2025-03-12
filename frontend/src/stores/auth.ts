import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

interface User {
  id: number
  name: string
  email: string
}

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || null
  }),

  actions: {
    async register(data: RegisterData) {
      try {
        const response = await axios.post('/api/auth/register', data)
        const { token } = response.data
        
        this.token = token
        localStorage.setItem('token', token)
        
        await this.getUser()
        
        return response
      } catch (error) {
        throw error
      }
    },

    async login(data: LoginData) {
      try {
        const response = await axios.post('/api/auth/login', data)
        const { token } = response.data
        
        this.token = token
        localStorage.setItem('token', token)
        
        await this.getUser()
        
        return response
      } catch (error) {
        throw error
      }
    },

    async logout() {
      try {
        await axios.post('/api/auth/logout')
        this.token = null
        this.user = null
        localStorage.removeItem('token')
      } catch (error) {
        console.error('Erro ao fazer logout:', error)
      }
    },

    async getUser() {
      try {
        const response = await axios.get('/api/auth/me')
        this.user = response.data
        return response
      } catch (error) {
        throw error
      }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user
  }
}) 