'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Sphere } from '@react-three/drei'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Satellite, Zap, Shield, Cpu, ArrowRight } from 'lucide-react'

function ProductModel({ type }: { type: string }) {
  const meshRef = useRef<any>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  if (type === 'explorer') {
    return (
      <group ref={meshRef}>
        <Box args={[1.5, 0.3, 1.5]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.2} />
        </Box>
        {[0, 1, 2, 3].map((i) => (
          <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
            <Sphere args={[0.1]} position={[1, 0.3, 0]}>
              <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.3} />
            </Sphere>
          </group>
        ))}
      </group>
    )
  }

  if (type === 'guardian') {
    return (
      <group ref={meshRef}>
        <Box args={[2, 0.4, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#CCCCCC" metalness={0.9} roughness={0.1} />
        </Box>
        <Sphere args={[0.3]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.2} />
        </Sphere>
      </group>
    )
  }

  return (
    <group ref={meshRef}>
      <Box args={[1, 0.2, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
      </Box>
      <Sphere args={[0.15]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.4} />
      </Sphere>
    </group>
  )
}

export default function ProductsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProduct, setSelectedProduct] = useState(0)

  const products = [
    {
      name: 'Guardian Pro',
      type: 'explorer',
      tagline: 'Perimeter Security',
      description: 'Advanced autonomous security drone designed for large-scale perimeter monitoring and threat detection.',
      features: ['Thermal Imaging', 'Facial Recognition', 'Intrusion Detection', 'Auto-Patrol Routes'],
      specs: {
        range: '50 km',
        battery: '8 hours',
        payload: '15 kg',
        speed: '80 km/h'
      },
      icon: Satellite,
      gradient: 'from-cosmic-purple to-cosmic-blue'
    },
    {
      name: 'Sentinel Max',
      type: 'guardian',
      tagline: 'Heavy Security Unit',
      description: 'Heavy-duty surveillance and security drone with advanced threat detection and response capabilities.',
      features: ['Threat Neutralization', 'Real-time Analysis', 'Weather Resistant', 'Stealth Mode'],
      specs: {
        range: '25 km',
        battery: '12 hours',
        payload: '50 kg',
        speed: '120 km/h'
      },
      icon: Shield,
      gradient: 'from-cosmic-pink to-cosmic-purple'
    },
    {
      name: 'Stealth Scout',
      type: 'scout',
      tagline: 'Covert Surveillance',
      description: 'Compact reconnaissance drone with swarm intelligence capabilities for discrete security monitoring.',
      features: ['Swarm Coordination', 'Silent Operation', 'Night Vision', 'Adaptive Camouflage'],
      specs: {
        range: '15 km',
        battery: '6 hours',
        payload: '2 kg',
        speed: '60 km/h'
      },
      icon: Zap,
      gradient: 'from-cosmic-cyan to-cosmic-blue'
    }
  ]

  return (
    <section id="products" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/10 via-transparent to-gray-900/10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-glow">
            <span className="text-white tracking-wider">
              OUR FLEET
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover our range of autonomous security drones, each engineered for specific security applications 
            and equipped with cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* 3D Model Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 hologram rounded-2xl relative overflow-hidden"
          >
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFFFFF" />
              <ProductModel type={products[selectedProduct].type} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            </Canvas>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 border border-white/30">
                {React.createElement(products[selectedProduct].icon, { className: "h-5 w-5 text-white" })}
                <span className="text-sm font-medium">{products[selectedProduct].tagline}</span>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide text-glow">
              {products[selectedProduct].name}
            </h3>
            
            <p className="text-white/80 mb-6">
              {products[selectedProduct].description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(products[selectedProduct].specs).map(([key, value]) => (
                <div key={key} className="hologram rounded-lg p-3 glow-border">
                  <div className="text-sm text-white/60 uppercase tracking-wider">{key}</div>
                  <div className="text-lg font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
              <div className="grid grid-cols-2 gap-2">
                {products[selectedProduct].features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4 text-white" />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="bg-white text-black hover:bg-gray-200 hover:scale-105 transition-transform group glow-border">
              <span className="uppercase tracking-wider">Learn More</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Product Selection Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {products.map((product, index) => (
            <Card
              key={product.name}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hologram ${
                selectedProduct === index 
                  ? 'border-white glow-border' 
                  : 'hover:border-white/50'
              }`}
              onClick={() => setSelectedProduct(index)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white glow-border">
                    {React.createElement(product.icon, { className: "h-6 w-6 text-black" })}
                  </div>
                  <div>
                    <CardTitle className="text-white uppercase tracking-wide">{product.name}</CardTitle>
                    <CardDescription>{product.tagline}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}