'use client'

import { Rocket, Brain, Globe, Zap } from 'lucide-react'

export default function AboutSection() {
  const features = [
    {
      icon: Brain,
      title: 'Intelligent Security',
      description: 'Advanced AI algorithms enable real-time threat detection and autonomous security responses.',
    },
    {
      icon: Rocket,
      title: 'Rapid Response',
      description: 'Lightning-fast deployment and response times for critical security situations.',
    },
    {
      icon: Globe,
      title: 'Global Protection',
      description: 'Comprehensive security solutions for facilities, borders, and critical infrastructure worldwide.',
    },
    {
      icon: Zap,
      title: 'Always Ready',
      description: 'Continuous monitoring and instant activation for 24/7 security coverage.',
    },
  ]

  const stats = [
    { number: '1000+', label: 'Sites Protected' },
    { number: '99.9%', label: 'Threat Detection Rate' },
    { number: '24/7', label: 'Security Coverage' },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-900/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-glow">
            <span className="text-white tracking-wider">SECURITY FIRST</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            At Spaceborn, we're not just building drones—we're crafting the future of autonomous security. 
            Our mission is to protect what matters most, creating intelligent security systems 
            that provide unmatched surveillance and threat response capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature) => (
            <div key={feature.title} className="hologram rounded-2xl p-6 hover:border-white/50 transition-all duration-300 group">
              <div className="mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 uppercase tracking-wide">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-wide text-glow">
              Our Vision for Security
            </h3>
            <p className="text-white/80 mb-6">
              We envision a future where autonomous security drones seamlessly integrate with existing security infrastructure, 
              providing comprehensive protection for facilities, borders, events, and critical assets 
              with unprecedented precision and reliability.
            </p>
            <p className="text-white/80 mb-8">
              Every Spaceborn security drone is equipped with advanced AI, enabling real-time threat assessment 
              and autonomous response capabilities. Our technology doesn't just monitor—it analyzes, 
              predicts, and responds intelligently to security challenges.
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square hologram rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-20" />
              <div className="w-32 h-32 bg-white rounded-full animate-pulse-slow flex items-center justify-center relative z-10">
                <Rocket className="h-16 w-16 text-black animate-float" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full animate-spin-slow" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-500/20 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
