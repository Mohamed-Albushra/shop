import { Product } from "@/lib/interfaces";
import React from "react";
import Image from "next/image";
import { RatingStars } from "./RatingStars";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col bg-white/70 backdrop-invert backdrop-opacity-10 gap-3 rounded-lg shadow-lg  transition-transform hover:scale-105 p-5">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={200}
        height={200}
        className="mx-auto"
      />
      <div className="px-10 md:px-0 lg:px-0">
        <h2>{product.price} SEK</h2>
      <h2>Discount: {product.discountPercentage}%</h2>
      <h2>{product.title}</h2>
      <div className="flex items-center space-x-2">
        <RatingStars rating={product.rating} />
        <span className="text-sm text-gray-600">
          {product.rating.toFixed(1)}
        </span>
      </div>
      </div>
    </div>
  );
}
