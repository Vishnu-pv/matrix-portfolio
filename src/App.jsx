import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import ThreeScene from './components/ThreeScene';
import MatrixRain from './components/MatrixRain';
import StatusDashboard from './components/StatusDashboard';
import MusicToggle from './components/MusicToggle';
import { Terminal as TerminalIcon, X, Maximize2 } from 'lucide-react';
import { motion, useDragControls } from 'framer-motion';
import { soundEngine } from './utils/audio';

function App() {
  const [bootStage, setBootStage] = useState('initiating'); // 'initiating', 'booting', 'initialized', 'entering', 'done'
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const dragControls = useDragControls();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStart = async () => {
    if (bootStage !== 'initiating') return;

    // Satisfy browser audio requirement
    await soundEngine.resume();

    // Pre-load the external audio
    await soundEngine.loadFile('/audio/loading.m4a', 'boot_sound');

    setBootStage('booting');
    soundEngine.playFile('boot_sound', 0.6, 11);

    const sequence = async () => {
      // Stage 1: Booting (extended)
      await new Promise(r => setTimeout(r, 4000));
      setBootStage('initialized');

      // Stage 2: Initialized (extended)
      await new Promise(r => setTimeout(r, 3000));
      setBootStage('entering');

      // Stage 3: Entering Matrix (extended)
      await new Promise(r => setTimeout(r, 4000));
      setBootStage('done');
      soundEngine.playOpen();
    };

    sequence();
  };

  const toggleTerminal = (open) => {
    if (open) {
      setIsTerminalOpen(true);
      soundEngine.playOpen();
    } else {
      setIsTerminalOpen(false);
      soundEngine.playClose();
    }
  };

  return (
    <div className="relative w-screen h-screen bg-matrix-dark overflow-hidden crt font-mono selection:bg-matrix-green selection:text-matrix-dark text-xs sm:text-base">
      <div className="scanline"></div>

      {/* Background Layers */}
      <MatrixRain isMobile={isMobile} />
      {bootStage === 'done' && <MusicToggle />}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <ThreeScene isTerminalOpen={isTerminalOpen} isMobile={isMobile} />
      </div>

      <StatusDashboard isVisible={!isTerminalOpen && bootStage === 'done'} isMobile={isMobile} />

      {/* Terminal UI */}
      {isTerminalOpen ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-0 md:p-10 pointer-events-none">
          <motion.div
            drag={!isMobile}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            initial={{ scale: isMobile ? 1 : 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full h-full ${isMobile ? 'max-w-none max-h-none rounded-none border-0' : 'max-w-[90vw] max-h-[85vh] md:max-w-4xl lg:max-w-5xl xl:max-w-7xl md:mr-40 border border-matrix-green shadow-[0_0_30px_rgba(0,255,65,0.3)] rounded-lg'} bg-matrix-dark/40 overflow-hidden pointer-events-auto backdrop-blur-md`}
          >
            <div
              onPointerDown={(e) => !isMobile && dragControls.start(e)}
              className={`bg-matrix-green/10 border-b border-matrix-green p-3 flex items-center justify-between ${isMobile ? 'cursor-default' : 'cursor-move'} select-none`}
            >
              <div className="flex space-x-3 pointer-events-auto">
                <button onClick={() => toggleTerminal(false)} className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer" title="Close"></button>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-matrix-green/50"></div>
              </div>
              <div className="text-xs md:text-base text-matrix-green/80 flex items-center font-bold">
                <TerminalIcon size={14} className="mr-2" />
                <span>vishnu@portfolio: ~</span>
              </div>
              <div className="opacity-0 w-8"></div> {/* Spacer */}
            </div>
            <div className="p-4 md:p-8 h-[calc(100%-52px)] overflow-y-auto overflow-x-hidden text-sm sm:text-base md:text-xl 2xl:text-2xl">
              <Terminal isMobile={isMobile} />
            </div>
          </motion.div>
        </div>
      ) : (
        /* Re-open Button / Desktop Icon */
        <div className="absolute bottom-10 right-10 z-20 animate-bounce">
          <button
            onClick={() => toggleTerminal(true)}
            className="p-4 bg-matrix-dark/80 border border-matrix-green text-matrix-green rounded-full shadow-[0_0_15px_rgba(0,255,65,0.5)] hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
            title="Open Terminal"
          >
            <Maximize2 size={32} />
          </button>
        </div>
      )}

      {bootStage !== 'done' && (
        <div
          onClick={handleStart}
          className={`absolute inset-0 z-50 bg-matrix-dark flex flex-col items-center justify-center text-matrix-green transition-opacity duration-1000 ${bootStage === 'initiating' ? 'cursor-pointer' : ''}`}
        >
          {bootStage === 'initiating' && (
            <div className="flex flex-col items-center animate-pulse">
              <div className="text-2xl md:text-5xl tracking-[0.3em] font-bold mb-4">TERMINAL SYSTEM v4.0.0</div>
              <div className="text-lg md:text-2xl opacity-60 mb-12">DEK-47 PROTOCOL READY</div>
              <div className="border border-matrix-green p-4 px-10 hover:bg-matrix-green hover:text-matrix-dark transition-all duration-300 font-bold tracking-widest text-xl md:text-3xl">
                CLICK TO INITIATE
              </div>
              <div className="mt-8 text-xs opacity-40 uppercase">A user gesture is required for audio subroutines</div>
            </div>
          )}
          {bootStage === 'booting' && (
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl animate-pulse tracking-widest">SYSTEM BOOTING...</div>
              <div className="mt-8 w-64 md:w-96 h-2 bg-matrix-green/20 rounded-full overflow-hidden">
                <div className="h-full bg-matrix-green animate-[loading_2s_ease-in-out]"></div>
              </div>
            </div>
          )}
          {bootStage === 'initialized' && (
            <div className="text-3xl md:text-5xl tracking-widest animate-pulse">ALL SYSTEMS INITIALIZED</div>
          )}
          {bootStage === 'entering' && (
            <div className="matrix-font text-5xl md:text-8xl tracking-[0.5em] animate-pulse text-glow-green">ENTERING MATRIX</div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .matrix-font {
          font-family: 'VT323', monospace;
          text-shadow: 0 0 20px #00FF41, 0 0 40px #00FF41;
        }

        .text-glow-green {
          color: #00FF41;
          filter: drop-shadow(0 0 10px #00FF41);
        }
        
        /* 4K and Ultra-wide optimization */
        @media (min-width: 2560px) {
          .text-base { font-size: 1.5rem; }
          .text-sm { font-size: 1.25rem; }
        }
      `}</style>
    </div>
  );
}

export default App;
