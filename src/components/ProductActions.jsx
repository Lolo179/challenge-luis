import { useState } from 'react'
import { addToCart } from '../api/productApi'
import { useCart } from '../context/CartContext'
import './ProductActions.css'

export default function ProductActions({ product }) {
  const { options, id } = product
  const { cartCount, updateCartCount } = useCart()

  const [selectedStorage, setSelectedStorage] = useState(options.storages?.[0]?.code ?? '')
  const [selectedColor, setSelectedColor] = useState(options.colors?.[0]?.code ?? '')
  const [adding, setAdding] = useState(false)

  async function handleAddToCart() {
    setAdding(true)
    try {
      const result = await addToCart({ id, colorCode: Number(selectedColor), storageCode: Number(selectedStorage) })
      updateCartCount(cartCount + result.count)
    } catch (err) {
      console.error('[ProductActions] addToCart failed:', err)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="product-actions">
      <div className="product-actions__group">
        <label htmlFor="storage">Storage</label>
        <select
          id="storage"
          value={selectedStorage}
          onChange={(e) => setSelectedStorage(e.target.value)}
        >
          {options.storages?.map((s) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="product-actions__group">
        <label htmlFor="color">Color</label>
        <select
          id="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {options.colors?.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>

      <button
        className="product-actions__btn"
        onClick={handleAddToCart}
        disabled={adding}
        data-testid="add-to-cart-btn"
      >
        {adding ? 'Adding...' : 'Add to cart'}
      </button>
    </div>
  )
}
