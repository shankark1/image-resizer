# ImageResizer — Fast & Modern Client-Side Utility

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-Design%20System-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Vanilla%20JS-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS">
</p>

**ImageResizer** is a sleek, user-friendly, browser-based image resizing application built with modern web technologies. Designed for speed and complete privacy, it allows users to quickly resize images without needing any server-side processing, using the HTML5 Canvas API directly in the browser.

---

## ✨ Key Features

- **🚀 Client-Side Processing**: All image resizing is done securely on your device using the HTML5 Canvas API. Zero server uploads mean total privacy and zero latency.
- **📁 Drag & Drop Interface**: Intuitive upload zone allowing users to drag and drop images or select them from their device instantly.
- **🔗 Aspect Ratio Lock**: Toggle the aspect ratio lock to maintain the original proportions of your image, or unlock it for custom, exact dimensions.
- **⚡ Quick Size Presets**: One-click resizing to common dimensions (e.g., 1920x1080 FHD, 1080x1080 Square, 1280x720 HD, 800x600 Web).
- **🎨 Modern UI/UX**: Clean, responsive design featuring premium glassmorphism elements, dynamic background blobs, smooth micro-animations, and Phosphor iconography.
- **🖼️ Format Support**: Works seamlessly out of the box with `JPG`, `PNG`, and `WEBP` image formats.

---

## 📁 Project Structure

```text
image-resizer/
├── index.html            # Semantic HTML5 application interface
├── style.css             # Premium design system with CSS tokens & glassmorphism
└── script.js             # Client-side state machine & HTML5 Canvas resizing engine
```

---

## 🛠️ Installation & Setup

### Prerequisites
Since this is a fully static client-side web application, **no build steps, dependencies, or local backend servers are required.** 

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/image-resizer.git
cd image-resizer
```

### 2. Run the Application
Open the application directly in your web browser. You can do this by simply double-clicking the `index.html` file or by dragging it into your browser tab. 

You can also serve it through a local development server (like VS Code's Live Server) for hot-reloading if you wish to make modifications.

---

## 🔒 Privacy & Best Practices

- **Zero Data Harvesting**: Because the app runs entirely in your browser using vanilla JavaScript and HTML5 Canvas, your files never leave your device.
- **Local Generation**: Resized images are generated as Base64 Data URLs and downloaded securely to your local file system directly from memory.

---

## 📄 License

This project is open-source and free to use for personal or commercial projects.
