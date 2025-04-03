import React from 'react'
import { Input } from './ui/input'
// import Image from 'next/image'

export default function Navbar() {
  return (
    <div className='flex gap-30 items-center justify-between'>
        <ul className='flex gap-1 space-x-3 '>
            <li>Home</li>
            <li>Shop</li>
            <li>Cart</li>
        </ul>
        <Input className='w-1/3' type="search" placeholder="Search for product" />
        {/* <Image src=".." alt="logo" width={50} height={50} />        */}
    </div>
  )
}

