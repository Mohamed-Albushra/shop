import { getAllProducts } from '@/lib/actions';
import React from 'react'
import { FocusCards } from "@/components/ui/focus-cards";
import localFont from 'next/font/local';


const manolo = localFont({ src: "../assets/manolo-mono.ttf" });
async function Trending() {
    const allProducts = await getAllProducts();
    const sortedProducts = allProducts.sort((a, b) => b.rating - a.rating);
    const top6Products = sortedProducts.slice(0, 6);

  return (
    <div className='bg-zinc-200 w-full p-3'>
        <ul>
        <h1 className={`${manolo.className} flex justify-center items-center text-3xl text-black pb-3 backdrop-opacity-10 px-4  rounded md:px-10 my-10 text-center`}>Trending Products</h1>
        <FocusCards cards={top6Products.map((product) => ({ src: product.thumbnail, title: product.title, id: product.id }))} />
        </ul>
    </div>
  )
}

export default Trending