import React from 'react'
import { getCategories } from '@/lib/actions';
import CategoriesUI from '@/components/CategoriesUI';


export default async function Products() {
  return (
    <div>
      <CategoriesUI categories={await getCategories()} />
    </div>
  )
}

