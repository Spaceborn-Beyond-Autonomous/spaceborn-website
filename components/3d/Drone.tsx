"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export default function Drone() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Spline
        scene="https://prod.spline.design/c6qV8iW1PHRvSMpk/scene.splinecode" 
      />
    </div>
  );
}