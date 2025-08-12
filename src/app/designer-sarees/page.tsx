// src/app/designer-sarees/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DesignerSareesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:8000/products?category=designer-sarees");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const getFocusClass = (focus: string) => {
    switch (focus) {
      case "top": return "object-top";
      case "bottom": return "object-bottom";
      case "left": return "object-left";
      case "right": return "object-right";
      default: return "object-center";
    }
  };

  if (loading) {
    return <div className="p-8 pt-20 text-lg">Loading designer sarees...</div>;
  }

  return (
    <main className="p-8 pt-20">
      {products.length === 0 ? (
        <p>No designer sarees found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const allImages = product.variants?.flatMap((v: any) => v.images || []) || [];
            const [mainImage, alternateImage] = allImages;

            return (
              <div key={product._id} className="group w-full max-w-xs mx-auto">
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
                        <span className="text-gray-500 line-through text-sm">
                          ₹{product.original_price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
