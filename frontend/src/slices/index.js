import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer, // Исправляем ключ на "auth", а не "authReducer"
  },
})
