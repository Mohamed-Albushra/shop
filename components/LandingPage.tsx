import React from "react";
import localFont from "next/font/local";
import Link from "next/link";
import Brandsbar from "@/components/Brandsbar";
import Trending from "./Trending";
import BackgroundVideo from "@/components/BackgroundVideo";
import Testimonials from "./Testimonials";

// const brogsway = localFont({ src: '../assets/Brogsway Demo.otf' })
const Britney = localFont({ src: "../assets/Britney-Ultra.woff2" });
// const mauline = localFont({ src: '../assets/Mauline.otf' })
const manolo = localFont({ src: "../assets/manolo-mono.ttf" });

export default function LandingPage() {
  return (
    <main className="bg-orange-200 relative overflow-hidden pb-10 pt-[50px] md:pb-[120px] md:pt-[150px] xl:pb-[82px] xl:pt-[100px] 2xl:pb-[170px] 2xl:pt-[190px]">
      <BackgroundVideo />
      <div>
        <div className="-mx-4 flex flex-wrap relative z-10">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center px-3 md:px-0">
              <div className={Britney.className}>
                <h1 className="text-bordered mb-5 text-6xl font-bold leading-tight text-white dark:text-black sm:text-7xl sm:leading-tight md:text-9xl md:leading-tight">
                  ShopSmart</h1> <br />
                  <h2 className={manolo.className + " text-3xl font-bold leading-tight text-white dark:text-black sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight"}>
                    
                  Where Smart Meets Style
                  </h2>
                
              </div>
              <p className="mb-10 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl  text-white dark:text-black">
              Shop top-quality products, score great prices, and enjoy a smooth online experience — all in one place.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  href={"/products"}
                  className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                >
                  Shop Now
                </Link>
              </div>
              <div className="flex justify-center mt-7">
                <div
                  dir="rtl"
                  className="flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 border-s-1 border-slate-300 mr-3 px-3"
                >
                  <h1 className="text-3xl">200+</h1>
                  <h3>International Brands</h3>
                </div>
                <div
                  dir="rtl"
                  className="flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 border-s-1 border-slate-300 mr-3 px-3"
                >
                  <h1 className="text-3xl">2,000+</h1>
                  <h3>High-Quality Products</h3>
                </div>
                <div
                  dir="rtl"
                  className="flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0  mr-3 px-3"
                >
                  <h1 className="text-3xl">30,000+</h1>
                  <h3>Happy Customers</h3>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-primary text-gray-100 shadow-sm p-4 mt-20">
              <Brandsbar />
            </div>
            <div>
              <Trending />
            </div>
            <div className="bg-zinc-200 py-25">
              <Testimonials />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
