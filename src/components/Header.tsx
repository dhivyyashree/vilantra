"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react"; // Lucide icons
import AnimatedVilantraLogo from "./AnimatedVilantraLogo";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm flex items-center justify-between px-6 py-4 border-b">
      {/* Logo with animated SVG */}
      <Link href="/" className="flex items-center space-x-2">
        <AnimatedVilantraLogo />
      </Link>
      <nav className="hidden md:flex space-x-8 font-medium text-brandpink ">
        <Link href="/" className="hover:text-pink-600 transition">Home</Link>
        <Link href="/shop" className="hover:text-pink-600 transition">Shop All</Link>
        <Link href="/designer-sarees" className="hover:text-pink-600 transition">Designer Sarees</Link>
        <Link href="/custom-outfits" className="hover:text-pink-600 transition">Designer Blouses</Link>
        <Link href="/designer-blouses" className="hover:text-pink-600 transition">Custom Outfits</Link>
        <Link href="/about" className="hover:text-pink-600 transition">Budget-FriendlySarees</Link>
        <Link href="/contact" className="hover:text-pink-600 transition">Contact</Link>
      </nav>
      {/* Right icons */}
      <div className="flex items-center space-x-6">
        <button aria-label="Search">
          <Search className="w-6 h-6" />
        </button>
        <button aria-label="Shopping Bag">
          <ShoppingBag className="w-6 h-6" />
        </button>
        <button aria-label="Profile">
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
