import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
  email: string;
  name: string;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  theme: 'light' | 'dark';
}

const initialState: AuthState = {
  token: null,
  user: null,
  theme: 'light',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string; user: UserProfile }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      AsyncStorage.setItem('token', action.payload.token);
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      AsyncStorage.setItem('theme', action.payload);
    },
    loadState: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.theme = action.payload.theme;
    },
  },
});

export const { setToken, clearToken, setTheme, loadState } = authSlice.actions;
export default authSlice.reducer;
