import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

export default function Header() {
  const { cartCount } = useCart()
  const { pathname } = useLocation()

  const isDetail = pathname.startsWith('/product/')

  return (
    <header className="header">
      <Link to="/" className="header__title">
        Mobile Store
      </Link>

      <nav className="header__breadcrumb">
        <Link to="/">Home</Link>
        {isDetail && <span> &gt; Product detail</span>}
      </nav>

      <div className="header__cart">
        Cart: <span data-testid="cart-count">{cartCount}</span>
      </div>
    </header>
  )
}
