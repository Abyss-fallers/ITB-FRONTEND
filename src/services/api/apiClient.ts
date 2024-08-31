import config from '@/config'
import axios from 'axios'
import Cookies from 'js-cookie'

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setAuthToken = (token: string) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    Cookies.set('token', token, {
      expires: 90,
      secure: true,
      sameSite: 'strict',
    })
  } else {
    delete apiClient.defaults.headers.common['Authorization']
    Cookies.remove('token')
  }
}

export const handleApiError = (error: any) => {
  const message =
    error.response?.data?.message || 'Произошла ошибка. Попробуйте снова.'
  throw new Error(message)
}
