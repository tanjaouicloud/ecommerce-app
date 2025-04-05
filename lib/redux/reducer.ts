import { CartState, ADD_TO_CART } from './types'

const initialState: CartState = {
  items: [] 
}

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id)
      let updatedItems

      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : item
        )
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      // Save updated cart to local storage only in the browser
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(updatedItems))
      }

      return {
        ...state,
        items: updatedItems
      }
    default:
      // Load items from local storage if in the browser
      if (typeof window !== 'undefined') {
        const storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
        return {
          ...state,
          items: storedItems
        }
      }
      return state 
  }
}

export default cartReducer
