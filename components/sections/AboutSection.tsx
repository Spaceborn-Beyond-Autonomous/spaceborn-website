"use client";

import { useEffect, useRef } from "react";
import { useScroll, cancelFrame, frame } from "motion/react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";

import ParallaxCardEffect from "@/components/effects/ParallaxCardEffect";
import { cn } from "@/lib/utils";

const cardItems = [
  {
    title: "Autonomous Navigation",
    description:
      "Advanced AI-powered flight systems that enable drones to navigate complex environments with precision and adaptability in real-time.",
    src: "https://plus.unsplash.com/premium_vector-1744029045529-3fcd4f715be6?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "bg-[#0a0a0a]"
  },
  {
    title: "Object Detection",
    description:
      "Real-time computer vision capabilities powered by YOLO and custom-trained models for intelligent target identification and tracking.",
    src: "https://plus.unsplash.com/premium_vector-1697729849330-ef5db47d3246?q=80&w=2814&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "bg-[#0d0d0d]"
  },
  {
    title: "Swarm Intelligence",
    description:
      "Multi-drone coordination systems that leverage distributed AI to accomplish complex missions with seamless collaboration.",
    src: "https://plus.unsplash.com/premium_vector-1697729780111-058eea198643?q=80&w=2648&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "bg-[#0b0b0b]"
  },
  {
    title: "Edge Computing",
    description:
      "Onboard AI processing that delivers millisecond response times, enabling critical decision-making without cloud dependency.",
    src: "https://plus.unsplash.com/premium_vector-1721220820381-71da4f8b1adf?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "bg-[#0c0c0c]"
  },
  {
    title: "Adaptive Learning",
    description:
      "Machine learning systems that continuously improve flight patterns and operational efficiency through real-world mission data.",
    src: "https://plus.unsplash.com/premium_vector-1725703994559-09c72f2a317d?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "bg-[#090909]"
  }
];


export type CardItemType = (typeof cardItems)[number];

export default function Page() {
  const lenisRef = useRef<LenisRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  const ParallaxCardItem = ({ item, id }: { item: CardItemType; id: number }) => {
    const targetScale = 1 - (cardItems.length - id) * 0.05;

    return (
      <ParallaxCardEffect
        id={id}
        progress={scrollYProgress}
        range={[id * 0.25, 1]}
        targetScale={targetScale}
        className={cn("relative flex flex-col rounded-lg px-14 py-8", item.className)}>
        <div className="space-y-4 text-center">
          <h2 className="text-center text-2xl font-semibold">{item.title}</h2>
          <p>{item.description}</p>
        </div>
      </ParallaxCardEffect>
    );
  };

  return (
    <section id="about">
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <div ref={containerRef}>
        <div className="mx-auto max-w-2xl pt-14">
          {cardItems.map((cardItem, i) => (
            <ParallaxCardItem item={cardItem} key={i} id={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
