import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../api/productApi'
import ProductDescription from '../components/ProductDescription'
import ProductActions from '../components/ProductActions'
import './ProductDetailPage.css'

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

  if (loading) return <p className="page-status">Loading...</p>
  if (error) return <p className="page-status page-status--error">{error}</p>

  return (
    <main className="product-detail-page">
      <Link to="/" className="product-detail-page__back">← Back to list</Link>

      <div className="product-detail-page__layout">
        <div className="product-detail-page__image">
          <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
        </div>

        <div className="product-detail-page__info">
          <ProductDescription product={product} />
          <ProductActions product={product} />
        </div>
      </div>
    </main>
  )
}