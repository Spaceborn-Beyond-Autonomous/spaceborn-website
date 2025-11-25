'use client'

import { Button } from '@/components/ui/button'
import { StarsBackground } from '@/components/backgrounds/Stars'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full"
    >
      <StarsBackground className="flex min-h-screen items-center justify-center">
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60 pointer-events-none" />

        {/* Platform glow - monochrome */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/10 via-white/5 to-transparent blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-3 bg-linear-to-r from-transparent via-white/20 to-transparent rounded-full blur-2xl" />
        </div>

        {/* Main content container */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 py-20">
          {/* Creative Split Heading */}
          <div className="text-center mb-8">
            <div className="mb-4">
              {/* Badge */}
              <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white/80 text-xs tracking-[0.3em] uppercase mb-6">
                Next Generation Security
              </span>
            </div>

            {/* Main Title - Monochrome */}
            <h1 className="relative mb-6">
              {/* Top Line - Spaceborn */}
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter bg-linear-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                  SPACE
                </span>
                <span className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter bg-linear-to-l from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
                  BORN
                </span>
              </div>

              {/* Divider Line */}
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="h-0.5 w-24 bg-linear-to-r from-transparent via-white/50 to-transparent" />
                <span className="text-sm text-white/50 tracking-[0.5em] uppercase font-light">
                  Beyond
                </span>
                <div className="h-0.5 w-24 bg-linear-to-r from-transparent via-white/50 to-transparent" />
              </div>

              {/* Bottom Line - Autonomous */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.3em] text-white/70 uppercase">
                Autonomous
              </div>
            </h1>

            <p className="text-white/60 text-sm md:text-base tracking-wide mb-8 max-w-2xl mx-auto leading-relaxed">
              Redefining aerial security with intelligent autonomous systems.
              <br />
              <span className="text-white/40">Precision. Intelligence. Reliability.</span>
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                className="relative overflow-hidden bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 font-semibold tracking-wide group transition-all"
              >
                <span className="relative z-10">Explore Systems</span>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full px-8 py-6 font-semibold tracking-wide backdrop-blur-sm transition-all"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block z-20">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group hover:border-white/50 transition-colors cursor-pointer">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce group-hover:bg-white/70 transition-colors" />
          </div>
        </div>
      </StarsBackground>
    </section>
  )
}
