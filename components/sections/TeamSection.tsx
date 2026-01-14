'use client'

// import { Linkedin } from 'lucide-react'
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  image: string
  linkedin: string
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    { name: "Adarsh Kumar (Founder)", role: "Chief Executive Officer", linkedin: "https://www.linkedin.com/in/adarsh-kumar-ab8111377/", image: "/team/adarsh.png" },
    { name: 'Soubhagya Nayak (Co-Founder)', role: 'Chief Technology Officer', linkedin: 'https://www.linkedin.com/in/soubhagya-nayak-27b9b72a7/', image: '/team/soubhagya.png' },
    { name: 'Vipul Bhamare', role: 'Chief Robotics & Simulation Officer', linkedin: 'https://www.linkedin.com/in/vipul-bhamare-54579a384/', image: '/team/vipul.png' },
    { name: 'Abinash Das', role: 'Chief Hardware Officer', linkedin: 'https://www.linkedin.com/in/abinash-das-98a335327/', image: '/team/abinash.jpeg' },
    { name: 'Ripusudan Jha', role: 'Chief System Architect', linkedin: 'https://www.linkedin.com/in/ripusudan-jha/', image: '/team/ripusudan.png' },
    { name: 'Aayush Krishna', role: 'Chief Research Officer', linkedin: 'https://www.linkedin.com/in/aayush-krishna-b79996293/', image: '/team/aayush.png' },
  ];

  return (
    <section id="team" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Team
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group cursor-pointer"
              onClick={() => window.open(member.linkedin, '_blank', 'noopener,noreferrer')}
            >
              {/* Image Container */}
              <div className="relative aspect-3/4 mb-4 overflow-hidden rounded-lg bg-zinc-900">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="
                  (max-width: 768px) 50vw,
                  (max-width: 1024px) 33vw,25vw
                  "
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>

              {/* Member Info */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-sm uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
