"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function SmartphoneModel() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group>
      {/* Smartphone Body */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[1.5, 3, 0.2]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          emissive="#00F0FF"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[1.3, 2.6, 0.01]} />
        <meshStandardMaterial color="#000000" emissive="#00F0FF" emissiveIntensity={0.3} />
      </mesh>

      {/* Screen Content */}
      <Html
        position={[0, 0, 0.12]}
        transform
        occlude
        style={{
          width: "200px",
          height: "400px",
          background: "linear-gradient(135deg, #0B0B0F 0%, #121218 100%)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontSize: "12px",
          color: "#E5E7EB",
        }}
      >
        <div className="text-center space-y-2">
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">💬</div>
          <div className="text-xs font-medium">WhatsApp</div>
          <div className="text-xs text-gray-400">OTP: 123456</div>
          <div className="w-full h-1 bg-[#00F0FF]/30 rounded-full overflow-hidden">
            <div className="h-full bg-[#00F0FF] rounded-full animate-pulse" style={{ width: "60%" }} />
          </div>
        </div>
      </Html>

      {/* Glow Effect */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 3.3, 0.3]} />
        <meshStandardMaterial color="#00F0FF" transparent opacity={0.1} emissive="#00F0FF" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
      </div>
    </Html>
  )
}

export default function SmartphoneCanvas() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8A2BE2" />

        <Suspense fallback={<Loader />}>
          <SmartphoneModel />
        </Suspense>

        <OrbitControls enableZoom={true} enablePan={false} maxDistance={8} minDistance={3} autoRotate={false} />
      </Canvas>
    </div>
  )
}
