"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Navigation,
    ScanSearch,
    Network,
    Cpu,
} from "lucide-react";
import { Button } from "../ui/button";
import { StarsBackground } from "../backgrounds/Stars";

const items = [
    {
        title: "Autonomous Navigation",
        desc: "Advanced AI-powered flight systems that enable drones to navigate complex environments with precision and adaptability in real-time.",
        img: "/demo1.jpg",
        icon: Navigation,
    },
    {
        title: "Object Detection",
        desc: "Real-time computer vision powered by YOLO and custom-trained models for intelligent target tracking.",
        img: "/demo2.jpg",
        icon: ScanSearch,
    },
    {
        title: "Swarm Intelligence",
        desc: "Multi-drone coordination using distributed AI to accomplish complex missions collaboratively.",
        img: "/demo3.jpg",
        icon: Network,
    },
    {
        title: "Edge Computing",
        desc: "Onboard AI processing enabling real-time decisions without cloud dependency.",
        img: "/demo4.jpg",
        icon: Cpu,
    },
];

export default function About() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const Icon = items[index].icon;

    return (
        <div className="relative px-10 py-16 pb-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <StarsBackground />
            </div>

            {/* HEADER */}
            <div className="relative z-10 w-full flex flex-col items-center">
                <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/70 text-xs tracking-[0.3em] uppercase backdrop-blur-md">
                    About us
                </span>

                <p className="mt-6 mb-14 text-center font-bold text-[2.2rem] md:text-[2.7rem] uppercase text-white">
                    What we offer
                </p>
            </div>

            {/* CAROUSEL */}
            <div className="relative z-10 w-full max-w-6xl mx-auto">

                <div className="relative h-115 flex items-center justify-center overflow-hidden">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 120 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -120 }}
                            transition={{ duration: 0.6 }}
                            className="absolute w-full flex flex-col md:flex-row gap-8 items-center"
                        >
                            {/* IMAGE */}
                            <div className="w-full md:w-[60%] h-80 md:h-105 overflow-hidden rounded-2xl relative group">
                                <img
                                    src={items[index].img}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="demo"
                                />

                                {/* subtle overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                            </div>

                            {/* TEXT */}
                            <div className="w-full md:w-[40%] flex flex-col justify-between h-full">

                                {/* TOP */}
                                <div>

                                    {/* ICON + TITLE */}
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="h-12 w-12 bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center rounded-xl shadow-md">
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-semibold text-white">
                                            {items[index].title}
                                        </h2>
                                    </div>

                                    {/* DESCRIPTION */}
                                    <p className="text-white/60 leading-relaxed mb-6">
                                        {items[index].desc}
                                    </p>

                                    {/* 🔥 STATS ROW */}
                                    <div className="flex gap-6 mb-6">
                                        <div>
                                            <p className="text-white text-lg font-bold">99%</p>
                                            <p className="text-white/50 text-xs">Accuracy</p>
                                        </div>
                                        <div>
                                            <p className="text-white text-lg font-bold">AI</p>
                                            <p className="text-white/50 text-xs">Driven</p>
                                        </div>
                                        <div>
                                            <p className="text-white text-lg font-bold">24/7</p>
                                            <p className="text-white/50 text-xs">Operation</p>
                                        </div>
                                    </div>

                                    {/* 🔥 MINI INFO CARDS */}
                                    <div className="space-y-3">
                                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                                            <p className="text-white text-sm font-medium">
                                                Smart Decision Engine
                                            </p>
                                            <p className="text-white/50 text-xs">
                                                Executes autonomous decisions in milliseconds
                                            </p>
                                        </div>

                                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                                            <p className="text-white text-sm font-medium">
                                                Seamless Integration
                                            </p>
                                            <p className="text-white/50 text-xs">
                                                Works across multiple environments and systems
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                {/* CTA */}
                                <div className="mt-8">
                                    <button className="text-sm text-white flex items-center gap-2 group">
                                        Learn more
                                        <ArrowRight className="h-4 transition-all duration-200 group-hover:translate-x-1" />
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    </AnimatePresence>

                </div>

                {/* DOTS */}
                <div className="flex justify-center gap-3 mt-8">
                    {items.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all duration-300 ${i === index
                                ? "bg-white scale-125 shadow-[0_0_10px_white]"
                                : "bg-white/30"
                                }`}
                        />
                    ))}
                </div>

            </div>

            {/* BUTTON */}
            <div className="relative z-10 mt-14 w-full flex items-center justify-center">
                <Button className="bg-white h-11 w-56 text-[1rem] hover:bg-white/80 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group text-black shadow-lg">
                    View our products
                    <ArrowRight className="h-5 transition-all duration-200 group-hover:translate-x-1" />
                </Button>
            </div>
        </div>
    );
}