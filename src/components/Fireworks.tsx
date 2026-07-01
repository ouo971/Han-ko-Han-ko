"use client";

import React, { useEffect, useRef } from "react";

interface FireworksProps {
  active: boolean;
}

export const Fireworks: React.FC<FireworksProps> = ({ active }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const colors = ["#F4C430", "#E07A5F", "#3F5E4D", "#D4A373", "#FFA07A", "#20B2AA", "#9370DB"];
    const timeouts: NodeJS.Timeout[] = [];

    for (let f = 0; f < 8; f++) {
      const timer = setTimeout(() => {
        const originX = 10 + Math.random() * 80; // random percentage width
        const originY = 20 + Math.random() * 50; // random percentage height

        // Spawn particles
        for (let p = 0; p < 30; p++) {
          const particle = document.createElement("div");
          particle.className = "absolute w-1.5 h-1.5 rounded-full animate-explode pointer-events-none";
          particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          particle.style.left = `${originX}%`;
          particle.style.top = `${originY}%`;

          // Generate random trajectory variables for CSS keyframe explode
          const angle = Math.random() * Math.PI * 2;
          const distance = 50 + Math.random() * 150;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;

          particle.style.setProperty("--tx", `${tx}px`);
          particle.style.setProperty("--ty", `${ty}px`);

          container.appendChild(particle);

          // Remove particle after animation ends
          const removeTimer = setTimeout(() => {
            if (container.contains(particle)) {
              particle.remove();
            }
          }, 1200);
          timeouts.push(removeTimer);
        }
      }, f * 300);

      timeouts.push(timer);
    }

    return () => {
      timeouts.forEach(clearTimeout);
      if (container) container.innerHTML = "";
    };
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-25"
    />
  );
};
export default Fireworks;
