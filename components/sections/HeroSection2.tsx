"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { StarsBackground } from "../backgrounds/Stars";
import { Button } from "../ui/button";

export default function RocketHero() {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Rocket split animation
    const tipY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
    const bodyY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

    // Text reveal
    const textOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.1, 0.7], [50, -100]);

    return (
        <section ref={ref} className="h-[200vh] bg-black relative">

            <div className="absolute inset-0 z-0">
                <StarsBackground />
            </div>

            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                {/* ROCKET */}
                <div className="relative flex flex-col items-center">

                    {/* TIP */}
                    <motion.div
                        style={{ y: tipY }}
                        className="
    w-0 h-0 
    border-l-[108px] border-r-[108px] border-b-[150px]
    border-l-transparent border-r-transparent border-b-white mt-30
  "
                    />

                    {/* BODY */}
                    <motion.div
                        style={{ y: bodyY }}
                        className="
    w-54 h-100 
    bg-gradient-to-b from-gray-200 to-gray-600 
    rounded-b-[50px] relative
  "
                    >
                        {/* window */}
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-black border-2 border-white" />

                        {/* fins */}
                    </motion.div>

                </div>

                {/* TEXT */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute text-center"
                >
                    <div className="w-full md:w-fit flex flex-col items-center justify-center py-25 md:py-0">
                    <span className="inline-block w-fit px-4 py-1.5 rounded-full border border-white/30 bg-white/5 text-white/80 text-xs tracking-[0.3em] uppercase">
                        Next Generation Security
                    </span>
                    <h1 className="text-center">
                        <p className="font-extrabold text-[2rem] md:text-[5rem] tracking-widest">
                            SPACEBORN
                        </p>

                        <div className="flex items-center justify-center gap-4 -mt-3 mb-6">
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
                </div>
                </motion.div>

            </div>
        </section>
    );
}