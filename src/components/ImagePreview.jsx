import React from 'react';
import './ImagePreview.css';

const ImagePreview = ({ images, onRemoveImage, onDownloadSingle, onDownloadAll, onClearAll }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="image-preview">
      <div className="preview-header">
        <h3>图片预览 ({images.length}张)</h3>
        <div className="preview-actions">
          <button 
            onClick={onDownloadAll}
            className="download-all-btn"
            disabled={images.length === 0}
          >
            批量下载
          </button>
          <button 
            onClick={onClearAll}
            className="clear-all-btn"
            disabled={images.length === 0}
          >
            清空所有
          </button>
        </div>
      </div>
      
      <div className="preview-grid">
        {images.map((imageData, index) => (
          <div key={index} className="preview-item">
            <div className="image-container">
              <img 
                src={imageData.processedUrl || imageData.originalUrl} 
                alt={`预览 ${index + 1}`}
                className="preview-image"
              />
              <div className="image-overlay">
                <button 
                  onClick={() => onRemoveImage(index)}
                  className="remove-btn"
                  title="删除图片"
                >
                  ✕
                </button>
                <button 
                  onClick={() => onDownloadSingle(index)}
                  className="download-btn"
                  title="下载单张"
                  disabled={!imageData.processedUrl}
                >
                  ⬇
                </button>
              </div>
            </div>
            <div className="image-info">
              <span className="image-name">{imageData.name}</span>
              <span className={`processing-status ${imageData.processedUrl ? 'processed' : 'pending'}`}>
                {imageData.processedUrl ? '已处理' : '待处理'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;