import { Product } from '@/lib/interfaces'
import React from 'react'
import Image from 'next/image'


export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className='flex flex-col bg-white/70 backdrop-invert backdrop-opacity-10 gap-3 rounded-lg shadow-lg  transition-transform hover:scale-105 p-5'>
      <Image src={product.thumbnail} alt={product.title} width={200} height={200} className='mx-auto' />
      <h2>{product.price} SEK</h2>
      <h2>Discount: {product.discountPercentage}%</h2>
      <h2>{product.title}</h2>
      <h4>{product.rating}</h4>
    </div>
  )
}

