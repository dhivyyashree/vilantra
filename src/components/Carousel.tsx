"use client";

import { useState } from "react";
import Image from "next/image";
import image1 from "@/components/img1.png"
import image2 from "@/components/img2.png"
import image3 from "@/components/img3.png"
import image4 from "@/components/img4.png"
const images = [
    image1,image2,image3,image4
//   "/sarees.png",
//   "/designer-blouses.png",
//   "/custom-outfits.png",
//   "/budget-sarees.png",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <Image
        src={images[current]}
        alt={`Slide ${current + 1}`}
        width={1440}
        height={600}
        className="object-cover w-full h-96"
      />

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        aria-label="Previous"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}
