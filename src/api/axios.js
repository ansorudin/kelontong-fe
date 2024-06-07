import { baseUrl } from '@/config/config'
import { useAuthStore } from '@/stores/auth.store'
import axios from 'axios'

const authStore = useAuthStore()

const axiosInstance = axios.create({
  baseURL: baseUrl
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authStore.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
