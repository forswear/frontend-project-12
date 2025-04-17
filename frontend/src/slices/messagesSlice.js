import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (token) => {
    const response = await axios.get('/api/v1/messages', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  }
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNewMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false
        state.messages = action.payload
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { addNewMessage } = messagesSlice.actions
export default messagesSlice.reducer
