"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  discount_price: number;
  original_price: number;
  variants: {
    color: string;
    images: {
      url: string;
      focus?: "top" | "center" | "bottom";
    }[];
  }[];
}

export default function DesignerSareesCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  console.log("hell",products)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/designer-sarees`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching designer sarees:", error);
      }
    };
    fetchData();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollAmount = container.offsetWidth * 0.9;
    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const getFocusClass = (focus?: string) => {
    switch (focus) {
      case "top":
        return "object-top";
      case "bottom":
        return "object-bottom";
      default:
        return "object-center";
    }
  };
  
  return (
    <div className="relative w-full max-w-[90vw] mx-auto mt-10">
      {/* <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-4">Designer Sarees</h2> */}

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-[#f5d6db] hidden md:block"
        aria-label="Scroll Left"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-[#f5d6db] hidden md:block"
        aria-label="Scroll Right"
      >
        <ChevronRight />
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-8 scroll-smooth no-scrollbar pb-2"
      >
        {products.map((product) => {
          const allImages = product.variants?.flatMap((v) => v.images || []) || [];
          const [mainImage, alternateImage] = allImages;

          return (
            <Link
              href={`/product/${product._id}`}
              key={product._id}
              className="group w-[280px] flex-shrink-0"
            >
              <div className="relative aspect-[4/5] w-full bg-gray-100 overflow-hidden ">
                {mainImage?.url && (
                  <Image
                    src={mainImage.url}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover duration-300 group-hover:opacity-0 ${getFocusClass(mainImage.focus)}`}
                  />
                )}
                {alternateImage?.url && (
                  <Image
                    src={alternateImage.url}
                    alt={`${product.title} alternate`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`absolute top-0 left-0 object-cover opacity-0 duration-300 group-hover:opacity-100 ${getFocusClass(alternateImage.focus)}`}
                  />
                )}
              </div>
              <div className="p-2">
                <h3 className="text-lg font-semibold text-[#8B1E3F]">{product.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#8B1E3F] font-semibold">₹{product.discount_price}</span>
                  {product.original_price > product.discount_price && (
                    <span className="text-gray-900 line-through text-sm">
                      ₹{product.original_price}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
