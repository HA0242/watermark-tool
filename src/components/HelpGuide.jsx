import React, { useState } from 'react';
import './HelpGuide.css';

const HelpGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="help-guide">
      <button 
        className="help-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        title="使用帮助"
      >
        ❓
      </button>
      
      {isOpen && (
        <div className="help-content">
          <div className="help-header">
            <h3>使用说明</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="help-steps">
            <div className="help-step">
              <span className="step-number">1</span>
              <div className="step-content">
                <h4>上传图片</h4>
                <p>拖拽图片到上传区域，或点击选择图片按钮</p>
              </div>
            </div>
            
            <div className="help-step">
              <span className="step-number">2</span>
              <div className="step-content">
                <h4>自动处理</h4>
                <p>系统会自动为每张图片添加"AI 生成"水印</p>
              </div>
            </div>
            
            <div className="help-step">
              <span className="step-number">3</span>
              <div className="step-content">
                <h4>下载图片</h4>
                <p>可以单张下载或批量下载所有处理好的图片</p>
              </div>
            </div>
          </div>
          
          <div className="help-features">
            <h4>特性说明</h4>
            <ul>
              <li>🔒 隐私安全：所有处理在本地进行，不上传到服务器</li>
              <li>⚡ 快速处理：支持批量处理多张图片</li>
              <li>📱 响应式：支持手机和桌面设备</li>
              <li>🎨 智能适配：水印大小自动适应图片尺寸</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpGuide;