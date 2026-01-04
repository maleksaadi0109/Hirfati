import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// SIMPLE CONSTRUCTION TOOLS - No errors, stable rendering
// ============================================================================

/**
 * Hex Bolt - Orange branded
 */
function HexBolt({ position, scale = 1, color = "#ea580c" }: { position: [number, number, number]; scale?: number; color?: string }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y += 0.005;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <group ref={ref} position={position} scale={scale}>
                {/* Hexagonal head */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.5, 0.5, 0.25, 6]} />
                    <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Shaft */}
                <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
                    <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.3} />
                </mesh>
            </group>
        </Float>
    );
}

/**
 * Gear - Represents service/machinery
 */
function Gear({ position, scale = 1, color = "#f97316" }: { position: [number, number, number]; scale?: number; color?: string }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z += 0.008;
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.15} floatIntensity={0.25}>
            <group position={position} scale={scale}>
                <mesh ref={ref}>
                    <torusGeometry args={[0.5, 0.12, 6, 8]} />
                    <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
                </mesh>
                {/* Center */}
                <mesh>
                    <cylinderGeometry args={[0.15, 0.15, 0.15, 16]} />
                    <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    );
}

/**
 * Wrench - Simple tool representation
 */
function Wrench({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
            <group ref={ref} position={position} scale={scale}>
                {/* Handle */}
                <mesh>
                    <boxGeometry args={[0.15, 1, 0.06]} />
                    <meshStandardMaterial color="#c0c0c0" metalness={0.85} roughness={0.2} />
                </mesh>
                {/* Open jaw */}
                <mesh position={[0.12, 0.45, 0]}>
                    <boxGeometry args={[0.2, 0.2, 0.06]} />
                    <meshStandardMaterial color="#c0c0c0" metalness={0.85} roughness={0.2} />
                </mesh>
                <mesh position={[-0.12, 0.5, 0]}>
                    <boxGeometry args={[0.15, 0.12, 0.06]} />
                    <meshStandardMaterial color="#c0c0c0" metalness={0.85} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    );
}

/**
 * Hammer - Classic construction tool
 */
function Hammer({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.3;
        }
    });

    return (
        <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.3}>
            <group ref={ref} position={position} scale={scale}>
                {/* Handle */}
                <mesh position={[0, -0.35, 0]}>
                    <cylinderGeometry args={[0.05, 0.06, 0.8, 12]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* Head */}
                <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.45, 8]} />
                    <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.3} />
                </mesh>
            </group>
        </Float>
    );
}

/**
 * Builder Square (L-shaped ruler)
 */
function BuilderSquare({ position, scale = 1, color = "#fb923c" }: { position: [number, number, number]; scale?: number; color?: string }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    return (
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
            <group ref={ref} position={position} scale={scale}>
                {/* Vertical */}
                <mesh position={[0, 0.3, 0]}>
                    <boxGeometry args={[0.08, 0.7, 0.03]} />
                    <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
                </mesh>
                {/* Horizontal */}
                <mesh position={[0.25, -0.04, 0]}>
                    <boxGeometry args={[0.5, 0.08, 0.03]} />
                    <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
                </mesh>
            </group>
        </Float>
    );
}

/**
 * Screw
 */
function Screw({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.15}>
            <group ref={ref} position={position} scale={scale}>
                {/* Head */}
                <mesh>
                    <cylinderGeometry args={[0.15, 0.15, 0.06, 16]} />
                    <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
                </mesh>
                {/* Shaft */}
                <mesh position={[0, -0.22, 0]}>
                    <cylinderGeometry args={[0.06, 0.02, 0.4, 12]} />
                    <meshStandardMaterial color="#777777" metalness={0.85} roughness={0.3} />
                </mesh>
            </group>
        </Float>
    );
}

// ============================================================================
// MAIN SCENE - Stable, no dynamic component selection
// ============================================================================

function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 7]} intensity={1.5} />
            <pointLight position={[-10, -5, -5]} intensity={0.4} color="#ea580c" />

            {/* Tools arranged in corners - NOT blocking center content */}

            {/* TOP LEFT - Orange Bolt */}
            <HexBolt position={[-4, 2.5, -3]} scale={0.8} color="#ea580c" />

            {/* TOP RIGHT - Gear */}
            <Gear position={[4, 2, -4]} scale={0.9} color="#f97316" />

            {/* LEFT SIDE - Wrench */}
            <Wrench position={[-3.5, 0, -2]} scale={0.7} />

            {/* BOTTOM LEFT - Builder Square */}
            <BuilderSquare position={[-3, -2, -3]} scale={0.8} color="#fb923c" />

            {/* BOTTOM RIGHT - Hammer */}
            <Hammer position={[3.5, -2, -2]} scale={0.75} />

            {/* TOP CENTER (far back) - Screw */}
            <Screw position={[-1, 3, -5]} scale={0.7} />

            {/* FAR RIGHT - Small gear accent */}
            <Gear position={[4.5, -0.5, -5]} scale={0.5} color="#fdba74" />

            {/* BOTTOM - Dark bolt */}
            <HexBolt position={[1.5, -2.5, -4]} scale={0.6} color="#475569" />
        </>
    );
}

// ============================================================================
// EXPORT - Simple Canvas setup
// ============================================================================

export function FloatingShapes() {
    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 40 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false
                }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}

export default FloatingShapes;
