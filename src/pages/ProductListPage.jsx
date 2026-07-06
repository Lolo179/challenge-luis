import { useState, useEffect } from 'react'
import { getProducts } from '../api/productApi'
import ProductCard from '../components/ProductCard'
import './ProductListPage.css'

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

  if (loading) return <p className="page-status">Loading...</p>
  if (error) return <p className="page-status page-status--error">{error}</p>

  return (
    <main className="product-list-page">
      <div className="product-list-page__toolbar">
        <span>{filtered.length} results</span>
        <input
          type="search"
          placeholder="Search by brand or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="product-list-page__search"
        />
      </div>

      <div className="product-list-page__grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}