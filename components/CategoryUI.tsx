"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import localFont from "next/font/local";
import { Product } from "@/lib/interfaces";
import { House, PanelRightOpen } from "lucide-react";
import { PanelLeftOpen } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DualRangeSlider } from "@/components/ui/DualRangeSlider";
import { useMemo } from "react";

interface CategoryUIProps {
  category: string;
  products: Product[];
}

const manolo = localFont({ src: "../assets/manolo-mono.ttf" });

function CategoryUI(props: CategoryUIProps) {
  const { category, products } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [sortingBy, setSortingBy] = useState<string>("rating");

  const priceRange = useMemo(() => {
    const prices = products.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return { min, max };
  }, [products]);

  const [values, setValues] = useState<number[]>([0, 1000]);

  useEffect(() => {
    if (priceRange.min && priceRange.max) {
      setValues([priceRange.min, priceRange.max]);
    }
  }, [priceRange]);

  const handleSortingChange = (value: string) => {
    setSortingBy(value);
  };
  const sortingProducts = useCallback(
    (a: Product, b: Product) => {
      if (sortingBy === "priceAsc") {
        return a.price - b.price;
      } else if (sortingBy === "priceDesc") {
        return b.price - a.price;
      } else if (sortingBy === "discount") {
        return b.discountPercentage - a.discountPercentage;
      } else if (sortingBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    },
    [sortingBy]
  );

  useEffect(() => {
    const sortedProducts = [...products].sort(sortingProducts);
    setLocalProducts(sortedProducts);
  }, [sortingBy, sortingProducts, products]);

  const handlePriceRange = async (values: number[]) => {
    const filteredProducts = products.filter(
      (product: Product) =>
        product.price >= values[0] && product.price <= values[1]
    );
    console.table(filteredProducts);
    setLocalProducts(filteredProducts);
    setValues(values);
  };

  const handleInputChange = (index: number, value: number) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    handlePriceRange(newValues);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        style={{ backgroundImage: `url(/${category}.jpg)` }}
        className="fixed mask-x-from-70% mask-x-to-95% mask-y-from-70% mask-y-to-95% flex flex-col items-center justify-center h-screen bg-cover bg-center  top-0 left-0 w-full z-[-10]"
      ></div>
      <div className="relative z-10">
        <div className="fixed top-15 left-0 z-40">
          <div
            className={`flex flex-col h-screen  bg-white/70 text-black transition-all duration-300 ease-in-out ${
              isOpen ? "w-64" : "w-16"
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-700">
              {isOpen && (
                <Link href="/">
                  <div className="flex items-center space-x-2 pl-11.75">
                    <House color="black" />
                    <span className="text-lg font-semibold">Home</span>
                  </div>
                </Link>
              )}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                {isOpen ? (
                  <PanelRightOpen color="black" />
                ) : (
                  <PanelLeftOpen color="black" />
                )}
              </button>
            </div>

            {/* Sidebar Content */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <div
                    className={`flex items-center p-2 rounded-md hover:bg-gray-200 transition-colors duration-200 ${
                      isOpen ? "space-x-3" : "justify-center"
                    }`}
                  >
                    <ArrowUpDown size={20} />
                    {isOpen && (
                      <div>
                        <h4 className=" mb-3 pl-10">Sorting By</h4>
                        <Select
                          value={sortingBy}
                          onValueChange={handleSortingChange}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Options" />
                          </SelectTrigger>
                          <SelectContent className="z-50">
                            <SelectItem value="priceAsc">
                              Price Low to High
                            </SelectItem>
                            <SelectItem value="priceDesc">
                              Price High to Low
                            </SelectItem>
                            <SelectItem value="discount">Discount</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </li>
                <li className="mt-10">
                  <div
                    className={`items-center p-2 rounded-md hover:bg-gray-200 transition-colors duration-200 ${
                      isOpen ? "space-x-3" : "justify-center"
                    }`}
                  >
                    <DollarSign size={20} />
                    {isOpen && (
                      <div>
                        <h4 className="mb-6 pl-12">Price Range</h4>
                        <DualRangeSlider
                          label={(value) => value}
                          value={values}
                          onValueChange={handlePriceRange}
                          min={priceRange.min}
                          max={priceRange.max}
                          step={1}
                        />
                      </div>
                    )}
                    {isOpen && (
                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2 items-center mt-5">
                          <input
                            type="number"
                            min={priceRange.min}
                            max={priceRange.max}
                            value={values[0]}
                            onChange={(e) =>
                              handleInputChange(0, Number(e.target.value))
                            }
                            className="w-24 px-2 py-1 border rounded-md"
                          />
                          <span>-</span>
                          <input
                            type="number"
                            min={priceRange.min}
                            max={priceRange.max}
                            value={values[1]}
                            onChange={(e) =>
                              handleInputChange(1, Number(e.target.value))
                            }
                            className="w-24 px-2 py-1 border rounded-md"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="relative flex-1 p-6">
          <h1
            className={`${manolo.className} flex justify-center items-center text-3xl text-black  backdrop-opacity-10 px-4  rounded`}
          >
            {category}
          </h1>

          <ul className="flex-1 grid grid-flow-row auto-rows-max md:auto-rows-min lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center gap-5 lg:max-w-5xl md:max-w-3xl mx-auto mt-5">
            {localProducts.map((product, index) => (
              <li key={index} className="overflow-hidden rounded-lg shadow-md">
                <Link href={`/products/${product.id}`}>
                  <ProductCard key={product.id} product={product} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CategoryUI;
