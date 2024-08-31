import { apiClient, handleApiError } from './apiClient'

export const fetchProfileData = async (token: string) => {
  try {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await apiClient.get('/auth/me')
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
