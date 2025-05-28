import React, { useEffect, useState } from 'react';
import './index.css';

const LoadingIndicator = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // 模拟延迟显示加载动画，避免闪烁
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-overlay ${isActive ? 'active' : ''}`}>
      <div className="loading-card">
        <div className="spinner"></div>
        <h2>资源正在赶来的路上</h2>
        <p>请稍等片刻...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;