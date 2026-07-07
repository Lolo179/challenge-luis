import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      data-testid="product-card"
      className="group flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200"
    >
      <div className="bg-slate-50 p-4 flex items-center justify-center aspect-square">
        <img
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{product.brand}</span>
        <span className="text-sm font-semibold text-slate-800 leading-tight">{product.model}</span>
        <span className="text-sm font-bold text-red-600 mt-1">{product.price} €</span>
      </div>
    </Link>
  )
}

