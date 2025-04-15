"use client";
import { Product } from '@/lib/interfaces'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { RatingStars } from './RatingStars';
import Link from 'next/link';
import { getProductsByBrand, getProductsByTag } from '@/lib/actions';
import { useCart } from './cartProvider';

type ProductUiProps = {
  product: Product
}
function ProductUi({ product }: ProductUiProps) {

  const [photo, setPhoto] = useState(product?.images[0]);
  const [relatedByBrandProducts, setRelatedByBrandProducts] = useState<Product[]>([]);
  const [brandScrollIndex, setBrandScrollIndex] = useState(0);
  const [tagScrollIndex, setTagScrollIndex] = useState(0);
  const [relatedByTagProducts, setRelatedByTagProducts] = useState<Product[]>([]);
  const changeImage = (image: string) => {
    setPhoto(image);
  }

  const relatedByBrand = useCallback(
    async (product: Product) => {
      const products = await getProductsByBrand(product.brand);
      setRelatedByBrandProducts(products);
      return relatedByBrandProducts;
    },
    []
  );

  const relatedByTages = useCallback(
    async (product: Product, tagsProducts: Product[]) => {
      await Promise.all(
        product.tags.map(async (tag) => {
          const products = await getProductsByTag(tag);
          tagsProducts.push(...products);
        })
      );
      setRelatedByTagProducts(tagsProducts.flat());
    },
    []
  );

  const ITEMS_PER_VIEW = 5;
  const getVisibleItems = (items: Product[], startIndex: number) => items.slice(startIndex, startIndex + ITEMS_PER_VIEW);

  useEffect(() => {
    relatedByBrand(product);
    relatedByTages(product, []);
  }, [product, relatedByBrand, relatedByTages]);

  const { addToCart } = useCart();
  const addProductToCart = (product: Product) => {
    addToCart(product);
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
                className={`cursor-pointer rounded border ${image === photo ? "border-gray-800" : "border-gray-300"}`} />
            </li>
          ))}
        </ul>
        <div>
          <Image src={photo}
            alt={product.title}
            width={800}
            height={800}
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
        <h1 className="text-3xl font-bold">{product.price} SEK</h1>
        <h3 className="text-lg text-gray-600">Discount: {product.discountPercentage}%</h3>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => addProductToCart(product)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>

          <button
            onClick={() => addProductToCart(product)}
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"> <Link href={'/cart'}>Buy now</Link></button>
        </div>
        <div className="text-sm text-gray-600">
          <p><span className="font-semibold">Shipping Information:</span> {product.shippingInformation}</p>
          <p><span className="font-semibold">Availability:</span> {product.availabilityStatus}</p>
          <p><span className="font-semibold">Return Policy:</span> {product.returnPolicy}</p>
          <p><span className="font-semibold">Minimum Order Quantity:</span> {product.minimumOrderQuantity}</p>
          <Image
            src={product.meta.qrCode}
            alt={product.title}
            width={200}
            height={200}
            className="mx-auto" />
        </div>
      </div>


      {/* RELATED PRODUCTS SECTION */}
      <div className="lg:col-span-12 mt-12 grid grid-cols-1 lg:grid-cols-1 gap-8">

        {/* RELATED PRODUCTS WITH THE SAME BRAND SECTION */}
        <div className="border rounded p-4 justify-items-center">
          <h2 className="text-xl font-semibold mb-4">More from this Brand</h2>
          <div className="relative mx-50">
            <div className="flex items-center">
              <button
                onClick={() => setBrandScrollIndex((prev) => Math.max(prev - ITEMS_PER_VIEW, 0))} className="p-2"
              >
                ◀
              </button>
              <div className="grid grid-cols-5 gap-4 flex-1">
                {getVisibleItems(relatedByBrandProducts, brandScrollIndex).map((product, index) => (
                  <div key={index} className="border rounded p-2 field-sizing-content hover:scale-105 transition-transform">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={80}
                        height={80}
                        className="rounded w-full aspect-square object-contain"
                      />
                      <p className="mt-2 text-sm font-medium">{product.title}</p>
                      <p className="text-sm text-gray-600">{product.price} SEK</p>
                    </Link>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setBrandScrollIndex((prev) => prev + ITEMS_PER_VIEW < relatedByBrandProducts.length ? prev + ITEMS_PER_VIEW : prev)} className="p-2"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
        {/* RELATED PRODUCTS WITH THE SAME TAGS SECTION */}

        <div className="border rounded p-4 justify-items-center">
          <h2 className="text-xl font-semibold mb-4">More from this by Tags</h2>
          <div className="relative mx-50">
            <div className="flex items-center">
              <button
                onClick={() => setTagScrollIndex((prev) => Math.max(prev - ITEMS_PER_VIEW, 0))} className="p-2"
              >
                ◀
              </button>
              <div className="grid grid-cols-5 gap-4 flex-1">
                {getVisibleItems(relatedByTagProducts, tagScrollIndex).map((product, index) => (
                  <div key={index} className="border rounded p-2 field-sizing-content hover:scale-105 transition-transform">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={100}
                        height={100}
                        className="rounded w-full aspect-square object-contain"
                      />
                      <p className="mt-2 text-sm font-medium">{product.title}</p>
                      <p className="text-sm text-gray-600">{product.price} SEK</p>
                    </Link>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setTagScrollIndex((prev) => prev + ITEMS_PER_VIEW < relatedByBrandProducts.length ? prev + ITEMS_PER_VIEW : prev)} className="p-2"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="lg:col-span-12 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-center ">Customer Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="border p-4 rounded mb-2">
            <RatingStars rating={review.rating} />
            <p className="font-medium">{review.reviewerName}</p>
            <h4>{review.reviewerEmail}</h4>
            <p className="text-sm text-gray-600">{review.comment}</p>
            <p className="text-sm text-gray-600">{new Date(review.date).toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductUi


