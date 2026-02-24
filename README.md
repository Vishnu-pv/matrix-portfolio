# Terminal Portfolio v4.0.0

A high-end, immersive developer portfolio with a futuristic Matrix-inspired terminal aesthetic. This project features a fully functional CLI, a "System Mind" AI chatbot, interactive 3D elements, and synthesized audio feedback.

## 🚀 Experience the Matrix
- **[Live Demo](https://your-portfolio-url.com)** (Update this link)
- **Cinematic Boot Sequence**: A 11-second "System Initiation" handshake satisfying browser audio policies.
- **Interactive Terminal**: Custom command-line interface with persistent history and drag-and-drop support.
- **System Mind AI**: A persona-driven chatbot integrated directly into the terminal core.
- **3D Core Architecture**: Real-time rotating logo and HUD annotations built with React Three Fiber.
- **Dynamic Status Dashboard**: Futuristic system monitors that fill the void when the terminal is retracted.

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Engine**: [Three.js](https://threejs.org/) via [@react-three/fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Audio Engine**: Custom Web Audio API implementation for synthesized and external sound playback.

## 📁 Project Structure
```text
src/
├── components/          # React components (Terminal, 3D Scene, Dashboard)
├── utils/               # AI Responder logic and SoundEngine
├── assets/              # Static assets and images
└── App.jsx              # Main application orchestrator
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development mode:
   ```bash
   npm run dev
   ```

## 🔊 Audio Features
This portfolio utilizes a custom **SoundEngine** to manage immersive audio:
- **Initiation Handshake**: Required for browser audio playback.
- **Synthesized Effects**: Mechanical typing clicks and digital HUD pings.
- **External Support**: Supports `.m4a` for boot sequences and `.mp3` for background music.

## 🤖 AI Core
The terminal is powered by a simulated "System Mind" (`aiResponder.js`) that handles unrecognized commands with a unique cyberpunk persona.

## 📜 License
MIT
