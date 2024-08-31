import { fetchProfileData } from './api/profileApi'

export const getProfile = async (token: string): Promise<string> => {
  try {
    const data = await fetchProfileData(token)
    return data.fullName || ''
  } catch (error) {
    console.error('Failed to fetch profile data', error)
    return ''
  }
}
