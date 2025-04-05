"use client"

import { Product } from '@/lib/redux/types'
import Image from 'next/image'

interface ProductListProps {
  products: Product[]
  addToCart: (product: Product) => void
}

const ProductList: React.FC<ProductListProps> = ({ products = [], addToCart }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-4 max-w-screen-lg">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map(product => (
          <div key={product.id} className="flex flex-col rounded-lg shadow overflow-hidden">
            <div className="w-full">
              <Image 
                src={product.image} 
                alt={product.title} 
                className="w-full h-60 object-cover" 
                width={300}
                height={250}
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p className="mt-1">${product.price}</p>
              <button 
                onClick={() => addToCart(product)} 
                className="mt-2 bg-orange-500 text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-orange-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ProductList
