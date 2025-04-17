"use client";
import React, { useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import NavbarSearch from "@/components/NavbarSearch";
import { useCart } from "./cartProvider";
import { Suspense } from "react";
export default function Navbar() {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-2">
      <div className="hidden lg:flex items-center justify-between">
        <div>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-black hover:text-neutral-600">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-black hover:text-neutral-600"
              >
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-black hover:text-neutral-600">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
        <Suspense fallback={<div>Loading search...</div>}>
        <NavbarSearch />
      </Suspense>
        </div>
        <div>
          <Link href="/cart" className="relative flex items-center">
            <span className="absolute -top-5 -right-1 bg-neutral-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-90">
              {cartCount}
            </span>
            <ShoppingCart size={24} />
          </Link>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex items-center justify-between relative">
          <div>
            <button
              className="p-2 rounded-full hover:bg-neutral-200 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>

          <div>
          <Suspense fallback={<div>Loading search...</div>}>
        <NavbarSearch />
      </Suspense>
          </div>
          <div>
            <Link href="/cart" className="relative flex items-center">
              <span className="absolute -top-2 -right-2 bg-neutral-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {cartCount}
              </span>
              <ShoppingCart size={24} />
            </Link>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col mt-2 space-y-2 text-black">
            <li>
              <Link href="/" className="block px-4 py-2 hover:bg-neutral-100">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block px-4 py-2 hover:bg-neutral-100"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block px-4 py-2 hover:bg-neutral-100"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
