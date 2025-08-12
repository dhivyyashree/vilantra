"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  discount_price: number;
  original_price: number;
  description: string;
  variants: {
    color: string;
    images: { url: string; focus?: string }[];
  }[];
}

interface Review {
  _id: string;
  user: string;
  rating: number;
  comment: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mainScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`);
        if (!res.ok) {
          console.error("Failed to fetch product", res.status);
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchReviews = async () => {
      const res = await fetch(`/api/reviews/${id}`);
      const data = await res.json();
      setReviews(data);
    };

    if (id) {
      fetchProduct();
      fetchReviews();
    }
  }, [id]);

  // Track active image while scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!mainScrollRef.current) return;
      let closestIndex = 0;
      let minDistance = Infinity;

      imageRefs.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.left - window.innerWidth / 2);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });
      setActiveImageIndex(closestIndex);
    };

    const scrollContainer = mainScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (!product) return <div className="pt-24 text-center">Loading...</div>;

  const allImages = product?.variants?.flatMap((variant) => variant.images || []) || [];

  return (
    <div className="max-w-6xl mx-auto pt-15 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div className="flex gap-7">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px]">
            {allImages.map((imageObj, i) => {
              const focusPosition = imageObj?.focus || "center";
              return (
                <div
                  key={i}
                  className={`relative w-[90px] h-[100px] cursor-pointer overflow-hidden border-2 rounded
                    ${activeImageIndex === i ? "border-pink-600" : "border-transparent"}
                    hover:border-pink-400`}
                  onMouseEnter={() => {
                    setActiveImageIndex(i);
                    imageRefs.current[i]?.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                  }}
                >
                  <Image
                    src={imageObj.url}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    style={{ objectPosition: focusPosition }}
                  />
                </div>
              );
            })}
          </div>

          {/* Main Image + Dots */}
          <div className="flex flex-col w-full">
            <div
              ref={mainScrollRef}
              className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar w-full h-[650px] snap-x snap-mandatory"
            >
              {allImages.map((imageObj, i) => (
                <div
                  key={i}
                  ref={(el) => {imageRefs.current[i] = el}}
                  className="relative flex-shrink-0 w-full h-full snap-center"
                >
                  <Image
                    src={imageObj.url}
                    alt={`Product Image ${i + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    style={{ objectPosition: imageObj.focus || "center" }}
                  />
                </div>
              ))}
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-4 gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    imageRefs.current[i]?.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                    });
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeImageIndex === i ? "bg-pink-600 scale-110" : "bg-gray-300"
                  }`}
                  aria-label={`Scroll to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-[#8B1E3F]">{product.title}</h1>

          <div className="flex gap-2 items-center">
            <p className="text-xl font-bold text-gray-800">₹{product.discount_price}</p>
            <p className="line-through text-gray-400">₹{product.original_price}</p>
            <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded">
              {Math.round(
                ((product.original_price - product.discount_price) /
                  product.original_price) *
                  100
              )}
              % OFF
            </span>
          </div>

          <p
            className="text-gray-600 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></p>

          <div className="mt-2 flex gap-2">
            {product.variants.map((variant, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveVariantIndex(i);
                  setActiveImageIndex(0);
                  if (imageRefs.current[0]) {
                    imageRefs.current[0].scrollIntoView({ behavior: "smooth", inline: "center" });
                  }
                }}
                className={`px-3 py-1 rounded border ${
                  i === activeVariantIndex
                    ? "border-[#8B1E3F] text-[#8B1E3F]"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {variant.color}
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            <button className="bg-[#8B1E3F] text-white px-6 py-2 rounded hover:bg-[#a73253] transition">
              Buy Now
            </button>
            <button className="border border-[#8B1E3F] text-[#8B1E3F] px-6 py-2 rounded hover:bg-[#fdf1f4] transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4 text-[#8B1E3F]">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border p-4 rounded shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{review.user}</span>
                  <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
