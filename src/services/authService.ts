import { apiClient, handleApiError, setAuthToken } from './api/apiClient'

export type AuthType = 'login' | 'register'

export const authService = async (
  authType: AuthType,
  values: Record<string, string>,
) => {
  try {
    const endpoint = authType === 'login' ? '/auth/login' : '/auth/register'
    const response = await apiClient.post(endpoint, values)

    const { token } = response.data
    setAuthToken(token)

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
