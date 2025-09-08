import React, { useState, useCallback } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImagesUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      onImagesUpload(files);
    }
  }, [onImagesUpload]);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      onImagesUpload(files);
    }
  }, [onImagesUpload]);

  return (
    <div className="image-upload">
      <div 
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <div className="upload-icon">📸</div>
          <h3>拖拽图片到此处或点击上传</h3>
          <p>支持 JPG、PNG、WEBP 等格式</p>
          <input 
            type="file" 
            multiple 
            accept="image/*"
            onChange={handleFileInput}
            className="file-input"
            id="file-input"
          />
          <label htmlFor="file-input" className="upload-button">
            选择图片
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;