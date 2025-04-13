import ProductUi from '@/components/ProductUi';
import { getProductById } from '@/lib/actions';
import React from 'react'



export default async function product({ params }: { params: Promise<{ id: number }> })  {
 const {id} = await params;
    const product = await getProductById(id);  
    if (!product) {
      return <div>Product not found</div>;
    }else{
        return (
    <ProductUi product={product} />
  ) 
    }
 
}

