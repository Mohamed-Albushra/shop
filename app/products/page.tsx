import React from 'react'
import { getCategories } from '@/lib/actions';
import Link from 'next/link'


export default async function Products() {
  return (
    <div>
      <ul>
        {(await getCategories()).map((category, index) => (
          <li key={index}><Link href={`/products/category/${category}`}>{category}</Link></li>
        ))}
      </ul>
    </div>
  )
}

