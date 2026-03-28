"use client";

import { Button } from "@/components/ui/button";
import ThreadBg from "../backgrounds/ThreadBg";
import Drone from "../3d/Drone";
import { StarsBackground } from "../backgrounds/Stars";

export default function HeroSection3() {
    return (
        <section className="relative w-full overflow-hidden md:h-[90vh]">
            <ThreadBg />
            <div className="absolute inset-0 z-0">
                <StarsBackground />
            </div>
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-50 pointer-events-none" />
            <div className="relative h-full z-20 md:px-20 flex flex-col-reverse md:flex-row justify-between">
                <div className="w-full md:w-fit flex flex-col items-center md:items-start justify-center py-25 md:py-0">
                    <span className="inline-block w-fit px-4 py-1.5 rounded-full border border-white/30 bg-white/5 text-white/80 text-xs tracking-[0.3em] uppercase">
                        Next Generation Security
                    </span>
                    <h1 className="text-center md:text-left">
                        <p className="font-extrabold text-[2rem] md:text-[5rem] tracking-widest">
                            SPACEBORN
                        </p>

                        <div className="flex items-center gap-4 -mt-3 mb-6">
                            <div className="flex items-center justify-center gap-4 my-4">
                                <div className="h-0.5 w-24 bg-linear-to-r from-transparent via-white/50 to-transparent" />
                                <span
                                    className="text-sm text-white/50 tracking-[0.15em] sm:tracking-[0.25em] lg:tracking-[0.3em] uppercase font-light">
                                    Beyond autonomous
                                </span>
                                <div className="h-0.5 w-24 bg-linear-to-r from-transparent via-white/50 to-transparent" />
                            </div>
                        </div>
                    </h1>

                    <p className="text-white/60 text-center md:text-left mb-10 max-w-lg">
                        Autonomous drones built to adapt and operate intelligently in real-world environments
                    </p>

                    <div className="flex gap-4">
                        <Button className="bg-white text-black rounded-full cursor-pointer hover:bg-white/70 px-6 h-10 transition-all duration-200">
                            Explore Systems
                        </Button>
                        <Button variant="outline" className="border-white text-white rounded-full cursor-pointer hover:bg-white/10 px-6 h-10 transition-all duration-200">
                            Watch Demo
                        </Button>
                    </div>
                </div>
                <div className="hidden md:flex md:w-1/2 items-center justify-center">
                    <Drone />
                </div>

            </div>
        </section>
    );
}