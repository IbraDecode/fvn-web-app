"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Text, Environment } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import { motion } from "framer-motion"
import type * as THREE from "three"

function EnhancedSmartphoneModel() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Phone Body */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        scale={hovered ? 1.05 : 1}
      >
        <boxGeometry args={[1.6, 3.2, 0.15]} />
        <meshStandardMaterial
          color={clicked ? "#2a2a2a" : "#1a1a1a"}
          metalness={0.9}
          roughness={0.1}
          emissive="#00F0FF"
          emissiveIntensity={hovered ? 0.2 : 0.05}
        />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[1.4, 2.8, 0.02]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#00F0FF" 
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Screen Bezel */}
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[1.45, 2.85, 0.01]} />
        <meshStandardMaterial 
          color="#333333" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Camera Notch */}
      <mesh position={[0, 1.2, 0.1]}>
        <boxGeometry args={[0.3, 0.1, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Home Button */}
      <mesh position={[0, -1.3, 0.1]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
        <meshStandardMaterial 
          color="#444444" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Volume Buttons */}
      <mesh position={[-0.82, 0.5, 0]}>
        <boxGeometry args={[0.02, 0.3, 0.05]} />
        <meshStandardMaterial color="#333333" metalness={0.8} />
      </mesh>
      <mesh position={[-0.82, 0, 0]}>
        <boxGeometry args={[0.02, 0.15, 0.05]} />
        <meshStandardMaterial color="#333333" metalness={0.8} />
      </mesh>

      {/* Power Button */}
      <mesh position={[0.82, 0.8, 0]}>
        <boxGeometry args={[0.02, 0.2, 0.05]} />
        <meshStandardMaterial color="#333333" metalness={0.8} />
      </mesh>

      {/* Screen Content with HTML */}
      <Html
        position={[0, 0, 0.11]}
        transform
        occlude
        style={{
          width: "220px",
          height: "420px",
          background: "linear-gradient(135deg, #0B0B0F 0%, #1a1a2e 50%, #16213e 100%)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontSize: "11px",
          color: "#E5E7EB",
          border: "1px solid rgba(0, 240, 255, 0.3)",
          boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)",
        }}
      >
        <div className="text-center space-y-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
            💬
          </div>
          <div className="text-sm font-bold text-cyan-400">FVN</div>
          <div className="text-xs text-gray-300">Virtual Number Ready</div>
          <div className="text-xs text-green-400 font-mono">+62 812 3456 7890</div>
          
          <div className="w-full space-y-2 mt-4">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">WhatsApp</span>
              <span className="text-green-400">●</span>
            </div>
            <div className="text-xs text-cyan-300 bg-gray-800/50 p-2 rounded">
              OTP: 123456
            </div>
          </div>

          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden mt-3">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" 
              style={{ width: "75%" }} 
            />
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            Received • Just now
          </div>
        </div>
      </Html>

      {/* Ambient Glow */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3.6, 0.4]} />
        <meshStandardMaterial 
          color="#00F0FF" 
          transparent 
          opacity={0.05} 
          emissive="#00F0FF" 
          emissiveIntensity={0.1} 
        />
      </mesh>

      {/* Floating Text */}
      <Text
        position={[0, -2.2, 0]}
        fontSize={0.15}
        color="#00F0FF"
        anchorX="center"
        anchorY="middle"
      >
        Free Virtual Number
      </Text>
    </group>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </Html>
  )
}

export default function EnhancedSmartphoneCanvas() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        style={{ background: "transparent" }}
      >
        <Environment preset="night" />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8A2BE2" />
        <spotLight 
          position={[0, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.5} 
          color="#ffffff"
          castShadow
        />

        <Suspense fallback={<Loader />}>
          <EnhancedSmartphoneModel />
        </Suspense>

        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          maxDistance={10} 
          minDistance={4} 
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Interactive Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p className="text-xs text-gray-400 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
          Click & Drag to rotate • Scroll to zoom • Click phone to interact
        </p>
      </motion.div>
    </div>
  )
}

