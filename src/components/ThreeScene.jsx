import React, { useRef, useMemo } from 'react';
// R3F context check triggered
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Logo3D from './Logo3D';

function Grid() {
    const points = useRef();

    // Create a grid of points
    const [positions] = useMemo(() => {
        const count = 50;
        const pos = new Float32Array(count * count * 3);
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = (i - count / 2) * 2;
                const z = (j - count / 2) * 2;
                pos[(i * count + j) * 3] = x;
                pos[(i * count + j) * 3 + 1] = 0;
                pos[(i * count + j) * 3 + 2] = z;
            }
        }
        return [pos];
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const array = points.current.geometry.attributes.position.array;

        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                const idx = (i * 50 + j) * 3;
                // Wave effect
                const dist = Math.sqrt(Math.pow(i - 25, 2) + Math.pow(j - 25, 2));
                array[idx + 1] = Math.sin(dist * 0.2 - time * 1.5) * 1.5;
            }
        }
        points.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={points} position={[0, -5, 0]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#00FF41"
                sizeAttenuation={true}
                transparent
                opacity={0.5}
            />
        </points>
    );
}

function ScenicLogo({ isTerminalOpen, isMobile }) {
    const logoGroup = useRef();

    useFrame((state) => {
        if (!logoGroup.current) return;

        // Target positions
        let targetX = isTerminalOpen ? 8 : 0;
        let targetY = isTerminalOpen ? 4 : 2;
        let targetZ = isTerminalOpen ? 0 : 5;

        if (isMobile) {
            targetX = isTerminalOpen ? 0 : 0;
            targetY = isTerminalOpen ? 6 : 4;
            targetZ = isTerminalOpen ? -5 : 0;
        }

        // Smoothly lerp towards target
        logoGroup.current.position.x = THREE.MathUtils.lerp(logoGroup.current.position.x, targetX, 0.05);
        logoGroup.current.position.y = THREE.MathUtils.lerp(logoGroup.current.position.y, targetY, 0.05);
        logoGroup.current.position.z = THREE.MathUtils.lerp(logoGroup.current.position.z, targetZ, 0.05);

        // Scale adjustment
        const baseScale = isMobile ? 0.6 : 1;
        const targetScale = isTerminalOpen ? baseScale : baseScale * 1.5;
        const currentScale = logoGroup.current.scale.x;
        const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.05);
        logoGroup.current.scale.set(nextScale, nextScale, nextScale);
    });

    return (
        <group ref={logoGroup} position={[8, 4, 0]}>
            <Logo3D />
        </group>
    );
}

const ThreeScene = ({ isTerminalOpen, isMobile }) => {
    return (
        <Canvas camera={{
            position: isMobile ? [0, 8, 25] : [0, 5, 20],
            fov: isMobile ? 50 : 60
        }}>
            <fog attach="fog" args={['#0D0208', 5, 40]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00FF41" />
            <Grid />
            <ScenicLogo isTerminalOpen={isTerminalOpen} isMobile={isMobile} />
        </Canvas>
    );
};

export default ThreeScene;
