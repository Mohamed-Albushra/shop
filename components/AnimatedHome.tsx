import React from 'react'
// import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import localFont from 'next/font/local';
import { Suspense } from 'react'
const manolo = localFont({ src: '../assets/manolo-mono.ttf' })
function AnimatedHome() {
  return (
    <Suspense>
    {/* <BackgroundGradientAnimation> */}
      <div className="mt-20 absolute z-50 inset-0 flex items-center justify-center text-black font-bold  pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl bg-gradient-to-t from-90% to-white/80">
      <div className="max-w-4xl mx-auto pt-40 md:pt-20  px-5">
      <h1 className={`${manolo.className} flex justify-center items-center text-5xl text-black pb-3 backdrop-opacity-10 px-4  rounded`}>About Us</h1>

        <p className="text-lg mb-4">
          Welcome to <strong>SHOPSMART</strong>  your destination for{" "}
          <em>unique, high-quality products</em> designed to enhance your daily life.
        </p>

        <p className="text-lg mb-4">
          We started this store with a simple mission: to provide high-quality
          products that bring value, style, and convenience to your everyday life. 
          Every item in our collection is carefully selected for its design, quality, 
          and functionality, ensuring you get nothing but the best.
        </p>

        <p className="text-lg mb-4">
          At <strong>SHOPSMART</strong>, we believe shopping should be easy, 
          enjoyable, and trustworthy. That’s why we’re committed to:
        </p>

        <ul className="list-disc list-inside mb-4 text-lg space-y-2">
          <li>Fast and reliable shipping</li>
          <li>Exceptional customer service</li>
          <li>Secure and easy checkout</li>
          <li>A smooth, user-friendly online shopping experience</li>
        </ul>

        <p className="text-lg mb-4">
          We’re more than just a store – we’re a community of passionate customers 
          and creators. Whether you&apos;re shopping for yourself or looking for the 
          perfect gift, we&apos;re here to make it special.
        </p>

        <p className="text-lg">
          Thank you for supporting our journey. We’re excited to have you with us!
        </p>
      </div>
      </div>
      {/* </BackgroundGradientAnimation>*/}
    </Suspense>
  )
}

export default AnimatedHome