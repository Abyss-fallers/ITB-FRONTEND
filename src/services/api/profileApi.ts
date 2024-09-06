import { apiClient, handleApiError } from './apiClient'

export const fetchProfileData = async (accessToken: string) => {
  try {
    const response = await apiClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching profile data:', error)
    handleApiError(error)
    throw error
  }
}
