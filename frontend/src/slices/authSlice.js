import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    username: null,
    token: null,
  },
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogIn: (state, { payload }) => {
      const { username, token } = payload
      state.user = { username, token }
      state.isAuthenticated = true
      localStorage.setItem('username', username)
      localStorage.setItem('token', token)
    },
    userLogOut: (state) => {
      state.user.username = null
      state.user.token = null
      state.isAuthenticated = false
      localStorage.removeItem('username')
      localStorage.removeItem('token')
    },
    checkAuthStatus: (state) => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        state.isAuthenticated = true
        state.user.token = storedToken
        state.user.username = localStorage.getItem('username') || null
      } else {
        state.isAuthenticated = false
      }
    },
  },
})

export const { userLogIn, userLogOut, checkAuthStatus } = authSlice.actions

export default authSlice.reducer
