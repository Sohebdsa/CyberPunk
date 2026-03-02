# 🖤 Cyberpunk 3D Experience

A visually immersive Cyberpunk-themed 3D web application featuring an interactive 3D helmet model with stunning visual effects.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=flat&logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-0.183.2-000000?style=flat&logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP-3.14.2-88CE04?style=flat&logo=gsap)

## 📸 Screenshots

> Add your screenshots here

![Cyberpunk 3D App Screenshot](./s1.png)
*Main landing page with 3D helmet model*

![Cyberpunk 3D App Screenshot](./s2.png)
*Interactive 3D view with orbit controls*

---

## 🎥 Demo Video

> Add your demo video here

[![Cyberpunk 3D Demo Video](./cyberpunkSS.gif)]

Or embed a video:

```
html
<video width="100%" controls>
  <source src="./demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

---

## ✨ Features

- **3D Rendering** - Interactive 3D helmet model using Three.js
- **HDR Environment Mapping** - Realistic lighting with pond_bridge_night HDRI
- **Post-Processing Effects** - RGB shift shader for cyberpunk visual effects
- **Interactive Controls** - OrbitControls with zoom, pan, and damping
- **Mouse Interaction** - 3D model responds to mouse movement with smooth GSAP animations
- **Responsive Design** - Adapts to any screen size

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 7
- **3D Library:** Three.js 0.183
- **Animation:** GSAP 3.14 (with ScrollToPlugin)
- **Language:** JavaScript (ES6+)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```
bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd CyberPunk

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
CyberPunk/
├── public/                      # Static assets
│   ├── DamagedHelmet.gltf     # 3D helmet model
│   ├── DamagedHelmet.bin      # 3D model binary
│   ├── *.jpg                  # Texture files
│   └── pond_bridge_night_1k.hdr # HDRI environment map
├── src/
│   ├── 3dScript.js            # Three.js scene initialization
│   ├── App.jsx                # Main React component
│   ├── App.css                # Component styles
│   ├── index.css              # Global styles
│   └── main.jsx               # React entry point
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies
└── eslint.config.js           # ESLint configuration
```

## 🎮 Key Components

### 3D Scene (`src/3dScript.js`)

The core 3D rendering logic includes:
- **Scene Setup** - Perspective camera with 25° FOV
- **GLTF Loader** - Loads the damaged helmet 3D model
- **HDR Environment** - Real environmentistic night lighting
- **Post-Processing** - RGB shift shader effect
- **Mouse Tracking** - GSAP-powered smooth rotation on mouse move
- **OrbitControls** - Camera interaction (zoom, pan, rotate)

### Main App (`src/App.jsx`)

React component with:
- Navigation bar with cyberpunk branding
- Hero section with 3D canvas
- Responsive layout

## 🎨 Customization

### Modifying 3D Model

Replace `public/DamagedHelmet.gltf` with your own GLTF/GLB model and update the loader path in `src/3dScript.js`.

### Adjusting Visual Effects

Edit post-processing settings in `src/3dScript.js`:
```
javascript
// RGB Shift intensity
shaderPass.uniforms["amount"].value = 0.005;

// Or add more effects
```

### Changing Environment Map

Replace `public/pond_bridge_night_1k.hdr` with another HDRI and update the loader path.

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 🔧 Configuration

### Vite Config (`vite.config.js`)

Currently uses the React plugin. Add more configurations as needed:
```
javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Three.js community for 3D rendering
- GSAP for smooth animations
- Khronos Group for GLTF format
- Poly Haven for HDRI textures

---

Made with ❤️ using React + Three.js
