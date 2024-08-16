import { configureStore } from '@reduxjs/toolkit'
import authReducer, { initializeAuth } from './slices/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

store.dispatch(initializeAuth())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
