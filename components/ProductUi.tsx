"use client";
import { Product } from '@/lib/interfaces'
import React, { useState } from 'react'
import Image from 'next/image'
import { RatingStars } from './RatingStars';

type ProductUiProps = {
  product: Product
}
function ProductUi({ product }: ProductUiProps) {

  const [photo, setPhoto] = useState(product?.images[0]);

  const changeImage = (image: string) => {
    setPhoto(image);
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 mx-50 py-30">
      {/*Images section*/}
      <div className="lg:col-span-5 flex gap-4">
      <ul className="flex flex-col gap-2">
          {product.images.map((image, index) => (
            <li key={index}>
              <Image
                onClick={() => changeImage(image)}
                src={image}
                alt={product.title}
                width={80}
                height={80}
                className={`cursor-pointer rounded border ${image === photo ? "border-gray-800" : "border-gray-300"}`}/>
            </li>
          ))}
        </ul>  
        <div>
          <Image src={photo}
            alt={product.title}
            width={400}
            height={400}
            className="mx-auto" />
        </div>
      </div>
      {/* PRODUCT INFO SECTION */}
      <div className="lg:col-span-4 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <h3 className="text-lg text-gray-600">{product.brand}</h3>
        <div className="text-xl text-gray-800">
          <p>{product.price} SEK</p>
          <p>Discount: {product.discountPercentage}%</p>
          <RatingStars rating={product.rating} /><span className="text-sm text-gray-600"> {product.rating.toFixed(1)}</span>
        </div>
        <div className="text-gray-700 text-lg">
          <p>{product.description}</p>
        </div>
      </div>
      {/* CART SECTION */}
      <div className="lg:col-span-3 border rounded p-4 space-y-4 shadow-sm">
        <h1>{product.price}</h1>
        <h3>Discount: {product.discountPercentage}%</h3>
        <div className="flex flex-col space-y-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Buy now</button>
        </div>
      </div>
    </div>
  )
}

export default ProductUi