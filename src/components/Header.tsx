"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "./logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      style={{ backgroundColor: "#FFF2EB", borderColor: "#E89CA7" }}
      className="fixed top-0 left-0 w-full z-50  "
    >
      <div className="flex items-center justify-between px-4 py-3 xl:px-6 xl:py-4">
        {/* Logo (Desktop Left) */}
        <div className="hidden xl:flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Vilantra Boutique Logo"
              width={120}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Mobile View (<= 1055px): Centered logo + Hamburger + Icons */}
        <div className="flex xl:hidden w-full justify-center relative">
          {/* Hamburger Icon */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 ml-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center justify-center">
            <Image
              src={logo}
              alt="Vilantra Boutique Logo"
              width={110}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Icons (right side) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-2 flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <ShoppingBag className="w-5 h-5" />
            <User className="w-5 h-5" />
          </div>
        </div>

        {/* Nav (Desktop ≥1056px) */}
        <nav
          style={{ color: "#8B1E3F" }}
          className="
            hidden xl:flex
            justify-center
            font-medium
            text-[11px] xl:text-[15px] 2xl:text-[15px]
            space-x-2 xl:space-x-8 2xl:space-x-8
            px-2
          "
        >
          <Link href="/" className="hover:text-[#E89CA7] transition">Home</Link>
          <Link href="/shop" className="hover:text-[#E89CA7] transition">Shop All</Link>
          <Link href="/designer-sarees" className="hover:text-[#E89CA7] transition">Designer Sarees</Link>
          <Link href="/designer-blouses" className="hover:text-[#E89CA7] transition">Designer Blouses</Link>
          <Link href="/custom-outfits" className="hover:text-[#E89CA7] transition">Custom Outfits</Link>
          <Link href="/budget-friendly-sarees" className="hover:text-[#E89CA7] transition">Budget-Friendly Sarees</Link>
          <Link href="/contact" className="hover:text-[#E89CA7] transition">Contact</Link>
        </nav>

        {/* Icons (Desktop Right) */}
        <div className="hidden xl:flex items-center space-x-4">
          <button aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button aria-label="Shopping Bag">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button aria-label="Profile">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <nav
          style={{ color: "#8B1E3F" }}
          className="xl:hidden mx-auto w-[90%] flex flex-col space-y-4 px-4 pb-4 font-medium bg-[#FFF2EB] rounded-b-md shadow"
        >
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setIsOpen(false)}>Shop All</Link>
          <Link href="/designer-sarees" onClick={() => setIsOpen(false)}>Designer Sarees</Link>
          <Link href="/designer-blouses" onClick={() => setIsOpen(false)}>Designer Blouses</Link>
          <Link href="/custom-outfits" onClick={() => setIsOpen(false)}>Custom Outfits</Link>
          <Link href="/budget-friendly-sarees" onClick={() => setIsOpen(false)}>Budget-Friendly Sarees</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </nav>
      )}
    </header>
  );
}
