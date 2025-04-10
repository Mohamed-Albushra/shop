import React from 'react'
import { getProductsByCategory } from '@/lib/actions';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import localFont from 'next/font/local';



const manolo = localFont({ src: "../../../../assets/manolo-mono.ttf" });
export default async function category({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const products = await getProductsByCategory(category);
    return (
        <div className="relative">
            <h1 className={`${manolo.className} flex justify-center items-center text-3xl text-black  backdrop-opacity-10 px-4  rounded`}>{category}</h1>

            <ul className="grid grid-flow-row auto-rows-max md:auto-rows-min grid-cols-3 justify-center gap-5 w-5xl mx-auto mt-5 ">
                {products.map((product) => <Link key={product.id} href={`/products/${product.id}`}>
                    <li>
                        <ProductCard product={product} />
                    </li>
                </Link>)}
            </ul>
            <div style={{ backgroundImage: `url(/${category}.jpg)` }} className="fixed mask-x-from-70% mask-x-to-95% mask-y-from-70% mask-y-to-95% flex flex-col items-center justify-center h-screen bg-cover bg-center  top-0 left-0 w-full -z-1"></div>
        </div>
    )
}


