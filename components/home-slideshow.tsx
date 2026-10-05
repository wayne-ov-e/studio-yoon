"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Photos from the "Home Photo" frames in Figma, cropped to each frame's framing.
import photo01 from "@/public/images/home/home-photo-01.jpg";
import photo02 from "@/public/images/home/home-photo-02.jpg";
import photo03 from "@/public/images/home/home-photo-03.jpg";
import photo04 from "@/public/images/home/home-photo-04.jpg";
import photo05 from "@/public/images/home/home-photo-05.jpg";

const photos = [photo01, photo02, photo03, photo04, photo05];
const INTERVAL_MS = 3000;

// Stacked full-cover images that cross-fade to the next one every 3 seconds.
export function HomeSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % photos.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {photos.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority={i === 0}
          placeholder="blur"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            opacity: i === active ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        />
      ))}
    </>
  );
}
