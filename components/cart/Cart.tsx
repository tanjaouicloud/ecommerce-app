"use client"

import { CartItem } from '@/lib/redux/types'
import Image from 'next/image'

interface CartProps {
  cartItems: CartItem[]
  total: number
}

export function Cart({ cartItems = [], total }: CartProps) {
  return (
    <div className="p-4 border-t mt-4">
      <h2 className="text-lg font-bold">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartItems.map((item, index) => (
            <div key={index} className="flex flex-col rounded-lg shadow overflow-hidden">
              <div className="w-full">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-40 object-cover" 
                  width={300}
                  height={160}
                />
              </div>
              <div className="p-4">
                <span className="font-bold">{item.title} (x{item.quantity})</span>
                <span className="block text-gray-700 mt-1">${item.price * item.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 font-bold text-lg">Total: ${total}</div>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Checkout
      </button>
    </div>
  )
}
