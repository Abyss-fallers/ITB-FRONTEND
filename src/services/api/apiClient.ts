import config from '@/config'
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import Cookies from 'js-cookie'

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

interface TokenResponse {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

const TOKEN_EXPIRATION_BUFFER = 5 * 60 * 1000

let refreshTimer: NodeJS.Timeout | null = null
let isRefreshing = false
let failedRequestsQueue: Array<{
  resolve: (token: string) => void
  reject: (err: any) => void
}> = []

const setAccessToken = (accessToken: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  Cookies.set('accessToken', accessToken, {
    expires: 1,
    secure: true,
    sameSite: 'strict',
  })
}

const setRefreshToken = (refreshToken: string, expiresAt: number) => {
  Cookies.set('refreshToken', refreshToken, {
    expires: 90,
    secure: true,
    sameSite: 'strict',
  })
  Cookies.set('expiresAt', String(expiresAt))

  scheduleTokenRefresh(expiresAt)
}

const scheduleTokenRefresh = (expiresAt: number) => {
  const expiresIn = expiresAt - Date.now() - TOKEN_EXPIRATION_BUFFER
  if (expiresIn > 0) {
    refreshTimer = setTimeout(async () => {
      await refreshAccessToken()
    }, expiresIn)
  }
}

const removeAuthTokens = () => {
  delete apiClient.defaults.headers.common['Authorization']
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  Cookies.remove('expiresAt')
  clearTimeout(refreshTimer as NodeJS.Timeout)
}

export const setAuthToken = async (
  accessToken: string,
  refreshToken?: string,
  expiresAt?: number,
) => {
  if (accessToken) {
    setAccessToken(accessToken)
    if (refreshToken && expiresAt) {
      setRefreshToken(refreshToken, expiresAt)
    }
  } else {
    removeAuthTokens()
  }
}

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message || 'Произошла ошибка. Попробуйте снова.'
    console.error('API Error:', message)
    throw new Error(message)
  }
  console.error('Unexpected Error:', error)
  throw new Error('Произошла неожиданная ошибка.')
}

export const refreshAccessToken = async (): Promise<string> => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedRequestsQueue.push({ resolve, reject })
    })
  }

  try {
    isRefreshing = true
    const refreshToken = Cookies.get('refreshToken')

    if (!refreshToken) {
      throw new Error('Refresh token not found')
    }

    const response = await apiClient.post<TokenResponse>('/auth/refresh', {
      token: refreshToken,
    })

    const {
      accessToken,
      refreshToken: newRefreshToken,
      expiresAt,
    } = response.data

    await setAuthToken(accessToken, newRefreshToken, expiresAt)
    processQueue(null, accessToken)
    return accessToken
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.error('Refresh token is invalid or not found')

        removeAuthTokens()
        window.location.href = '/login'
      } else {
        console.error('Failed to refresh access token:', error.message)
      }
    }
    processQueue(error)
    throw new Error('Unable to refresh access token')
  } finally {
    isRefreshing = false
  }
}

const processQueue = (error: any, token: string | null = null) => {
  failedRequestsQueue.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token)
    } else {
      reject(error)
    }
  })
  failedRequestsQueue = []
}

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get('accessToken')
    const expiresAt = Number(Cookies.get('expiresAt'))

    if (
      accessToken &&
      expiresAt &&
      Date.now() >= expiresAt - TOKEN_EXPIRATION_BUFFER
    ) {
      try {
        await refreshAccessToken()
      } catch (error) {
        console.error('Error refreshing token:', error)
        removeAuthTokens()
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error: unknown) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshAccessToken()
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return apiClient(originalRequest)
      } catch (e) {
        console.error('Error retrying request:', e)
        return Promise.reject(e)
      }
    }
    return Promise.reject(error)
  },
)
