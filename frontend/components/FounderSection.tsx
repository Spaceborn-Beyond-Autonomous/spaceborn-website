'use client'

import { Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'

export default function FounderSection() {
  return (
    <section id="founder" className="py-20 relative overflow-hidden bg-black">
      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black to-transparent z-10" />

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative order-1">
            <div className="aspect-3/4 rounded-2xl overflow-hidden relative">
              <Image
                src="/team/adarsh.jpeg"
                alt="Adarsh Kumar"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-tr from-black/40 via-transparent to-black/20" />
            </div>
          </div>

          {/* Content Section */}
          <div className="order-2 flex flex-col justify-center">
            {/* Large name typography - key feature from Dominic design */}
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-none">
              <span className="block text-white">Adarsh</span>
              <span className="block text-white">Kumar</span>
            </h2>

            {/* Role description */}
            <div className="mb-8">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                Founder & CEO
              </h3>
              <p className="text-sm text-white/50 uppercase tracking-wider">
                IIT Madras • Computer Science
              </p>
            </div>

            {/* Bio text */}
            <div className="space-y-4 mb-8 max-w-xl">
              <p className="text-white/70 leading-relaxed">
                Visionary founder revolutionizing autonomous security through cutting-edge AI and drone technology. Leading the mission to create intelligent security systems that protect what matters most.
              </p>

              <p className="text-white/70 leading-relaxed">
                Under his leadership, Spaceborn pioneers autonomous security solutions, combining advanced AI algorithms with precision engineering to deliver unmatched protection for critical infrastructure worldwide.
              </p>
            </div>

            {/* CTA and social links */}
            <div className="flex items-center gap-4">
              <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-all duration-300 flex items-center gap-2 group">
                Get in touch
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <a
                href="https://www.linkedin.com/in/adarsh-kumar-ab8111377/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 rounded-full p-3 hover:border-white/50 hover:bg-white/5 transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="mailto:adarsh@spaceborn.com"
                className="border border-white/20 rounded-full p-3 hover:border-white/50 hover:bg-white/5 transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
