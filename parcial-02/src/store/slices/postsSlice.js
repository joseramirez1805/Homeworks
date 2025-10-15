import { createSlice } from '@reduxjs/toolkit'
import { LinkedList } from '../../utils/LinkedList'

const linkedList = new LinkedList()

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [], 
  },
  reducers: {
    setPosts(state, action) {
      linkedList.clear()
      action.payload.forEach(post => linkedList.insertFirst(post))
      state.items = linkedList.toArray()
    },
    addPost(state, action) {
      linkedList.insertFirst(action.payload) 
      state.items = linkedList.toArray()
    },
    removePost(state, action) {
      linkedList.removeById(action.payload)
      state.items = linkedList.toArray()
    },
    clearPosts(state) {
      linkedList.clear()
      state.items = linkedList.toArray()
    },
  },
})

export const { setPosts, addPost, removePost, clearPosts } = postsSlice.actions
export default postsSlice.reducer
