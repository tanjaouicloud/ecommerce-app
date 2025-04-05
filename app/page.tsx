"use client"

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductList from '@/components/product/ProductList'
import Cart from '@/components/cart/Cart'
import ProductFilter from '@/components/product/ ProductFilter'
import { Product, CartItem } from '@/lib/redux/types'
import { ADD_TO_CART } from '@/lib/redux/types'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: any) => state.cart.items)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products') // Fetch all products
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, []) // Fetch products only once on component mount

  // Handle category change
  const addToCart = (product: Product) => {
    dispatch({ type: ADD_TO_CART, payload: product })
  }

  // Calculate total price of items in the cart
  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

  if (loading) return <p style={{ textAlign: 'center' }}>Loading products...</p>
  if (error) return <p style={{ textAlign: 'center' }}>Error fetching products: {error}</p>

  // Get unique categories based on the fetched products
  const categories = Array.from(new Set(products.map(product => product.category))) 

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold p-4 text-center">Product List</h1>
      <ProductFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <ProductList products={filteredProducts} addToCart={addToCart} />
      <Cart cartItems={cartItems} total={total} />
    </div>
  )
}

export default Home
