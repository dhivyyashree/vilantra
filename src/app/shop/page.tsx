"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/api";
import ProductCard from "../shop/ProductCarousel";

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
