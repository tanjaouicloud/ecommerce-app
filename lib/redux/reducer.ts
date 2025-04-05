import { CartState, ADD_TO_CART, CartAction, AddToCartAction, CartItem } from './types'

const initialState: CartState = {
  items: []
}

const cartReducer = (state: CartState = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      if (isAddToCartAction(action)) {
        const existingItem = state.items.find(item => item.id === action.payload.id)
        let updatedItems: CartItem[]

        if (existingItem) {
          updatedItems = state.items.map(item =>
            item.id === action.payload.id
              ? { ...existingItem, quantity: existingItem.quantity + 1 }
              : item
          )
        } else {
          updatedItems = [...state.items, { ...action.payload, quantity: 1 }]
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem('cartItems', JSON.stringify(updatedItems))
        }

        return {
          ...state,
          items: updatedItems,
        }
      }
      break

    default:
      return state
  }

  return state
}

function isAddToCartAction(action: CartAction): action is AddToCartAction {
  return action.type === ADD_TO_CART
}

export default cartReducer