import { DEFAULT_USER } from "@/constants/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * 登录用户全局状态
 */
export const loginUserSlice: any = createSlice({
  name: "loginUser",
  initialState: DEFAULT_USER,
  reducers: {
    setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
      return {
        ...action.payload,
      };
    },
  },
});


// 修改状态
export const { setLoginUser } = loginUserSlice.actions;//setLoginUser是生成action对象的

export default loginUserSlice;
