# Web 3D Viewer (Explore)

A high-performance 3D model viewer designed for CAD and mechanical models, built with modern web technologies.

## 🚀 Features

- **Multi-Format Support**: Load and view `.glb`, `.gltf`, and `.stp` models.
- **CAD-Ready Lighting**: Optimized lighting setup (Headlight, Fill light, Shadowless) for clear mechanical model visualization.
- **Intuitive Navigation**: Quick-view controls for Front, Back, Up, and Down perspectives.
- **Download Support**: Easily download the original CAD files (e.g., `.stp`) directly from the viewer.
- **Zeroth Designs Branding**: Clean and professional interface integrated with brand identity.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **React Bindings**: [@react-three/fiber](https://r3f.docs.pmnd.rs/) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd web-3d-viewer-explore
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Build

Create a production build:
```bash
npm run build
```

## ☁️ Deployment

This project is configured for easy deployment to **Cloudflare Pages**. 
For full deployment instructions, environment variable setup, and routing information, please see the [Cloudflare Deployment Guide](cloudflare-deploy.md).

## 📜 License

Private - All rights reserved.
