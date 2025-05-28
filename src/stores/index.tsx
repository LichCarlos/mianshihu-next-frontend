import { configureStore } from '@reduxjs/toolkit'
import { loginUserSlice } from './loginUser'

const store = configureStore({
  reducer: {
    loginUser: loginUserSlice.reducer,//收到action后，根据action的type去执行操作，完成数据修改
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store