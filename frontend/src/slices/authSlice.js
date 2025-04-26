import { createSlice } from '@reduxjs/toolkit'
import {
  getAuthFromStorage,
  setAuthToStorage,
  clearAuthStorage,
} from '../services/authService'

const initialState = {
  user: getAuthFromStorage(),
  isAuthenticated: !!getAuthFromStorage().token,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogIn: (state, { payload }) => {
      const { username, token } = payload
      state.user = { username, token }
      state.isAuthenticated = true
      setAuthToStorage({ username, token })
    },
    userLogOut: (state) => {
      state.user = { username: null, token: null }
      state.isAuthenticated = false
      clearAuthStorage()
    },
  },
})

export const { userLogIn, userLogOut } = authSlice.actions
export default authSlice.reducer
