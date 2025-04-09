import React from 'react'
import { getProductsByCategory } from '@/lib/actions';



export default async function category({ params }: { params: Promise<{ name: string, category: string }> }) {
    const { category } = await params;
    const products = await getProductsByCategory(category);
    return(
        <div style={{ backgroundImage: `url(/${category}.jpg)` }} className="mask-x-from-70% mask-x-to-90% mask-y-from-70% mask-y-to-90% flex flex-col items-center justify-center h-screen bg-cover bg-center">
            <h1>{category}</h1>
            <ul>
                {products.map((product) => <li key={product.id}>{product.title}</li>)}
            </ul>
        </div>
    ) 
}


