'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Cpu, Satellite } from 'lucide-react'

function FloatingDrone() {
  const meshRef = useRef<any>(null!)
  const propellerRefs = useRef<any[]>([])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3
    }
    propellerRefs.current.forEach((ref) => {
      if (ref) {
        ref.rotation.y = state.clock.elapsedTime * 10
      }
    })
  })

  return (
    <group ref={meshRef}>
      <Sphere args={[1, 32, 32]} scale={1.5}>
        <MeshDistortMaterial
          color="#FFFFFF"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
      {/* Drone propellers */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh position={[2, 0.5, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.2]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh 
            ref={(el) => (propellerRefs.current[i] = el)}
            position={[2, 0.7, 0]}
          >
            <boxGeometry args={[1, 0.05, 0.1]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 scan-line" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold mb-6 text-glow"
          >
            <span className="text-white tracking-wider">
              SECURITY
            </span>
            <br />
            <span className="text-gray-400 tracking-widest">REDEFINED</span>
            <br />
            <span className="text-white tracking-wider">
              AUTONOMOUS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-white/80 mb-8 max-w-2xl"
          >
            Advanced autonomous security drones with AI-powered intelligence, 
            protecting what matters most with precision and reliability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 group relative overflow-hidden glow-border">
              <span className="relative z-10">EXPLORE DRONES</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black hologram">
              WATCH DEMO
            </Button>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center lg:justify-start space-x-8"
          >
            {[
              { icon: Zap, label: 'Autonomous' },
              { icon: Cpu, label: 'AI-Powered' },
              { icon: Satellite, label: 'Security-First' },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center space-y-2"
              >
                <div className="p-3 rounded-full bg-white/10 border border-white/30 glow-border">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm text-white/60 uppercase tracking-wider">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right 3D Model */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-96 lg:h-[500px]"
        >
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFFFFF" />
            <FloatingDrone />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}