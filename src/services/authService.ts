import config from '@/config'
import Cookies from 'js-cookie'

export const loginService = async (email: string, password: string) => {
  const response = await fetch(`${config.apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Не получилось. Попробуй ещё раз :(')
  }

  const data = await response.json()
  Cookies.set('token', data.token, {
    expires: 7,
    secure: true,
    sameSite: 'strict',
  })

  return data
}

export const registerService = async (
  fullName: string,
  email: string,
  password: string,
) => {
  const response = await fetch(`${config.apiUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullName, email, password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      errorData.message ||
        'Не получилось зарегистрироваться. Попробуйте снова.',
    )
  }

  const data = await response.json()
  Cookies.set('token', data.token, {
    expires: 7,
    secure: true,
    sameSite: 'strict',
  })

  return data
}
