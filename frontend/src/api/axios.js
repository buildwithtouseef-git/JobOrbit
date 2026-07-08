import axios from 'axios'
import { getAccessToken, setAccessToken, clearAccessToken } from './tokenStore'

const API = axios.create({
  baseURL: '/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

API.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post('/api/v1/auth/refresh-token', {}, { withCredentials: true })
        setAccessToken(data?.data?.accessToken || null)
        originalRequest.headers.Authorization = `Bearer ${data?.data?.accessToken}`
        return API(originalRequest)
      } catch (refreshError) {
        clearAccessToken()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default API