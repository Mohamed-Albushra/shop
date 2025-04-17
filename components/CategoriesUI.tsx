import { CategoriesUIProps } from "@/lib/interfaces";
import localFont from "next/font/local";
import Link from "next/link";
import React from "react";

const manolo = localFont({ src: "../assets/manolo-mono.ttf" });
export default function CategoriesUI(props: CategoriesUIProps) {
  return (
    <div className="container mx-auto p-4">
      <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-[150px] gap-5">
        {props.categories.map((category, index) => {
          return (
            <li
              key={index}
              className={`col-span-1 row-span-2 overflow-hidden rounded-lg shadow-md`}
            >
              <Link
                href={`/products/category/${category}`}
                className="flex flex-col items-center justify-center bg-cover bg-center h-full w-full transition-transform hover:scale-120 mask-x-from-70% mask-x-to-90% mask-y-from-70% mask-y-to-90%"
                style={{
                  backgroundImage: `url(/images/${category}.jpg)`,
                }}
              >
                <h2
                  className={`${manolo.className} text-2xl text-white bg-black/50 px-4 py-2 rounded`}
                >
                  {category}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
