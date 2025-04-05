import { Action } from '@reduxjs/toolkit'

export const ADD_TO_CART = 'ADD_TO_CART'

export interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART
  payload: Product
}

export type CartAction = AddToCartAction | Action<string>

export interface RootState {
  cart: CartState
}