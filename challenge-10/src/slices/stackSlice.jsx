// src/slices/stackSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    push: (state, action) => {
      state.items.push(action.payload);
    },
    pop: (state) => {
      if (state.items.length > 0) {
        state.items.pop();
      }
    },
  },
});

export const { push, pop } = stackSlice.actions;
export default stackSlice.reducer;