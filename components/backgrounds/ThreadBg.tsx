"use client";

import Threads from "../Threads";

export default function ThreadBg() {
  return (
    <div className="absolute bottom-30 w-full h-full z-0">
      <div className="w-full h-full">
        <Threads
          color={[0.7, 0.7, 0.7]}
          amplitude={1.3}
          distance={0.4}
          enableMouseInteraction
        />
      </div>
    </div>
  );
}