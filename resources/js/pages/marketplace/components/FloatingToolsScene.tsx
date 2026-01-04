import React, { useRef, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// GLASSMORPHISM 3D TOOLS - Premium Frosted Glass Effect
// ============================================================================

/**
 * Glass Hammer - Frosted acrylic style
 * Positioned in TOP-RIGHT corner
 */
function GlassHammer({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation?: [number, number, number]; scale?: number }) {
    return (
        <Float
            speed={0.8}           // Slower, subtle movement
            rotationIntensity={0.15}
            floatIntensity={0.3}
        >
            <group position={position} rotation={rotation} scale={scale}>
                {/* Handle */}
                <mesh position={[0, -0.8, 0]}>
                    <cylinderGeometry args={[0.06, 0.08, 1.6, 16]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={6}
                        thickness={0.5}
                        chromaticAberration={0.02}
                        anisotropy={0.3}
                        distortion={0.1}
                        distortionScale={0.2}
                        temporalDistortion={0.1}
                        transmission={0.95}
                        roughness={0.3}
                        color="#f5f5f5"
                    />
                </mesh>

                {/* Head */}
                <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.18, 0.18, 0.9, 8]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={6}
                        thickness={0.8}
                        chromaticAberration={0.03}
                        anisotropy={0.5}
                        distortion={0.15}
                        distortionScale={0.3}
                        temporalDistortion={0.1}
                        transmission={0.9}
                        roughness={0.25}
                        color="#ea580c"  // Brand orange tint
                    />
                </mesh>
            </group>
        </Float>
    );
}

/**
 * Glass Wrench - Frosted acrylic style
 * Positioned in BOTTOM-LEFT corner
 */
function GlassWrench({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation?: [number, number, number]; scale?: number }) {
    return (
        <Float
            speed={0.6}
            rotationIntensity={0.12}
            floatIntensity={0.25}
        >
            <group position={position} rotation={rotation} scale={scale}>
                {/* Handle */}
                <mesh position={[0, -0.6, 0]}>
                    <boxGeometry args={[0.12, 1.4, 0.05]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={6}
                        thickness={0.4}
                        chromaticAberration={0.02}
                        anisotropy={0.3}
                        distortion={0.1}
                        distortionScale={0.2}
                        temporalDistortion={0.08}
                        transmission={0.92}
                        roughness={0.35}
                        color="#ffffff"
                    />
                </mesh>

                {/* Head - Open Jaw */}
                <mesh position={[-0.1, 0.5, 0]}>
                    <boxGeometry args={[0.15, 0.35, 0.05]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={6}
                        thickness={0.5}
                        chromaticAberration={0.03}
                        anisotropy={0.4}
                        distortion={0.12}
                        distortionScale={0.25}
                        temporalDistortion={0.1}
                        transmission={0.88}
                        roughness={0.3}
                        color="#ea580c"
                    />
                </mesh>

                <mesh position={[0.1, 0.45, 0]}>
                    <boxGeometry args={[0.12, 0.2, 0.05]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={6}
                        thickness={0.5}
                        chromaticAberration={0.03}
                        anisotropy={0.4}
                        distortion={0.12}
                        distortionScale={0.25}
                        temporalDistortion={0.1}
                        transmission={0.88}
                        roughness={0.3}
                        color="#ea580c"
                    />
                </mesh>
            </group>
        </Float>
    );
}

/**
 * Glass Chalkboard - Frosted panel
 * Positioned in TOP-LEFT / FAR BACKGROUND
 */
function GlassChalkboard({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation?: [number, number, number]; scale?: number }) {
    return (
        <Float
            speed={0.5}
            rotationIntensity={0.08}
            floatIntensity={0.2}
        >
            <group position={position} rotation={rotation} scale={scale}>
                {/* Main Board */}
                <mesh>
                    <boxGeometry args={[1.2, 0.9, 0.06]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={6}
                        thickness={0.3}
                        chromaticAberration={0.015}
                        anisotropy={0.2}
                        distortion={0.08}
                        distortionScale={0.15}
                        temporalDistortion={0.05}
                        transmission={0.94}
                        roughness={0.4}
                        color="#f8f8f8"
                    />
                </mesh>

                {/* Frame - subtle border */}
                <mesh position={[0, 0.48, 0.02]}>
                    <boxGeometry args={[1.3, 0.06, 0.08]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        thickness={0.4}
                        transmission={0.85}
                        roughness={0.25}
                        color="#ea580c"
                    />
                </mesh>
                <mesh position={[0, -0.48, 0.02]}>
                    <boxGeometry args={[1.3, 0.06, 0.08]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        thickness={0.4}
                        transmission={0.85}
                        roughness={0.25}
                        color="#ea580c"
                    />
                </mesh>
            </group>
        </Float>
    );
}

/**
 * Decorative Glass Spheres - Ambient particles
 */
function GlassSphere({ position, scale = 1, color = "#ffffff" }: { position: [number, number, number]; scale?: number; color?: string }) {
    return (
        <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.15}>
            <mesh position={position} scale={scale}>
                <sphereGeometry args={[0.15, 24, 24]} />
                <MeshTransmissionMaterial
                    backside
                    samples={4}
                    thickness={0.6}
                    chromaticAberration={0.04}
                    anisotropy={0.3}
                    distortion={0.2}
                    distortionScale={0.4}
                    temporalDistortion={0.15}
                    transmission={0.96}
                    roughness={0.2}
                    color={color}
                />
            </mesh>
        </Float>
    );
}

// ============================================================================
// SCENE COMPOSITION
// ============================================================================

function GlassScene() {
    const { viewport } = useThree();

    // Responsive adjustments
    const isMobile = viewport.width < 6;
    const isTablet = viewport.width < 10 && viewport.width >= 6;

    const baseScale = isMobile ? 0.5 : isTablet ? 0.7 : 0.85;  // 40% smaller than original
    const cornerOffset = isMobile ? 2.5 : isTablet ? 3.5 : 4.5;

    return (
        <>
            {/* Soft ambient lighting for glass reflections */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, 5, 10]} intensity={0.6} color="#fff0e6" />

            {/* Environment for realistic glass reflections */}
            <Environment preset="city" />

            {/* HAMMER - Top Right Corner, pushed back */}
            <GlassHammer
                position={[cornerOffset, 2.5, -3]}
                rotation={[0.2, -0.4, 0.3]}
                scale={baseScale * 0.9}
            />

            {/* WRENCH - Bottom Left Corner, pushed back */}
            <GlassWrench
                position={[-cornerOffset, -2, -2]}
                rotation={[0.1, 0.3, -0.4]}
                scale={baseScale}
            />

            {/* CHALKBOARD - Top Left, far background */}
            <GlassChalkboard
                position={[-cornerOffset * 0.8, 2, -5]}
                rotation={[0.05, 0.2, 0.02]}
                scale={baseScale * 0.8}
            />

            {/* Decorative Glass Spheres - subtle ambient particles */}
            <GlassSphere position={[cornerOffset * 0.6, 1, -4]} scale={0.8} color="#ea580c" />
            <GlassSphere position={[-cornerOffset * 0.5, -1.5, -3]} scale={0.6} color="#ffffff" />
            <GlassSphere position={[cornerOffset * 0.3, -2.5, -4]} scale={0.5} color="#fed7aa" />
            <GlassSphere position={[-cornerOffset * 0.7, 0.5, -5]} scale={0.4} color="#ffffff" />
        </>
    );
}

// ============================================================================
// MAIN EXPORT - Fallback to Ceramic if Glass too heavy
// ============================================================================

interface FloatingToolsSceneProps {
    useGlassMaterial?: boolean;
    className?: string;
}

export function FloatingToolsScene({ className = '' }: FloatingToolsSceneProps) {
    return (
        <div className={`absolute inset-0 pointer-events-none ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 12], fov: 35 }}  // Pulled back camera
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <GlassScene />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default FloatingToolsScene;
