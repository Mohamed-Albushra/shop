import React from 'react'
import { getProductsByCategory } from '@/lib/actions';
import CategoryUI from '@/components/CategoryUI';


export default async function category({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const products = await getProductsByCategory(category);
    return (
       <CategoryUI category={category} products={products} />
    )
}


