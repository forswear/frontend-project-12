import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEYS = {
  USERNAME: 'username',
  TOKEN: 'token',
}

const INITIAL_STATE = {
  user: {
    username: null,
    token: null,
  },
}

const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error('LocalStorage access error:', error)
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('LocalStorage access error:', error)
    }
  },
  get: (key) => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('LocalStorage access error:', error)
      return null
    }
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    userLogIn: (state, { payload }) => {
      const { username, token } = payload
      state.user = { username, token }
      storage.set(STORAGE_KEYS.USERNAME, username)
      storage.set(STORAGE_KEYS.TOKEN, token)
    },
    userLogOut: (state) => {
      state.user = INITIAL_STATE.user
      storage.remove(STORAGE_KEYS.USERNAME)
      storage.remove(STORAGE_KEYS.TOKEN)
    },
    initializeAuth: (state) => {
      const username = storage.get(STORAGE_KEYS.USERNAME)
      const token = storage.get(STORAGE_KEYS.TOKEN)
      if (username && token) {
        state.user = { username, token }
      }
    },
  },
})

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.user.token

export const { actions } = authSlice
export default authSlice.reducer
