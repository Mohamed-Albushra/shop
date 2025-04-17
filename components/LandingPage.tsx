import React from 'react'
import localFont from 'next/font/local'
import Link from 'next/link'
import Brandsbar from '@/components/Brandsbar'


// const brogsway = localFont({ src: '../assets/Brogsway Demo.otf' })
const necosmic = localFont({ src: '../assets/Necosmic-PersonalUse.otf' })
// const mauline = localFont({ src: '../assets/Mauline.otf' })
const manolo = localFont({ src: '../assets/manolo-mono.ttf' })

export default function LandingPage() {
  return (
    <main className='bg-zinc-200 relative z-10 overflow-hidden pb-10 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[82px] xl:pt-[100px] 2xl:pb-[170px] 2xl:pt-[190px]'>
      <div>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center px-3 md:px-0">
              <div className={necosmic.className} >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Welcome to ShopSmart <br /> <span className={manolo.className}> Your Everyday Shopping Companion </span>
                </h1>
              </div>
              <p className="mb-10 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                From top-rated electronics to must-have fashion, home essentials, beauty items, and more – we’ve got everything you need, all in one place.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  href={'/products'}
                  className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                >
                  Shop Now
                </Link>
              </div>
              <div className='flex justify-center mt-7'>
                <div dir="rtl" className="flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 border-s-1 border-slate-300 mr-3 px-3">
                  <h1 className='text-3xl'>200+</h1>
                  <h3>International Brands</h3>
                </div>
                <div dir="rtl" className="flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 border-s-1 border-slate-300 mr-3 px-3">
                  <h1 className='text-3xl'>2,000+</h1>
                  <h3>High-Quality Products</h3>
                </div>
                <div dir="rtl" className="flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0  mr-3 px-3">
                  <h1 className='text-3xl'>30,000+</h1>
                  <h3>Happy Customers</h3>
                </div>
              </div>

            </div>
            <div className='overflow-hidden bg-primary text-gray-100 shadow-sm p-4 mt-20'>
              <Brandsbar />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">

      </div>
    </main>
  )
}
