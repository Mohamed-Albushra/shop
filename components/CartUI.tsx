"use client";
import React from "react";
import { useCart } from "./cartProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
const manolo = localFont({ src: "../assets/manolo-mono.ttf"});
function CartUI() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    moreQuantity,
    lessQuantity,
    cartTotal,
    cartCount,
  } = useCart();
 

  return (
    <div className="mx-auto py-5 md:py-10 sm:px-10 md:px-5 lg:px-32">
      <h1 className={`${manolo.className} flex justify-center items-center text-3xl text-black pb-3 backdrop-opacity-10 px-4  rounded`}>Your Cart</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-10 md:gap-5">
        <div className="col-span-2 border rounded-2xl mx-1 ">
          <Table>
            <TableHeader>
              <TableRow className="text-lg font-bold">
                <TableHead className="w-[100px] text-center">Image</TableHead>
                <TableHead className="w-[100px] text-center">Title</TableHead>
                <TableHead className="w-[100px] text-center">
                  Quantity
                </TableHead>
                <TableHead className="w-[100px] text-center">Price</TableHead>
                <TableHead className="w-[100px] text-center hidden md:table-cell">
                  Total
                </TableHead>
                <TableHead className="w-[100px] text-center">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.product.id}>
                  <TableCell className="font-medium">
                    <Link href={`/products/${item.product.id}`}>
                      <Image
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        width={200}
                        height={200}
                      />
                    </Link>
                  </TableCell>

                  <TableCell className="font-medium text-center max-w-[80px] truncate whitespace-nowrap overflow-hidden">
                    <Link href={`/products/${item.product.id}`}>
                      {item.product.title}
                    </Link>
                  </TableCell>

                  <TableCell className="font-medium  text-center">
                    <button
                      onClick={() => moreQuantity(item.product.id)}
                      className="rounded-sm bg-primary px-1 py-1 sm:px-2 sm:py-2 md:px-3 md:py-3 lg:px-4 lg:py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
                    >
                      +
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => lessQuantity(item.product.id)}
                      className="rounded-sm bg-primary px-1 py-1 sm:px-2 sm:py-2 md:px-3 md:py-3 lg:px-4 lg:py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
                    >
                      -
                    </button>
                  </TableCell>
                  <TableCell className="font-medium  text-center">
                    {item.product.price}
                  </TableCell>
                  <TableCell className="font-medium  text-center hidden md:table-cell">
                    {(item.quantity * item.product.price).toFixed(2)}
                  </TableCell>
                  <TableCell className="font-medium  text-center">
                    <button
                      onClick={() => removeFromCart(item.product)}
                      className="text-red-500 text-center"
                    >
                      Remove
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="col-span-2 md:col-span-1 border rounded-2xl">
          <h1 className="text-lg font-bold my-1 text-center">Order Summary</h1>
          <div className="col-span-1 border flex flex-col gap-2">
            <div className="flex justify-between p-10">
              <h3 className="font-bold text-2xl">Quantities</h3>
              <span className="font-bold text-2xl">{cartCount}</span>
            </div>
            <div className="flex justify-between p-10">
              <h3 className="font-bold text-2xl">Total</h3>
              <span className="font-bold text-2xl">{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-5 p-10">
              <button className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer">
                GO To Checkout
              </button>
              <button
                onClick={clearCart}
                className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
              >
                Clear The Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartUI;
