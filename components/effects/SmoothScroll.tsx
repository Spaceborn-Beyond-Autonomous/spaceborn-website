"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,            // smoothness (lower = smoother)
        duration: 1.2,         // scroll duration feel
        smoothWheel: true,     // smooth for mouse wheel
        gestureOrientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}