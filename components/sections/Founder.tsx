'use client'

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Linkedin } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  image: string
  words: string
  linkedin: string
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      name: "Adarsh Kumar",
      role: "Founder & Chief Executive Officer",
      linkedin: "https://www.linkedin.com/in/adarsh-kumar-ab8111377/",
      words: "Building autonomous intelligence systems that redefine how machines perceive, decide, and act in the real world.",
      image: "/team/adarsh.png"
    },
  ]

  const [currentIndex] = useState(0)
  const member = teamMembers[currentIndex]

  return (
    <section className="relative py-28 px-20 bg-black overflow-hidden">

      <div>
        <p className="uppercase text-white relative z-20 text-center mb-20 text-[2.7rem] font-bold">The founder</p>
      </div>

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {member.name}
          </h2>

          <p className="text-white/60 text-lg mb-6">
            {member.role}
          </p>

          <p className="text-white/70 max-w-lg leading-relaxed mb-8">
            {member.words}
          </p>

          <button
            onClick={() => window.open(member.linkedin, "_blank")}
            className="group flex items-center gap-2 text-white border border-white/20 px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            <Linkedin className="h-5 w-5" />
            View Profile
            <ArrowRight className="h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* RIGHT FLOATING IMAGE CARD */}
        <div className="relative flex justify-center">

          <div className="relative h-[480px] w-[320px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover grayscale hover:grayscale-0 transition duration-500"
            />

            {/* subtle overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

          </div>

        </div>

      </div>
    </section>
  )
}