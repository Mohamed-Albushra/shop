import React from 'react'
import { Input } from '../components/ui/input'
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import {
  Search,
} from "lucide-react"

export default function Navbar() {
  return (
    <div className='flex gap-5 items-center justify-between h-20 px-25'>
        <ul className='flex gap-15 space-x-3 '>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/products'}>Products</Link></li>
            <li><Link href={'/about'}>About</Link></li>
        </ul>
        <div>
          <Search className="absolute right-170 top-8 h-4 w-4 text-muted-foreground" />
          <Input className='w-100 pl-10' type="search" placeholder="Search for product" />
        </div>
        <Link href={'/cart'}>
            <ShoppingCart/>
        </Link>
    </div>
  )
}

