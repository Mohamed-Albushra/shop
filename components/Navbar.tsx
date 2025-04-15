"use client";
import React, { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import NavbarSearch from '@/components/NavbarSearch';
import { useCart } from './cartProvider';
interface CartItem {
  id: number;
  quantity: number;
}
export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const { cartCount: cartCountFromHook } = useCart();

  useEffect(() => {
    const cart: CartItem[] = getCart();
    if (cart.length !== 0) {
      const totalQuantity = cart.reduce((acc: number, item: { quantity: number; }) => acc + item.quantity, 0);
      setCartCount(totalQuantity);
    }
  }, [cartCountFromHook]);

  const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  
  return (
    <div className='flex gap-5 items-center justify-between h-20'>
      <ul className='flex gap-10 space-x-3 pl-25'>
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/products'}>Products</Link></li>
        <li><Link href={'/about'}>About</Link></li>
      </ul>
      <NavbarSearch />
      <Link href={'/cart'} className='pr-10 md:pr-5'>
        <span className='bg-neutral-800 text-white rounded-full w-6 h-6 flex items-center justify-center'>{cartCount}</span>
        <ShoppingCart />
      </Link>
    </div>
  )
}

