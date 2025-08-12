"use client"
import { useState } from "react";
import Carousel from "@/components/Carousel";
import DesignerSarees from "./designier-sareescarousel/DesignerSarees";
import CustomOutfits from "./outfitfromscratch/ CustomOutfits";
import Link from "next/link";
export default function Home() {
  const [activeTab, setActiveTab] = useState("designer");

return (
    <div className="min-h-screen  ">
      <main>
        <Carousel />

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex  justify-center">
            <button
              className={`px-4 py-2 rounded-t-md font-medium ${
                activeTab === "designer"
                  ? "bg-white text-[#8B1E3F]"
                  : "text-[#8B1E3F]"
              }`}
              onClick={() => setActiveTab("designer")}
            >
              Designer Sarees
            </button>
            <button
              className={`px-4 py-2 rounded-t-md font-medium ${
                activeTab === "custom"
                  ? "bg-white text-[#8B1E3F]"
                  : "text-[#8B1E3F]"
              }`}
              onClick={() => setActiveTab("custom")}
            >
              Custom Outfits from Scratch
            </button>
          </div>

          <div className=" p-6  ">
            {activeTab === "designer" ? <DesignerSarees /> : <CustomOutfits />}
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-10">
          <Link href="/shop">
            <button className="bg-white text-[#8B1E3F] hover:bg-[#8B1E3F] hover:text-white font-semibold px-8 py-3 border border-[#8B1E3F] transition">
              View All Products
            </button>
          </Link>
        </div>

      </main>
    </div>
  );
}

