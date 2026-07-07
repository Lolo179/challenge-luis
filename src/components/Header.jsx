import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { cartCount } = useCart()
  const { pathname } = useLocation()

  const isDetail = pathname.startsWith('/product/')

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <Link to="/" className="text-lg font-bold text-white hover:text-slate-300 transition-colors mr-auto">
          📱 Mobile Store
        </Link>

        <nav className="text-sm text-slate-300 hidden sm:flex items-center gap-1">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          {isDetail && <span className="text-slate-500"> › Product detail</span>}
        </nav>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-300">Cart</span>
          <span
            data-testid="cart-count"
            className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
          >
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  )
}

