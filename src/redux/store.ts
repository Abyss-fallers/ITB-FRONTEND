import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

const preloadedState = {}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
