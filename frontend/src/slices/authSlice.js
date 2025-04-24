import { createSlice } from '@reduxjs/toolkit';

const getUserFromStorage = () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  if (username && token) {
    return { username, token };
  }

  return { username: null, token: null };
};

const initialState = {
  user: getUserFromStorage(),
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogIn: (state, { payload }) => {
      const { username, token } = payload;
      state.user = { username, token };
      state.isAuthenticated = true;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    },
    userLogOut: (state) => {
      state.user = { username: null, token: null };
      state.isAuthenticated = false;
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    },
  },
});

export const { userLogIn, userLogOut } = authSlice.actions;
export default authSlice.reducer;
