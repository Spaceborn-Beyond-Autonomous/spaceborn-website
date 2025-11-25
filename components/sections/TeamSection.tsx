'use client'

import { Linkedin } from 'lucide-react'
import Image from 'next/image'
import ProfileCard from '@/components/cards/ProfileCard/ProfileCard'

interface TeamMember {
  name: string
  role: string
  image: string
  linkedin: string
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    { name: 'Gourav Thakur', role: 'Chief Operating Officer', linkedin: 'https://www.linkedin.com/in/gourav-thakur-77a682389/', image: '/team/gourav.png' },
    { name: 'Soubhagya Nayak', role: 'Chief Technology Officer', linkedin: 'https://www.linkedin.com/in/soubhagya-nayak-27b9b72a7/', image: '/team/soubhagya.png' },
    { name: 'Hashim Mohamed', role: 'Chief System Architect', linkedin: 'https://www.linkedin.com/in/hashimmohamedta/', image: '/team/hashim.png' },
    { name: 'Ayush Bhramar', role: 'Chief Hardware & Embedded Officer', linkedin: 'https://www.linkedin.com/in/ayush-bhramar-a75944390/', image: '/team/ayush.png' },
    { name: 'Vipul Bhamare', role: 'Chief Robotics & Simulation Officer', linkedin: 'https://www.linkedin.com/in/vipul-bhamare-54579a384/', image: '/team/vipul.png' },

  ]

  const innerGradient = `linear-gradient(
  145deg,
  rgba(10, 10, 10, 0.95) 0%,
  rgba(25, 25, 25, 0.9) 40%,
  rgba(35, 35, 35, 0.85) 100%
)`;

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 place-items-center">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="w-full flex justify-center"
            >
              <ProfileCard
                key={member.name}
                className='group transition-all duration-300 hover:scale-[1.02]'
                name={member.name}
                title={member.role}
                handle={member.name.toLowerCase().replace(/\s+/g, '')}
                status=""
                contactText="Contact Me"
                avatarUrl={member.image}
                miniAvatarUrl={member.image}
                innerGradient={innerGradient}
                behindGlowEnabled={false}
                behindGlowColor="rgba(255, 255, 255, 0.08)"
                behindGlowSize="5%"
                enableTilt={true}
                enableMobileTilt={false}
                showUserInfo={true}
                grainUrl='/images/grain.webp'
                onContactClick={() => {
                  window.open(member.linkedin, '_blank', 'noopener,noreferrer');
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
