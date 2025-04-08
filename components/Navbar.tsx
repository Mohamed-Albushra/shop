import React from 'react'
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import NavbarSearch from '@/components/NavbarSearch';

export default function Navbar() {
  return (
    <div className='flex gap-5 items-center justify-between h-20'>
      <ul className='flex gap-10 space-x-3 pl-25'>
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/products'}>Products</Link></li>
        <li><Link href={'/about'}>About</Link></li>
      </ul>
      <NavbarSearch />
      <Link href={'/cart'} className='pr-10 md:pr-5'>
        <ShoppingCart />
      </Link>
    </div>
  )
}

