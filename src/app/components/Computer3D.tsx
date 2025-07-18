'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useFBX } from '@react-three/drei'
import * as THREE from 'three'

function ComputerModel({ onLoad }: { onLoad: () => void }) {
  const meshRef = useRef<THREE.Group>(null)
  const scene = useFBX('/3d/comp.fbx')
  
  useEffect(() => {
    if (scene) {
      // Traverse the scene to find and modify the screen material
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const name = child.name.toLowerCase()
          
          // Target the "Comp" mesh specifically since it contains the screen
          if (name === 'comp' && child.material && Array.isArray(child.material)) {
            child.material.forEach((material, index) => {
              // Check if this material might be the screen
              // The screen is likely "Mat.001" or has a blue-ish tint
              if (material.name === 'Mat.001' || 
                  (material.color && material.color.b > 0.5 && material.color.b > material.color.r)) {
                modifyScreenMaterial(material)
              }
            })
          }
          
          // Also check single material objects
          if (child.material && !Array.isArray(child.material)) {
            const material = child.material
            if (material.name === 'Mat.001' || 
                (material.color && material.color.b > 0.5 && material.color.b > material.color.r)) {
              modifyScreenMaterial(material)
            }
          }
        }
      })
      
      onLoad()
    }
  }, [scene, onLoad])
  
  // Helper function to modify screen material properties
  const modifyScreenMaterial = (material: THREE.Material) => {
    if (material instanceof THREE.MeshBasicMaterial || 
        material instanceof THREE.MeshLambertMaterial || 
        material instanceof THREE.MeshPhongMaterial ||
        material instanceof THREE.MeshStandardMaterial) {
      
      // Option 1: Remove blue tint by setting color to white/neutral
      material.color = new THREE.Color(1.0, 1.0, 1.0) // White
      
      // Option 2: Make it transparent as well
      material.transparent = true
      material.opacity = 0.9 // Adjust this value (0 = fully transparent, 1 = fully opaque)
      
      material.needsUpdate = true
    }
  }
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={meshRef} scale={[0.2, 0.2, 0.2]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  )
}

export default function Computer3D() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const handleModelLoad = () => {
    setIsLoading(false)
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
                <div className="absolute inset-0 w-12 h-12 border-2 border-pink-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
              </div>
              <p className="font-bold text-sm tracking-wider uppercase text-white">
                LOADING 3D MODEL...
              </p>
              <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 200], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1}
          intensity={10}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#ffffff" />
        
        <Suspense fallback={null}>
          <ComputerModel onLoad={handleModelLoad} />
        </Suspense>
        
        {!isMobile && (
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.1}
          />
        )}
      </Canvas>
    </div>
  )
} 