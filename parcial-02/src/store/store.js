import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './slices/postsSlice'
import notificationsReducer from './slices/notificationsSlice'
import dmsReducer from './slices/dmsSlice'
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationsReducer,
    dms: dmsReducer,
    auth: authReducer,
  },
})

export default store
