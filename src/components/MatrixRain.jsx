import React, { useEffect, useRef } from 'react';

const MatrixRain = ({ isMobile }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%#&_';
        const fontSize = isMobile ? 12 : 16;
        const columns = Math.floor(width / (isMobile ? fontSize * 1.5 : fontSize));
        const drops = Array(columns).fill(0).map(() => Math.random() * -100);
        const speeds = Array(columns).fill(0).map(() => 1 + Math.random() * 2);

        const draw = () => {
            ctx.fillStyle = 'rgba(13, 2, 8, 0.1)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px VT323, monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));

                // Opacity based on speed - faster drops are brighter
                const opacity = Math.min(1, speeds[i] / 2.5);
                ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;

                ctx.fillText(text, i * (isMobile ? fontSize * 1.5 : fontSize), drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                    speeds[i] = 1 + Math.random() * 2;
                }

                drops[i] += speeds[i] * (isMobile ? 0.4 : 0.6);
            }
        };

        const interval = setInterval(draw, isMobile ? 40 : 33);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // No need to reset drops on resize, let them flow
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        />
    );
};

export default MatrixRain;
