import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducer'

const loadCartItems = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cartItems')
    return savedCart ? JSON.parse(savedCart) : []
  }
  return [];
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      items: loadCartItems(),
    },
  },
})

export default store