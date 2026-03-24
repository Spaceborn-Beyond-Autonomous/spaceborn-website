"use client"

import { ArrowRight, Cpu, Navigation, Network, ScanSearch } from "lucide-react";
import { Button } from "../ui/button";

export default function About() {
    return (
        <div className="px-10 py-10 pb-20 bg-[#0a0a0a]">
            <div className="w-full flex items-center justify-center">
                <span className="inline-block w-fit px-4 py-1.5 rounded-full border border-white/30 bg-white/5 text-white/80 text-xs tracking-[0.3em] uppercase">
                    About us
                </span>
            </div>
            <p className="mt-5 mb-12 text-center font-bold text-[2rem] md:text-[2.5rem] uppercase">What we offer</p>
            <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
                <div className="w-full md:w-[23%] border rounded-xl p-5 cartoon-border2 transition-all duration-200 cursor-pointer group hover:scale-[0.97] hover:bg-white/5">
                    <div className="h-14 w-14 bg-white/10 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-[1.2]">
                        <Navigation className="h-7 w-7" />
                    </div>
                    <p className="my-3 text-[1.2rem] font-semibold">Autonomous Navigation</p>
                    <p className="my-3 text-white/50 text-[0.9rem]">Advanced AI-powered flight systems that enable drones to navigate complex environments with precision and adaptability in real-time.</p>
                </div>
                <div className="w-full md:w-[23%] border rounded-xl p-5 cartoon-border2 transition-all duration-200 cursor-pointer group hover:scale-[0.97] hover:bg-white/5">
                    <div className="h-14 w-14 bg-white/10 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-[1.2]">
                        <ScanSearch className="h-7 w-7" />
                    </div>
                    <p className="my-3 text-[1.2rem] font-semibold">Object Detection</p>
                    <p className="my-3 text-white/50 text-[0.9rem]">Real-time computer vision capabilities powered by YOLO and custom-trained models for intelligent target identification and tracking.</p>
                </div>
                <div className="w-full md:w-[23%] border rounded-xl p-5 cartoon-border2 transition-all duration-200 cursor-pointer group hover:scale-[0.97] hover:bg-white/5">
                    <div className="h-14 w-14 bg-white/10 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-[1.2]">
                        <Network className="tex w-7" />
                    </div>
                    <p className="my-3 text-[1.2rem] font-semibold">Swarm Intelligence</p>
                    <p className="my-3 text-white/50 text-[0.9rem]">Multi-drone coordination systems that leverage distributed AI to accomplish complex missions with seamless collaboration.</p>
                </div>
                <div className="w-full md:w-[23%] border rounded-xl p-5 cartoon-border2 transition-all duration-200 cursor-pointer group hover:scale-[0.97] hover:bg-white/5">
                    <div className="h-14 w-14 bg-white/10 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-[1.2]">
                        <Cpu className="text-bl" />
                    </div>
                    <p className="my-3 text-[1.2rem] font-semibold">Edge Computing</p>
                    <p className="my-3 text-white/50 text-[0.9rem]">Onboard AI processing that delivers millisecond response times, enabling critical decision-making without cloud dependency.</p>
                </div>
            </div>
            <div className="mt-10 w-full flex items-center justify-center">
                <Button className="bg-white h-10 w-52 text-[1rem] hover:bg-white/80 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 group text-black">
                View our products
                <ArrowRight className="h-5 transition-all duration-200 group-hover:translate-x-1"/>
            </Button>
            </div>
        </div>
    );
}