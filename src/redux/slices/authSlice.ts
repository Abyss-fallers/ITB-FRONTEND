import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isLoggedIn: boolean
}

const initialState: AuthState = {
  isLoggedIn:
    typeof window !== 'undefined' &&
    localStorage.getItem('isLoggedIn') === 'true',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true')
      }
    },
  },
})

export const { login } = authSlice.actions

export default authSlice.reducer
