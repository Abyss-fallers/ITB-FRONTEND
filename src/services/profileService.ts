import axios from 'axios'
import { refreshAccessToken } from './api/apiClient'
import { fetchProfileData } from './api/profileApi'

interface ProfileData {
  fullName: string
}

const handleTokenRefresh = async (
  refreshToken: () => Promise<string>,
  fetchData: (token: string) => Promise<ProfileData>,
): Promise<string> => {
  try {
    console.log('Access token expired, attempting to refresh...')
    const newAccessToken = await refreshToken()
    const data = await fetchData(newAccessToken)
    console.log('Profile data received after refreshing token:', data)
    return data.fullName || ''
  } catch (refreshError) {
    if (axios.isAxiosError(refreshError)) {
      console.error('Failed to refresh access token:', refreshError.message)
    } else {
      console.error(
        'An unexpected error occurred while refreshing token:',
        refreshError,
      )
    }

    return ''
  }
}

export const getProfile = async (accessToken: string): Promise<string> => {
  try {
    console.log('Fetching profile data with accessToken:', accessToken)
    const data: ProfileData = await fetchProfileData(accessToken)
    console.log('Profile data received:', data)
    return data.fullName || ''
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to fetch profile data:', error.message)
      if (
        error.response?.status === 401 &&
        error.response?.data?.name === 'JWTExpired'
      ) {
        return handleTokenRefresh(refreshAccessToken, fetchProfileData)
      }
    } else {
      console.error('An unexpected error occurred:', error)
    }

    return ''
  }
}
