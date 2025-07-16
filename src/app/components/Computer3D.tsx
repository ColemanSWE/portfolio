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
      onLoad()
    }
  }, [scene, onLoad])
  
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
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
        cursor: isMobile ? 'default' : 'pointer',
        touchAction: isMobile ? 'pan-y' : 'auto'
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="portfolio-border bg-yellow-400 p-6 animate-pulse">
            <div className="flex flex-col items-center space-y-3">
              <div className="portfolio-border bg-black w-12 h-12 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="font-bold text-sm tracking-wider uppercase">
                LOADING 3D MODEL...
              </p>
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