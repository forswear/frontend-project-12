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

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addNewMessage: (state, { payload }) => {
      state.messages.push(payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload
    })
  },
})

export const { addNewMessage } = messagesSlice.actions
export default messagesSlice.reducer
