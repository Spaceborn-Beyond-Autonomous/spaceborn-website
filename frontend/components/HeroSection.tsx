'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Cpu, Satellite } from 'lucide-react'
import * as THREE from 'three'
import ModelViewer from './ModelViewer'

function FloatingDrone() {
  const meshRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/low_poly_quadcopter_drone.glb')

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <group ref={meshRef}>
      <primitive object={scene} scale={6} />
    </group>
  )
}

export default function HeroSection() {
  const features = [
    { icon: Zap, label: 'Autonomous' },
    { icon: Cpu, label: 'AI-Powered' },
    { icon: Satellite, label: 'Security-First' },
  ]

  return (
    // Hero Section
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 w-full h-1 bg-linear-to-r from-transparent via-white to-transparent opacity-20 scan-line" />

      {/* Hero Text */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 lg:py-0">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-glow leading-tight">
            <span className="text-white tracking-wider">SECURITY</span>
            <br />
            <span className="text-gray-400 tracking-widest">REDEFINED</span>
            <br />
            <span className="text-white tracking-wider">AUTONOMOUS</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0">
            Advanced autonomous security drones with AI-powered intelligence,
            protecting what matters most with precision and reliability.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start px-2 sm:px-0">
            <Button className="bg-white text-black hover:bg-gray-200 group w-full sm:w-auto h-10 sm:h-11 lg:h-12 text-sm sm:text-base">
              <span>EXPLORE DRONES</span>
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black hologram w-full sm:w-auto h-10 sm:h-11 lg:h-12 text-sm sm:text-base">
              WATCH DEMO
            </Button>
          </div>


          {/* Feature Icons */}
          <div className="flex justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature) => (
              <div key={feature.label} className="flex flex-col items-center gap-1.5 sm:gap-2">
                <div className="p-2 sm:p-3 rounded-full bg-white/10 border border-white/30">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>


        {/* 3D Model */}
        <div className="hidden pointer-events-none lg:block lg:h-[600px] relative lg:top-5">
          <div className="w-full h-full">
            <ModelViewer
              url="/models/low_poly_quadcopter_drone.glb"
              width={600}
              height={500}
              autoRotate
              enableMouseParallax={false}
              enableManualRotation={false}
              enableHoverRotation={false}
              enableManualZoom={false}
              showScreenshotButton={false}
              fadeIn={true}
              environmentPreset='city'
            />

          </div>
        </div>
      </div>

      <div className="hidden md:absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
