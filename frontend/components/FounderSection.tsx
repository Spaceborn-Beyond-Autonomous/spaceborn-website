'use client'

import { Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'

export default function FounderSection() {
  return (
    <section id="founder" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-900/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-glow">
            <span className="text-white tracking-wider">MEET THE FOUNDER</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square hologram rounded-3xl overflow-hidden relative">
              <Image
                src="/team/adarsh.jpeg"
                alt="Adarsh Kumar"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full animate-pulse-slow" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gray-500/10 rounded-full animate-spin-slow" />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 uppercase tracking-wide">
              Adarsh Kumar
            </h3>
            <p className="text-xl text-white/60 mb-6 uppercase tracking-wider">Founder & CEO</p>

            <p className="text-white/80 mb-4">
              Adarsh Kumar, a Computer Science student at IIT Madras, founded Spaceborn with a vision
              to revolutionize autonomous security through cutting-edge AI and drone technology.
              He leads the mission to create intelligent security systems that protect what matters most.
            </p>

            <p className="text-white/80 mb-6">
              Under his leadership, Spaceborn has become a pioneer in autonomous security solutions,
              combining advanced AI algorithms with precision engineering to deliver unmatched protection
              for critical infrastructure worldwide.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/adarsh-kumar-ab8111377/"
                target="_blank"
                rel="noopener noreferrer"
                className="hologram rounded-lg p-3 hover:border-white/50 transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:adarsh@spaceborn.com"
                className="hologram rounded-lg p-3 hover:border-white/50 transition-all duration-300 group"
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
