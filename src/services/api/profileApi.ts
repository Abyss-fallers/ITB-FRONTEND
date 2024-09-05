import { apiClient, handleApiError } from './apiClient'

export const fetchProfileData = async (accessToken: string) => {
  try {
    console.log('Making request to /auth/me with accessToken')
    const response = await apiClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log('Received response from /auth/me:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching profile data:', error)
    handleApiError(error)
    throw error
  }
}
