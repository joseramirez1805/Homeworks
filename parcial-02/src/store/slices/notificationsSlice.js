import { createSlice } from '@reduxjs/toolkit'
import { Stack } from '../../utils/Stack'

const stack = new Stack()

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    stack: [], 
  },
  reducers: {
    setNotifications(state, action) {
      stack.clear()
      action.payload.forEach(item => stack.push(item))
      state.stack = stack.toArray()
    },
    pushNotification(state, action) {
      stack.push(action.payload)
      state.stack = stack.toArray()
    },
    popNotification(state) {
      stack.pop()
      state.stack = stack.toArray()
    },
    clearNotifications(state) {
      stack.clear()
      state.stack = stack.toArray()
    },
  },
})

export const { setNotifications, pushNotification, popNotification, clearNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer
