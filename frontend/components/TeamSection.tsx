'use client'

import { Linkedin } from 'lucide-react'
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  image?: string
  linkedin?: string
}

export default function TeamSection() {
  // TODO: Replace with API call
  const teamMembers: TeamMember[] = [
    { name: 'Gourav Thakur', role: 'Core Team Member' },
    { name: 'Rajdeep Mukherjee', role: 'Core Team Member' },
    { name: 'Vipul Bhamare', role: 'Core Team Member' },
    { name: 'Ayush Bhramar', role: 'Core Team Member' },
    { name: 'Soubhagya Nayak', role: 'Core Team Member' },
    { name: 'Hashim', role: 'Core Team Member' },
    { name: 'Ashutosh Rao', role: 'Core Team Member' },
  ]

  return (
    <section id="team" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-900/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-glow">
            <span className="text-white tracking-wider">CORE TEAM</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Meet the brilliant minds driving innovation at Spaceborn
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.name}
              className="hologram rounded-2xl p-6 hover:border-white/50 transition-all duration-300 group"
            >
              <div className="aspect-square hologram rounded-xl overflow-hidden mb-4 relative">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-white/10 to-transparent">
                    <span className="text-4xl font-bold text-white/30">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wide">
                {member.name}
              </h3>
              <p className="text-sm text-white/60 mb-4 uppercase tracking-wider">
                {member.role}
              </p>
              
              {member.linkedin && (
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex hologram rounded-lg p-2 hover:border-white/50 transition-all duration-300"
                >
                  <Linkedin className="h-4 w-4 text-white" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
