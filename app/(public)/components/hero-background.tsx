"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "cn";

type HeroImage = {
  src: string;
  alt: string;
};

// Background hero otomatis berganti. Tanpa kontrol terlihat; pause saat hover
// dan hormati prefers-reduced-motion.
export function HeroBackground({
  images,
  interval = 3000,
}: {
  images: HeroImage[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % images.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [images.length, interval, paused]);

  return (
    <div
      className="absolute inset-0"
      aria-hidden
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          quality={82}
          className={cn(
            "object-cover transition-opacity duration-1000 ease-out",
            index === active ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
    </div>
  );
}

export type { HeroImage };
