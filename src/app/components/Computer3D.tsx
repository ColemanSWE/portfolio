'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useFBX } from '@react-three/drei'
import * as THREE from 'three'

function ComputerModel() {
  const meshRef = useRef<THREE.Group>(null)
  const scene = useFBX('/3d/comp.fbx')
  
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

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

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
          <ComputerModel />
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