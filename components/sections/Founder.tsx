'use client'

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, Linkedin } from "lucide-react"

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
      words: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem placeat id reiciendis earum harum quos perspiciatis, rem corporis officiis iure.",
      image: "/team/adarsh.png"
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? teamMembers.length - 1 : prev - 1
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === teamMembers.length - 1 ? 0 : prev + 1
    )
  }

  const member = teamMembers[currentIndex]

  return (
    <section id="team" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h2 className="text-[2rem] md:text-[2.5rem] text-center uppercase font-bold text-white">
            The Founder
          </h2>
          <p className="mt-3 text-center text-white/60">Meet the brilliant minds behind Spaceborn</p>
        </div>

        <div className="flex relative z-0 flex-col-reverse md:flex-row items-center justify-center">

          <div className="absolute z-0 top-1/2 -translate-y-1/2 h-48 w-[90%] rounded-full bg-white/3"></div>
          
          <div className="px-10 md:px-6 py-5 md:py-0">
            <h3 className="text-white text-[2rem] font-semibold mb-2">
              {member.name}
            </h3>
            <p className="text-gray-400 uppercase tracking-wide mb-6">
              {member.role}
            </p>
            <p className="md:w-[30vw] text-white/50">
              {member.words}
            </p>

            <button onClick={() => window.open(member.linkedin, "_blank")} className="text-white w-full md:w-fit group flex items-center justify-center gap-1 border px-4 py-2 mt-5 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition">
              View LinkedIn
              <ArrowRight className="h-5 opacity-70 group-hover:translate-x-1 transition-all duration-200"/>
            </button>
          </div>

          <div>
            <div className="relative h-[50vh] aspect-3/4 cartoon-border2 overflow-hidden rounded-lg bg-zinc-900">
              <Image src={member.image} alt={member.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500"/>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center gap-6 mt-10">
          <button onClick={prevSlide} className="p-3 border rounded-full cursor-pointer text-white hover:bg-white/10 transition">
            <ChevronLeft />
          </button>

          <button onClick={nextSlide} className="p-3 border rounded-full cursor-pointer text-white hover:bg-white/10 transition">
            <ChevronRight />
          </button>
        </div> */}
      </div>
    </section>
  )
}