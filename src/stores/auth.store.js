import { baseUrl } from '@/config/config'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    async login(email, password) {
      const { data } = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password
      })

      this.user = data
      this.token = data.token
    },
    async register(email, password, name) {
      const { data } = await axios.post(`${baseUrl}/auth/register`, {
        email,
        password,
        name
      })

      this.user = data
      this.token = data.token
    },
    async logout() {
      this.user = null
      this.token = null
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage
      }
    ]
  }
})
