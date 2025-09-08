/**
 * 给图片添加水印的工具函数
 */

/**
 * 创建水印Canvas
 * @param {HTMLImageElement} img - 原始图片元素
 * @param {string} watermarkText - 水印文字
 * @returns {HTMLCanvasElement} 包含水印的Canvas
 */
export function addWatermarkToImage(img, watermarkText = "AI 生成") {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // 设置Canvas尺寸与图片一致
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  // 绘制原始图片
  ctx.drawImage(img, 0, 0);
  
  // 计算水印参数（更精确的计算）
  const imageWidth = canvas.width;
  const imageHeight = canvas.height;
  
  // 根据图片尺寸动态调整字体大小
  const baseFontSize = Math.min(imageWidth, imageHeight) / 25;
  const fontSize = Math.max(baseFontSize, 14); // 最小字体14px
  
  // 边距计算
  const padding = Math.max(imageWidth * 0.02, 10); // 最小边距10px
  
  // 设置字体样式
  ctx.font = `bold ${fontSize}px "Arial", "Microsoft YaHei", sans-serif`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  
  // 测量文字尺寸
  const metrics = ctx.measureText(watermarkText);
  const textWidth = metrics.width;
  const textHeight = fontSize;
  
  // 计算水印位置（右下角）
  const watermarkX = imageWidth - padding;
  const watermarkY = imageHeight - padding;
  
  // 绘制水印背景（圆角矩形）
  const backgroundPadding = fontSize * 0.3;
  const backgroundX = watermarkX - textWidth - backgroundPadding;
  const backgroundY = watermarkY - textHeight - backgroundPadding;
  const backgroundWidth = textWidth + backgroundPadding * 2;
  const backgroundHeight = textHeight + backgroundPadding * 2;
  const borderRadius = fontSize * 0.2;
  
  // 创建圆角矩形路径
  ctx.beginPath();
  ctx.moveTo(backgroundX + borderRadius, backgroundY);
  ctx.lineTo(backgroundX + backgroundWidth - borderRadius, backgroundY);
  ctx.quadraticCurveTo(backgroundX + backgroundWidth, backgroundY, backgroundX + backgroundWidth, backgroundY + borderRadius);
  ctx.lineTo(backgroundX + backgroundWidth, backgroundY + backgroundHeight - borderRadius);
  ctx.quadraticCurveTo(backgroundX + backgroundWidth, backgroundY + backgroundHeight, backgroundX + backgroundWidth - borderRadius, backgroundY + backgroundHeight);
  ctx.lineTo(backgroundX + borderRadius, backgroundY + backgroundHeight);
  ctx.quadraticCurveTo(backgroundX, backgroundY + backgroundHeight, backgroundX, backgroundY + backgroundHeight - borderRadius);
  ctx.lineTo(backgroundX, backgroundY + borderRadius);
  ctx.quadraticCurveTo(backgroundX, backgroundY, backgroundX + borderRadius, backgroundY);
  ctx.closePath();
  
  // 填充半透明黑色背景
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fill();
  
  // 绘制水印文字
  ctx.fillStyle = '#ffffff';
  ctx.fillText(watermarkText, watermarkX, watermarkY);
  
  return canvas;
}

/**
 * 将File对象转换为Image对象
 * @param {File} file - 图片文件
 * @returns {Promise<HTMLImageElement>} 图片元素
 */
export function fileToImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('图片加载失败'));
    };
    
    img.src = url;
  });
}

/**
 * 将Canvas转换为Blob对象
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {string} type - 图片类型 (默认: 'image/png')
 * @param {number} quality - 图片质量 (0-1, 默认: 0.9)
 * @returns {Promise<Blob>} 图片Blob
 */
export function canvasToBlob(canvas, type = 'image/png', quality = 0.9) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

/**
 * 批量处理图片添加水印
 * @param {File[]} files - 图片文件数组
 * @param {Function} onProgress - 进度回调函数
 * @returns {Promise<Array>} 处理结果数组
 */
export async function processImagesWithWatermark(files, onProgress) {
  const results = [];
  
  for (let i = 0; i < files.length; i++) {
    try {
      const file = files[i];
      
      // 更新进度 - 开始处理
      if (onProgress) {
        onProgress(i / files.length, i + 1, files.length);
      }
      
      // 转换为图片元素
      const img = await fileToImage(file);
      
      // 添加水印
      const canvas = addWatermarkToImage(img);
      
      // 转换为Blob
      const blob = await canvasToBlob(canvas, file.type);
      
      // 创建下载URL
      const processedUrl = URL.createObjectURL(blob);
      
      results.push({
        original: file,
        processed: blob,
        processedUrl,
        name: file.name,
        originalUrl: URL.createObjectURL(file)
      });
      
      // 更新进度 - 完成处理
      if (onProgress) {
        onProgress((i + 1) / files.length, i + 1, files.length);
      }
    } catch (error) {
      console.error(`处理图片 ${files[i].name} 时出错:`, error);
      
      results.push({
        original: files[i],
        processed: null,
        processedUrl: null,
        name: files[i].name,
        originalUrl: URL.createObjectURL(files[i]),
        error: error.message
      });
    }
  }
  
  return results;
}

/**
 * 下载单个文件
 * @param {Blob} blob - 文件Blob
 * @param {string} filename - 文件名
 */
export function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 获取带水印的文件名
 * @param {string} originalName - 原始文件名
 * @returns {string} 带水印标识的文件名
 */
export function getWatermarkedFilename(originalName) {
  const lastDotIndex = originalName.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return `${originalName}_watermarked`;
  }
  
  const name = originalName.substring(0, lastDotIndex);
  const extension = originalName.substring(lastDotIndex);
  return `${name}_watermarked${extension}`;
}