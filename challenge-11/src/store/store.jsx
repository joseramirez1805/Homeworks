import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/authSlices'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
});