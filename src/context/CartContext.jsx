/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(() => {
    const stored = localStorage.getItem('cartCount')
    return stored ? Number(stored) : 0
  })

  function updateCartCount(count) {
    localStorage.setItem('cartCount', count)
    setCartCount(count)
  }

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
