import React, { useState, useCallback } from 'react';
import ImageUpload from './components/ImageUpload';
import ImagePreview from './components/ImagePreview';
import ProcessingStatus from './components/ProcessingStatus';
import HelpGuide from './components/HelpGuide';
import { processImagesWithWatermark } from './utils/watermark';
import { downloadImagesAsZip, downloadSingleImage } from './utils/download';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  // 处理图片上传
  const handleImagesUpload = useCallback(async (files) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setCurrentImage(0);
    setTotalImages(files.length);
    
    try {
      const processedImages = await processImagesWithWatermark(
        files, 
        (progress, current, total) => {
          setProcessingProgress(progress);
          setCurrentImage(current);
          setTotalImages(total);
        }
      );
      
      setImages(prev => [...prev, ...processedImages]);
    } catch (error) {
      console.error('处理图片时出错:', error);
      alert('处理图片时出错，请重试');
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
      setCurrentImage(0);
      setTotalImages(0);
    }
  }, []);

  // 删除单张图片
  const handleRemoveImage = useCallback((index) => {
    setImages(prev => {
      const newImages = [...prev];
      // 清理URL对象
      if (newImages[index].originalUrl) {
        URL.revokeObjectURL(newImages[index].originalUrl);
      }
      if (newImages[index].processedUrl) {
        URL.revokeObjectURL(newImages[index].processedUrl);
      }
      newImages.splice(index, 1);
      return newImages;
    });
  }, []);

  // 下载单张图片
  const handleDownloadSingle = useCallback((index) => {
    try {
      downloadSingleImage(images[index]);
    } catch (error) {
      console.error('下载图片时出错:', error);
      alert('下载图片时出错');
    }
  }, [images]);

  // 清空所有图片
  const handleClearAll = useCallback(() => {
    // 清理所有URL对象
    images.forEach(imageData => {
      if (imageData.originalUrl) {
        URL.revokeObjectURL(imageData.originalUrl);
      }
      if (imageData.processedUrl) {
        URL.revokeObjectURL(imageData.processedUrl);
      }
    });
    setImages([]);
  }, [images]);

  // 批量下载
  const handleDownloadAll = useCallback(async () => {
    try {
      await downloadImagesAsZip(images);
    } catch (error) {
      console.error('批量下载时出错:', error);
      alert('批量下载时出错');
    }
  }, [images]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI 图片水印工具</h1>
        <p>为您的图片快速添加"AI 生成"水印</p>
      </header>
      
      <main className="app-main">
        <ProcessingStatus 
          isProcessing={isProcessing}
          progress={processingProgress}
          currentImage={currentImage}
          totalImages={totalImages}
        />
        
        <HelpGuide />
        
        <ImageUpload onImagesUpload={handleImagesUpload} />
        
        <ImagePreview 
          images={images}
          onRemoveImage={handleRemoveImage}
          onDownloadSingle={handleDownloadSingle}
          onDownloadAll={handleDownloadAll}
          onClearAll={handleClearAll}
        />
      </main>
      
      <footer className="app-footer">
        <p>© 2024 AI 图片水印工具 - 简单、快速、安全</p>
      </footer>
    </div>
  );
}

export default App;
