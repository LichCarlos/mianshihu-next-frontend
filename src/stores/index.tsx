import { configureStore } from '@reduxjs/toolkit'
import loginUser from './loginUser'

const store = configureStore({
  reducer: {
    loginUser
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store