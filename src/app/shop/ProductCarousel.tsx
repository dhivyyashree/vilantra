"use client";

import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const allImages = product.variants?.flatMap((v: any) => v.images || []) || [];

  const getFocusClass = (focus: string) => {
    switch (focus) {
      case "top":
        return "object-top";
      case "bottom":
        return "object-bottom";
      default:
        return "object-center";
    }
  };

  const [mainImage, alternateImage] = allImages;

  return (
    <div className="group w-full max-w-xs mx-auto mt-10">
      <Link href={`/product/${product._id}`} className="block overflow-hidden">
        <div className="relative aspect-[4/5] w-full bg-gray-100">
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
        <div className="p-3">
          <h3 className="text-base font-semibold text-gray-800">{product.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#8B1E3F] font-semibold">₹{product.discount_price}</span>
            {product.original_price > product.discount_price && (
              <span className="text-gray-500 line-through text-sm">₹{product.original_price}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
