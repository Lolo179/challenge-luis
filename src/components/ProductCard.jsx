import { Link } from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card" data-testid="product-card">
      <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
      <div className="product-card__info">
        <span className="product-card__brand">{product.brand}</span>
        <span className="product-card__model">{product.model}</span>
        <span className="product-card__price">{product.price} €</span>
      </div>
    </Link>
  )
}
