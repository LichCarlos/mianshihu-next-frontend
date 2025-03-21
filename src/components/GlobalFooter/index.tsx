import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="global-footer">
      <div>© {currentYear} 面试狐-智能面试刷题平台</div>
      <div>
        <a href="" target="_blank">
          <span>关于我们</span>
        </a>
      </div>
    </div>
  );
}
