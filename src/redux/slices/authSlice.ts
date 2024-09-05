import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface AuthState {
  isLoggedIn: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      if (typeof window !== 'undefined') {
        const { accessToken, refreshToken } = action.payload
        Cookies.set('accessToken', accessToken, {
          expires: 60,
          secure: true,
          sameSite: 'strict',
        })
        Cookies.set('refreshToken', refreshToken, {
          expires: 60,
          secure: true,
          sameSite: 'strict',
        })
      }
    },
    logout: (state) => {
      state.isLoggedIn = false
      if (typeof window !== 'undefined') {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
      }
    },
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const accessToken = Cookies.get('accessToken')
        const refreshToken = Cookies.get('refreshToken')
        state.isLoggedIn = !!accessToken && !!refreshToken
      }
    },
  },
})

export const { login, logout, initializeAuth } = authSlice.actions
export default authSlice.reducer
