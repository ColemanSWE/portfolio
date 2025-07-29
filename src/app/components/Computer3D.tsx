'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useFBX } from '@react-three/drei'
import * as THREE from 'three'

function ComputerModel({ onLoad }: { onLoad: () => void }) {
  const meshRef = useRef<THREE.Group>(null)
  const scene = useFBX('/3d/comp.fbx')
  
  // Simplified effect - removed material modifications for better performance
  useEffect(() => {
    if (scene) {
      onLoad()
    }
  }, [scene, onLoad])

  // Smooth rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 // Smooth continuous rotation
    }
  })

  return (
    <group ref={meshRef} scale={[0.15, 0.15, 0.15]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  )
}

export default function Computer3D() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldRender3D, setShouldRender3D] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    // Delay 3D rendering to improve initial load
    const timer = setTimeout(() => {
      setShouldRender3D(true)
    }, 1000)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
      clearTimeout(timer)
    }
  }, [])

  const handleModelLoad = () => {
    setIsLoading(false)
  }

  // Show placeholder if 3D not ready
  if (!shouldRender3D) {
    return (
      <div className="w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
        <div className="glass-morphism-bright p-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-cyan-400/30 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-cyan-400/50 rounded"></div>
            </div>
            <p className="font-bold text-base tracking-wider uppercase text-white">
              3D MODEL
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="w-64 h-64 md:w-96 md:h-96 relative" 
      style={{
        background: 'transparent',
        cursor: isMobile ? 'default' : 'pointer',
        touchAction: isMobile ? 'pan-y' : 'auto'
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass-morphism-bright p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="font-bold text-base tracking-wider uppercase text-white">
                LOADING 3D MODEL...
              </p>
            </div>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 150], fov: 45 }}
        style={{ background: 'transparent' }}
        // Performance optimizations
        dpr={1} // Fixed DPR to reduce computation
        performance={{ min: 0.1 }} // Very low performance threshold
        frameloop="always" // Always render for continuous animation
        gl={{ 
          antialias: false, // Disable antialiasing for performance
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Minimal lighting */}
        <ambientLight intensity={1} />
        
        <Suspense fallback={null}>
          <ComputerModel onLoad={handleModelLoad} />
        </Suspense>
        
        {!isMobile && (
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            enableDamping={false} // Disabled for performance
          />
        )}
      </Canvas>
    </div>
  )
} 