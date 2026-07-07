import { useState, useEffect } from 'react'
import { getProducts } from '../api/productApi'
import ProductCard from '../components/ProductCard'

export default function ProductListPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter((p) => {
    const query = search.toLowerCase()
    return (
      p.brand.toLowerCase().includes(query) ||
      p.model.toLowerCase().includes(query)
    )
  })

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-700 rounded-full animate-spin" />
      <p className="text-slate-500 text-sm">Loading products...</p>
    </div>
  )

  if (error) return (
    <p className="text-center mt-16 text-red-500">{error}</p>
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex justify-between items-center mb-6 gap-4">
        <span data-testid="result-count" className="text-sm text-slate-500">
          {filtered.length} results
        </span>
        <input
          type="search"
          placeholder="Search by brand or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center py-12 text-slate-500">
            No results found
          </p>
        )}
      </div>
    </main>
  )
}
