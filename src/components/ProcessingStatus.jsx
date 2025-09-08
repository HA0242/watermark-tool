import React from 'react';
import './ProcessingStatus.css';

const ProcessingStatus = ({ isProcessing, progress, currentImage, totalImages }) => {
  if (!isProcessing) return null;

  return (
    <div className="processing-status">
      <div className="progress-container">
        <div className="progress-info">
          <span className="progress-text">
            正在处理图片 {currentImage || Math.ceil(progress * totalImages)} / {totalImages}
          </span>
          <span className="progress-percentage">
            {Math.round(progress * 100)}%
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;