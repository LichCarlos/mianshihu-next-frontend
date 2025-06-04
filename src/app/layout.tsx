"use client"
import { ClientSideSuspense } from "@liveblocks/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { Provider, useDispatch } from "react-redux";
import BasicLayout from "@/layouts/BasicLayout";
import { useCallback, useEffect } from "react";
import AccessLayout from "@/access/AccessLayout";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";

import { setLoginUser } from "@/stores/loginUser";
import LoadingIndicator from '@/components/LoadingIndicator';

/**
 * 全局逻辑初始化
 * @param param0 
 * @returns 
 */
//@
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  // 初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // 更新全局用户状态
      dispatch(setLoginUser(res.data))
    } else {

      console.log("未登录");
    }
  }, []);

  // 只执行一次
  useEffect(() => {
    doInitLoginUser();
  }, []);
  return children;
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <ClientSideSuspense fallback={<LoadingIndicator />}>
          <AntdRegistry>
            <Provider store={store}>
              <InitLayout>
                <BasicLayout>
                  <AccessLayout>{children}</AccessLayout>
                </BasicLayout>
              </InitLayout>
            </Provider>
          </AntdRegistry>
        </ClientSideSuspense>
      </body>
    </html>
  );
}