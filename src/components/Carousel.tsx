"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import image1 from "@/components/fashion5.jpg";
import image2 from "@/components/fashion2.jpg";
import image3 from "@/components/fashion3.jpg";
import image4 from "@/components/fashion4.jpg";

const images = [image1, image2, image3, image4];
const links = [
  "/shop",
  "/custom-outfits",
  "/designer-sarees",
  "/budget-friendly-sarees",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="relative w-screen h-[300px] md:h-[600px] overflow-hidden">
      <Link href={links[current]} aria-label={`Go to ${links[current]}`}>
        <Image
          src={images[current]}
          alt={`Slide ${current + 1}`}
          fill
          className="object-cover cursor-pointer"
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
        />
      </Link>

      {/* Dots: mobile bottom-center, desktop bottom-left */}
      <div className="absolute bottom-4 left-1/2 md:left-5 transform -translate-x-1/2 md:translate-x-0 flex space-x-2 md:space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
              idx === current ? "bg-brandpink scale-125" : "bg-white/50"
            }`}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
