'use client'
import { getAllProducts } from '@/lib/actions';
import React, { useEffect, useState } from 'react'
import "./Brandsbar.css";
import localFont from 'next/font/local';


const manolo = localFont({ src: '../assets/manolo-mono.ttf' })
export default function Brandsbar() {
  const [myBrands, setMyBrands] = useState<string[]>([]);

  useEffect(() => {
    getAllProducts().then(products => {
      const brands = products.map(product => product.brand);
      const filteredBrands = brands.filter(brand => typeof brand === 'string');
      const uniqueBrands = [...new Set(filteredBrands)];
      setMyBrands(uniqueBrands);
    });
  }, []);
  return (
    <div className={`${manolo.className} w-full overflow-hidden`}>
      <div className="marquee inline-flex whitespace-nowrap animate-marquee">
        {[...myBrands, ...myBrands].map((brand, index) => (
          <div key={index} className="px-6 text-2xl">
            {brand}
          </div>
        ))}
      </div>
    </div>
  )
}
