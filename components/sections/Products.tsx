"use client";

import { ArrowRight, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarsBackground } from "../backgrounds/Stars";

export default function ProductsSection() {
  const products = [
    {
      name: "Guardian Pro",
      tagline: "Perimeter Security",
      description:
        "Advanced autonomous drone built for large-scale monitoring and threat detection.",
      img: "/demo1.jpg",
      features: ["Thermal Vision", "Facial Recognition", "Auto Patrol", "Demo"],
    },
    {
      name: "Sentinel Max",
      tagline: "Heavy Security Unit",
      description:
        "Heavy-duty surveillance system with real-time threat detection capabilities.",
      img: "/demo2.jpg",
      features: ["Threat Analysis", "Stealth Mode", "Weather Resistant", "Demo"],
    },
    {
      name: "Stealth Scout",
      tagline: "Covert Surveillance",
      description:
        "Compact reconnaissance drone designed for silent and intelligent monitoring.",
      img: "/demo3.jpg",
      features: ["Night Vision", "Silent Flight", "Swarm AI", "Demo"],
    },
  ];

  return (
    <section className="py-24 relative">
        <div className="absolute inset-0 z-0">
                        <StarsBackground />
                    </div>

      {/* HEADER */}
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold text-white uppercase tracking-widest">
          Our Fleet
        </h2>
        <p className="text-white/60 mt-4 max-w-2xl mx-auto">
          Explore our autonomous systems designed for real-world missions.
        </p>
      </div>

      {/* STACKED CARDS */}
      <div className="flex flex-col gap-16 max-w-6xl mx-auto px-6">

        {products.map((product, i) => (
          <div
            key={product.name}
            className="relative group rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
          >

            {/* IMAGE */}
            <div className="h-105 overflow-hidden">
              <img
                src={product.img}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt=""
              />
            </div>

            {/* CONTENT */}
            <div className="p-8 grid md:grid-cols-[1.2fr_1fr] gap-8">

              {/* LEFT */}
              <div>
                <p className="text-white/40 text-sm uppercase tracking-widest mb-2">
                  {product.tagline}
                </p>

                <h3 className="text-3xl font-bold text-white mb-4">
                  {product.name}
                </h3>

                <p className="text-white/70 leading-relaxed max-w-lg">
                  {product.description}
                </p>

                <Button className="mt-6 bg-white text-black hover:bg-white/80">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col justify-between">

                {/* FEATURE GRID */}
                <div className="grid grid-cols-2 gap-4">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="p-4 rounded-xl bg-white/10 border border-white/20"
                    >
                      <Cpu className="h-5 w-5 text-white mb-2" />
                      <p className="text-white text-sm font-medium">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                {/* DECORATIVE LINE */}
                <div className="mt-8 h-px w-full bg-white/10" />

              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}