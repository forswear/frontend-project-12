import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    username: null,
    token: null,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogIn: (state, { payload }) => {
      const { username, token } = payload
      state.user = { username, token }
      localStorage.setItem('username', username)
      localStorage.setItem('token', token)
    },
    userLogOut: (state) => {
      state.user.username = null
      state.user.token = null
      localStorage.removeItem('username')
      localStorage.removeItem('token')
    },
  },
})

export default authSlice.reducer

export const { userLogIn, userLogOut } = authSlice.actions
