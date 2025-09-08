import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getWatermarkedFilename } from './watermark.js';

/**
 * 批量下载处理后的图片为ZIP文件
 * @param {Array} imageDataArray - 图片数据数组
 * @param {string} zipFilename - ZIP文件名
 */
export async function downloadImagesAsZip(imageDataArray, zipFilename = 'watermarked_images.zip') {
  const zip = new JSZip();
  
  // 过滤出已处理的图片
  const processedImages = imageDataArray.filter(item => item.processed);
  
  if (processedImages.length === 0) {
    throw new Error('没有可下载的已处理图片');
  }
  
  // 添加文件到ZIP
  for (const imageData of processedImages) {
    const filename = getWatermarkedFilename(imageData.name);
    zip.file(filename, imageData.processed);
  }
  
  // 生成ZIP文件
  try {
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, zipFilename);
  } catch (error) {
    console.error('生成ZIP文件时出错:', error);
    throw new Error('生成ZIP文件失败');
  }
}

/**
 * 下载单个处理后的图片
 * @param {Object} imageData - 图片数据对象
 */
export function downloadSingleImage(imageData) {
  if (!imageData.processed) {
    throw new Error('图片尚未处理完成');
  }
  
  const filename = getWatermarkedFilename(imageData.name);
  const url = URL.createObjectURL(imageData.processed);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}