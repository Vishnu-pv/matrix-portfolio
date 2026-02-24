import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

const HUDLabel = ({ isMobile }) => (
    <Html position={isMobile ? [1.2, 1.2, 0] : [2, 2, 0]} center transition>
        <div className={`flex flex-col items-start font-mono text-matrix-green pointer-events-none select-none transition-all duration-500`}>
            <div className="flex items-end">
                <svg width={isMobile ? "60" : "100"} height={isMobile ? "45" : "70"} viewBox={isMobile ? "0 0 60 45" : "0 0 100 70"} className="drop-shadow-[0_0_12px_rgba(0,255,65,0.8)]">
                    {/* Larger 45-degree bent line pointing to the core */}
                    <path d={isMobile ? "M 0 45 L 30 45 L 60 0" : "M 0 70 L 50 70 L 100 0"} fill="none" stroke="#00FF41" strokeWidth="2" strokeDasharray="6 3" />
                    <circle cx="0" cy={isMobile ? "45" : "70"} r="3" fill="#00FF41" />
                </svg>
                <div className={`bg-matrix-dark/70 border-t-2 border-r-2 border-matrix-green/60 ${isMobile ? 'p-2 px-3 mb-8' : 'p-4 px-6 mb-12'} whitespace-nowrap backdrop-blur-lg -ml-1 shadow-[15px_-15px_30px_rgba(0,0,0,0.6)]`}>
                    <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} opacity-70 tracking-[0.2em] uppercase mb-2 flex justify-between font-bold`}>
                        <span>System Node: Core</span>
                        <span className="animate-pulse text-matrix-green">READY</span>
                    </div>
                    <div className={`${isMobile ? 'text-sm' : 'text-xl'} font-bold tracking-tight text-glow-green border-l-2 border-matrix-green pl-3`}>
                        System core -- all systems operational
                    </div>
                </div>
            </div>
        </div>
    </Html>
);

const Logo3D = ({ isMobile }) => {
    const mesh = useRef();
    const sphereRef = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        mesh.current.rotation.x = time * 0.5;
        mesh.current.rotation.y = time * 0.3;

        // Smoothly scale the sphere on hover
        const targetScale = hovered ? 1.5 : 1;
        sphereRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.03);
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={mesh} position={[0, 0, 0]}>
                <dodecahedronGeometry args={[5, 0]} />
                <meshStandardMaterial
                    color="#00FF41"
                    wireframe
                    transparent
                    opacity={0.6}
                />
            </mesh>
            <group>
                <Sphere
                    ref={sphereRef}
                    args={[2.5, 64, 64]}
                    position={[0, 0, 0]}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    <MeshDistortMaterial
                        color="#00FF41"
                        attach="material"
                        distort={0.5}
                        speed={3}
                        roughness={0}
                        emissive="#00FF41"
                        emissiveIntensity={hovered ? 2.5 : 1.5}
                    />
                </Sphere>
                <HUDLabel isMobile={isMobile} />
            </group>
        </Float>
    );
};

export default Logo3D;
