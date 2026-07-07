import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../api/productApi'
import ProductDescription from '../components/ProductDescription'
import ProductActions from '../components/ProductActions'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-700 rounded-full animate-spin" />
      <p className="text-slate-500 text-sm">Loading product...</p>
    </div>
  )

  if (error) return (
    <p className="text-center mt-16 text-red-500">{error}</p>
  )

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
      >
        ← Back to list
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-center">
          <img
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
            className="w-full max-h-80 object-contain"
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <ProductDescription product={product} />
          <ProductActions product={product} />
        </div>
      </div>
    </main>
  )
}
