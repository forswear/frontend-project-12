import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/v1/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNewMessage: (state, action) => {
      const messageExists = state.messages.some(
        (msg) => msg.id === action.payload.id
      );
      if (!messageExists) {
        state.messages.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        const { t } = useTranslation();
        toast.error(t('error_loading_messages'));
      });
  },
});

export const { addNewMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
