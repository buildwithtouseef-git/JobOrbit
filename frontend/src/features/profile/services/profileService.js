import API from '../../../api/axios'

const profileService = {
  async getProfile() {
    const response = await API.get('/auth/me')
    return response.data
  },

  async updateProfile(data) {
    const response = await API.put('/profile/update', data)
    return response.data
  },

  async uploadAvatar(formData) {
    const response = await API.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  async changePassword(data) {
    const response = await API.put('/auth/change-password', data)
    return response.data
  },

  async deleteAccount() {
    const response = await API.delete('/profile/delete')
    return response.data
  },
}

export default profileService