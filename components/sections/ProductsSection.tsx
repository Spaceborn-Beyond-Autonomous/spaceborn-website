'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Satellite, Zap, Shield, Cpu, ArrowRight, Radio, Eye, Lock } from 'lucide-react'

interface SpotlightCardProps {
  children: React.ReactNode
  spotlightColor: string
  className?: string
}

function SpotlightCard({ children, spotlightColor, className }: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}

export default function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState(0)

  const products = [
    {
      name: 'Guardian Pro',
      type: 'explorer',
      tagline: 'Perimeter Security',
      description: 'Advanced autonomous security drone designed for large-scale perimeter monitoring and threat detection.',
      features: ['Thermal Imaging', 'Facial Recognition', 'Intrusion Detection', 'Auto-Patrol Routes'],
      specs: { range: '50 km', battery: '8 hours', payload: '15 kg', speed: '80 km/h' },
      icon: Satellite,
      color: '#ffffff'
    },
    {
      name: 'Sentinel Max',
      type: 'guardian',
      tagline: 'Heavy Security Unit',
      description: 'Heavy-duty surveillance and security drone with advanced threat detection and response capabilities.',
      features: ['Threat Neutralization', 'Real-time Analysis', 'Weather Resistant', 'Stealth Mode'],
      specs: { range: '25 km', battery: '12 hours', payload: '50 kg', speed: '120 km/h' },
      icon: Shield,
      color: '#ffffff'
    },
    {
      name: 'Stealth Scout',
      type: 'scout',
      tagline: 'Covert Surveillance',
      description: 'Compact reconnaissance drone with swarm intelligence capabilities for discrete security monitoring.',
      features: ['Swarm Coordination', 'Silent Operation', 'Night Vision', 'Adaptive Camouflage'],
      specs: { range: '15 km', battery: '6 hours', payload: '2 kg', speed: '60 km/h' },
      icon: Zap,
      color: '#ffffff'
    }
  ]

  const Icon = products[selectedProduct].icon
  const currentColor = products[selectedProduct].color

  return (
    <section id="products" className="py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white tracking-wider">
              OUR FLEET
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Discover our range of autonomous security drones, each engineered for specific security applications
            and equipped with cutting-edge AI technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Drone Visualization */}
          <div className="relative h-96 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent" />

            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }} />
            </div>

            {/* Drone icon in center with animations */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Radar pulse effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border-2 border-white/10 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute w-48 h-48 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                </div>

                {/* Main drone icon */}
                <div className="relative z-10 bg-white/10 p-8 rounded-full border-2 border-white/30 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <Icon className="h-20 w-20 text-white" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' }} />
                </div>

                {/* Orbiting indicators */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.8)' }} />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.8)' }} />
                </div>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 flex gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="absolute top-4 right-4 text-white text-xs font-mono">
              ONLINE
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/30 mb-6 backdrop-blur-sm">
              <Icon className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">{products[selectedProduct].tagline}</span>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">
              {products[selectedProduct].name}
            </h3>

            <p className="text-white/70 mb-6 leading-relaxed">{products[selectedProduct].description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(products[selectedProduct].specs).map(([key, value]) => (
                <div key={key} className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm hover:border-white/20 transition-colors">
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-1">{key}</div>
                  <div className="text-lg font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
              <div className="grid grid-cols-2 gap-3">
                {products[selectedProduct].features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-white/80">
                    <div className="p-1 bg-white/10 rounded">
                      <Cpu className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="bg-white text-black hover:bg-white/90 group transition-all">
              <span className="uppercase tracking-wider font-semibold">Learn More</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const ProductIcon = product.icon
            const isSelected = selectedProduct === index

            return (
              <button
                key={product.name}
                onClick={() => setSelectedProduct(index)}
                className="w-full text-left focus:outline-none group"
              >
                <SpotlightCard
                  spotlightColor="rgba(255, 255, 255, 0.1)"
                  className={`cursor-pointer transition-all duration-300 rounded-xl border overflow-hidden ${isSelected
                      ? 'border-white bg-white/10 scale-105'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:scale-102'
                    }`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-lg transition-all ${isSelected ? 'bg-white' : 'bg-white/10 group-hover:bg-white/20'}`}>
                        <ProductIcon className={`h-6 w-6 transition-colors ${isSelected ? 'text-black' : 'text-white'}`} />
                      </div>
                      <div>
                        <h3 className={`uppercase tracking-wide font-semibold transition-colors ${isSelected ? 'text-white' : 'text-white/80'}`}>
                          {product.name}
                        </h3>
                        <p className="text-sm text-white/50">{product.tagline}</p>
                      </div>
                    </div>

                    <p className={`text-sm transition-colors ${isSelected ? 'text-white/70' : 'text-white/50 group-hover:text-white/60'}`}>
                      {product.description}
                    </p>
                  </div>
                </SpotlightCard>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}