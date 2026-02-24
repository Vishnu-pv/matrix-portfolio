import React, { useState, useEffect } from 'react';
import { Music, Music2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const MusicToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Attempt to load BGM on mount
        const loadBGM = async () => {
            const bgmPath = `${import.meta.env.BASE_URL}audio/bgm.mp3`.replace(/\/+/g, '/');
            await soundEngine.loadFile(bgmPath, 'bgm');
            setIsLoaded(true);
        };
        loadBGM();
    }, []);

    const handleToggle = () => {
        if (!isLoaded) return;

        if (isPlaying) {
            soundEngine.stopBgm();
            setIsPlaying(false);
        } else {
            soundEngine.playBgm('bgm', 0.2);
            setIsPlaying(true);
        }
        soundEngine.playTyping(); // Feedback click
    };

    return (
        <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-3">
            <button
                onClick={handleToggle}
                className={`group relative flex items-center justify-center p-3 rounded-full border transition-all duration-500 overflow-hidden ${isPlaying
                    ? 'bg-matrix-green/20 border-matrix-green text-matrix-green shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                    : 'bg-matrix-dark/80 border-matrix-green/30 text-matrix-green/50 hover:border-matrix-green hover:text-matrix-green'
                    }`}
                title={isPlaying ? "Mute Background Music" : "Play Background Music"}
            >
                {/* Animated Background Pulse */}
                {isPlaying && (
                    <div className="absolute inset-0 bg-matrix-green/10 animate-ping opacity-20" />
                )}

                {isPlaying ? <Music className="w-5 h-5 animate-pulse" /> : <Music2 className="w-5 h-5" />}

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-matrix-green/0 via-matrix-green/5 to-matrix-green/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Label */}
            <div className={`text-xs font-bold tracking-[0.2em] transition-all duration-500 overflow-hidden whitespace-nowrap ${isPlaying ? 'max-w-[100px] opacity-70' : 'max-w-0 opacity-0'
                }`}>
                AUDIO_LINK_ACTIVE
            </div>

            {!isLoaded && isPlaying && (
                <div className="text-[10px] animate-pulse text-red-500/70">LOADING_BGM...</div>
            )}
        </div>
    );
};

export default MusicToggle;
