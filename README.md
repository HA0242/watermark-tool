# AI 图片水印工具

一个简单、快速、安全的图片水印添加工具，专为AI生成的图片设计。

## ✨ 特性

- 🔒 **隐私安全**：所有处理在本地进行，不上传到服务器
- ⚡ **快速处理**：支持批量处理多张图片
- 📱 **响应式设计**：完美支持手机和桌面设备
- 🎨 **智能适配**：水印大小自动适应图片尺寸
- 🖼️ **格式支持**：支持 JPG、PNG、WEBP 等常见格式
- 📦 **批量下载**：一键打包下载所有处理好的图片

## 🚀 使用方法

1. **上传图片**：拖拽图片到上传区域，或点击选择图片按钮
2. **自动处理**：系统会自动为每张图片添加"AI 生成"水印
3. **下载图片**：可以单张下载或批量下载所有处理好的图片

## 🛠️ 技术栈

- **前端框架**：React 18
- **构建工具**：Vite
- **图片处理**：HTML5 Canvas API
- **文件处理**：JSZip + FileSaver
- **样式**：纯CSS

## 💻 本地开发

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── ImageUpload.jsx     # 图片上传组件
│   ├── ImagePreview.jsx    # 图片预览组件
│   ├── ProcessingStatus.jsx # 处理状态组件
│   └── HelpGuide.jsx       # 帮助指南组件
├── utils/              # 工具函数
│   ├── watermark.js        # 水印处理逻辑
│   └── download.js         # 下载功能
├── App.jsx             # 主应用组件
├── App.css             # 主样式文件
├── index.css           # 全局样式
└── main.jsx            # 应用入口
```

## 🎯 核心功能实现

### 水印算法

- 水印位置：固定在图片右下角
- 水印大小：根据图片尺寸动态调整（约为图片宽度的10%）
- 字体大小：自适应，最小14px
- 背景样式：半透明黑色圆角背景，白色文字

### 性能优化

- 异步处理：使用Promise避免阻塞UI
- 内存管理：及时释放Blob URL避免内存泄漏
- 进度显示：实时显示处理进度

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [Canvas API 文档](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [JSZip 文档](https://stuk.github.io/jszip/)
- [File API 文档](https://developer.mozilla.org/en-US/docs/Web/API/File)

---

💡 **提示**：该工具设计为纯前端应用，无需后端服务器，可以直接部署到任何静态网站托管服务上。
