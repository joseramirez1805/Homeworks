import { createSlice } from '@reduxjs/toolkit'
import { Queue } from '../../utils/Queue'

const queue = new Queue()

const dmsSlice = createSlice({
  name: 'dms',
  initialState: {
    queue: [],
  },
  reducers: {
    setDms(state, action) {
      queue.clear()
      action.payload.forEach(item => queue.enqueue(item))
      state.queue = queue.toArray()
    },
    enqueueDM(state, action) {
      queue.enqueue(action.payload)
      state.queue = queue.toArray()
    },
    dequeueDM(state) {
      queue.dequeue()
      state.queue = queue.toArray()
    },
    clearDms(state) {
      queue.clear()
      state.queue = queue.toArray()
    },
  },
})

export const { setDms, enqueueDM, dequeueDM, clearDms } = dmsSlice.actions
export default dmsSlice.reducer
