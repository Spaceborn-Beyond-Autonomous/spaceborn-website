'use client'

import { Linkedin } from 'lucide-react'
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
    { name: 'Gourav Thakur (Co-Founder)', role: 'Chief Operating Officer', linkedin: 'https://www.linkedin.com/in/gourav-thakur-77a682389/', image: '/team/gourav.png' },
    { name: 'Ayush Bhramar (Co-Founder)', role: 'Chief Hardware & Embedded Officer', linkedin: 'https://www.linkedin.com/in/ayush-bhramar-a75944390/', image: '/team/ayush.png' },
    { name: 'Soubhagya Nayak', role: 'Chief Technology Officer', linkedin: 'https://www.linkedin.com/in/soubhagya-nayak-27b9b72a7/', image: '/team/soubhagya.png' },
    { name: 'Hashim Mohamed', role: 'Chief System Architect', linkedin: 'https://www.linkedin.com/in/hashimmohamedta/', image: '/team/hashim.png' },
    { name: 'Vipul Bhamare', role: 'Chief Robotics & Simulation Officer', linkedin: 'https://www.linkedin.com/in/vipul-bhamare-54579a384/', image: '/team/vipul.png' },
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
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                {/* LinkedIn Overlay on Hover
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Linkedin className="w-8 h-8 text-white" />
                </div> */}
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

        {/* Join Team Section (Optional) */}
        <div className="mt-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl font-bold text-white mb-8">
              Join our team, check open positions
            </h3>
            <button className="border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 mb-8">
              APPLY
            </button>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white">
                <span className="text-2xl">→</span>
                <span>AI/ML Engineer</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <span className="text-2xl">→</span>
                <span>Embedded Systems Engineer</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <span className="text-2xl">→</span>
                <span>Drone Pilot</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src="/team/team-photo.jpg"
              alt="Spaceborn Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
