"use client";
import {
  GithubFilled,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, message } from "antd";
import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import { menus } from "../../../config/menus";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import "./index.css";
import { DEFAULT_USER } from "@/constants/user";
import { setLoginUser } from "@/stores/loginUser";
import { userLogoutUsingPost } from "@/api/userController";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const loginUser: any = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("退出登录成功！");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e: any) {
      message.error('登录失败，' + e.message);
    }
  };

  useEffect(() => {
    console.log('Client loginUser:', loginUser);
  }, [loginUser]);

  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="面试狐智能刷题面试平台"
        layout="top"
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="面试刷题网站 - 面试狐"
          />
        }
        location={{ pathname }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser.userName || "面试狐",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "userCenter",
                      icon: <UserOutlined />,
                      label: "个人中心",
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event) => {
                    const { key } = event;
                    if (key === "logout") {
                      userLogout();
                    } else if (key === "userCenter") {
                      router.push("/user/center");
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a key="github" href="https://github.com/LichCarlos" target="_blank">
              <GithubFilled />
            </a>,
          ];
        }}
        footerRender={() => <GlobalFooter />}
        menuDataRender={() => getAccessibleMenus(loginUser, menus)}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>

    </div>
  );
}
