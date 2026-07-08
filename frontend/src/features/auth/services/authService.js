import API from '../../../api/axios'
import { setAccessToken, clearAccessToken } from '../../../api/tokenStore'

const unwrapApiResponse = (response) => response?.data?.data ?? response?.data ?? {}

const authService = {
  async register(data) {
    const response = await API.post('/auth/register', data)
    return unwrapApiResponse(response)
  },

  async verifyOTP(data) {
    const response = await API.post('/auth/verify-otp', data)
    return unwrapApiResponse(response)
  },

  async resendOTP(data) {
    const response = await API.post('/auth/resend-otp', data)
    return unwrapApiResponse(response)
  },

  async login(data) {
    const response = await API.post('/auth/login', data)
    const payload = unwrapApiResponse(response)

    if (payload.accessToken) {
      setAccessToken(payload.accessToken)
    }

    return payload
  },

  async forgotPassword(data) {
    const response = await API.post('/auth/forgot-password', data)
    return unwrapApiResponse(response)
  },

  async verifyResetOTP(data) {
    const response = await API.post('/auth/verify-reset-otp', data)
    return unwrapApiResponse(response)
  },

  async resetPassword(data) {
    const response = await API.post('/auth/reset-password', data)
    return unwrapApiResponse(response)
  },

  async getProfile() {
    const response = await API.get('/auth/me')
    return unwrapApiResponse(response)
  },

  async logout() {
    try {
      await API.post('/auth/logout')
    } catch (error) {
      // Proceed with client-side logout even if API fails
    }
    clearAccessToken()
  },
}

export default authService