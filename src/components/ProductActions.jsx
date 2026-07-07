import { useState } from 'react'
import { addToCart } from '../api/productApi'
import { useCart } from '../context/CartContext'

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
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="storage" className="text-sm font-semibold text-slate-700">Storage</label>
        <select
          id="storage"
          value={selectedStorage}
          onChange={(e) => setSelectedStorage(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 max-w-xs"
        >
          {options.storages?.map((s) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="color" className="text-sm font-semibold text-slate-700">Color</label>
        <select
          id="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 max-w-xs"
        >
          {options.colors?.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={adding}
        data-testid="add-to-cart-btn"
        className="mt-2 px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg max-w-xs hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {adding ? 'Adding...' : 'Add to cart'}
      </button>
    </div>
  )
}

