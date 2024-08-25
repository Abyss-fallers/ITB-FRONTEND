import config from '@/config'
import Cookies from 'js-cookie'

export type AuthType = 'login' | 'register'

export const authService = async (
  authType: AuthType,
  values: Record<string, string>,
) => {
  const endpoint = authType === 'login' ? 'login' : 'register'
  const response = await fetch(`${config.apiUrl}/auth/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Произошла ошибка. Попробуйте снова.')
  }

  const data = await response.json()
  Cookies.set('token', data.token, {
    expires: 90,
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
  })

  return data
}
