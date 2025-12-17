import { configureStore } from '@reduxjs/toolkit'
import authSlice from "../redux/features/authSlice.js"

export const store = configureStore({
  reducer: {
    // add reducers here
    auth:authSlice
  },
})