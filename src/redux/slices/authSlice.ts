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
    login: (state) => {
      state.isLoggedIn = true
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true')
        Cookies.set('token', 'your-token', {
          expires: 60,
          secure: true,
          sameSite: 'strict',
        })
      }
    },
    logout: (state) => {
      state.isLoggedIn = false
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isLoggedIn')
        Cookies.remove('token')
      }
    },
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
        state.isLoggedIn = loggedIn
      }
    },
  },
})

export const { login, logout, initializeAuth } = authSlice.actions
export default authSlice.reducer
