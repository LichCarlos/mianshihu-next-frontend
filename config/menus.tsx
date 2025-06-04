import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import { ACCESS_ENUM } from "@/access/accessEnum";

// 菜单列表
export const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    access: ACCESS_ENUM.ADMIN,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: ACCESS_ENUM.ADMIN
      },
      {
        path: "/admin/bank",
        name: "题库管理",
        access: ACCESS_ENUM.ADMIN,
      },
      {
        path: "/admin/question",
        name: "题目管理",
        access: ACCESS_ENUM.ADMIN,
      },

    ],
  },
  {
    path: "/admin/question/ai",
    name: "ai生成题目",
    access: ACCESS_ENUM.ADMIN
  },
  {
    path: "/mockInterview/add",
    name: "AI 模拟面试",
    target: "_blank",
  },
  {
    name: "个人网站",
    path: "https://lichcarlos.top", // 确保添加了完整的 URL
    target: "_blank", // 在新标签页中打开
    rel: "noopener noreferrer" // 为了安全性和性能，建议添加此属性
  },
  {
    name: "博客",
    path: "https://lichcarlos-blog.netlify.app/",
    target: "_blank",
    rel: "noopener noreferrer"
  }
] as MenuDataItem[];

// 导出


export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
  return findMenuItemByPath(menus, path);
};

// 根据路径查找菜单（递归）
export const findMenuItemByPath = (
  menus: MenuDataItem[],
  path: string,
): MenuDataItem | null => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const matchedMenuItem = findMenuItemByPath(menu.children, path);
      if (matchedMenuItem) {
        return matchedMenuItem;
      }
    }
  }
  return null;
};
