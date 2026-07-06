import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import ProductListPage from './ProductListPage'
import * as productApi from '../api/productApi'

vi.mock('../api/productApi')

const mockProducts = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: '999', imgUrl: 'https://example.com/1.jpg' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S22', price: '899', imgUrl: 'https://example.com/2.jpg' },
  { id: '3', brand: 'Apple', model: 'iPad Pro', price: '1099', imgUrl: 'https://example.com/3.jpg' },
]

function renderProductListPage() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <ProductListPage />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('ProductListPage', () => {
  beforeEach(() => {
    vi.mocked(productApi.getProducts).mockResolvedValue(mockProducts)
  })

  it('loads and displays all products on mount', async () => {
    renderProductListPage()
    
    await waitFor(() => {
      expect(screen.getByText('iPhone 14')).toBeInTheDocument()
      expect(screen.getByText('Galaxy S22')).toBeInTheDocument()
      expect(screen.getByText('iPad Pro')).toBeInTheDocument()
    })
  })

  it('displays correct result count', async () => {
    renderProductListPage()
    
    await waitFor(() => {
      expect(screen.getByText('3 results')).toBeInTheDocument()
    })
  })

  it('filters products by search query in real time', async () => {
    const user = userEvent.setup()
    renderProductListPage()

    await waitFor(() => {
      expect(screen.getByText('iPhone 14')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search by brand or model/i)
    await user.type(searchInput, 'Apple')

    expect(screen.getByText('iPhone 14')).toBeInTheDocument()
    expect(screen.getByText('iPad Pro')).toBeInTheDocument()
    expect(screen.queryByText('Galaxy S22')).not.toBeInTheDocument()
    expect(screen.getByText('2 results')).toBeInTheDocument()
  })

  it('filters by brand case-insensitive', async () => {
    const user = userEvent.setup()
    renderProductListPage()

    await waitFor(() => {
      expect(screen.getByText('Samsung')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search by brand or model/i)
    await user.type(searchInput, 'samsung')

    expect(screen.getByText('Galaxy S22')).toBeInTheDocument()
    expect(screen.queryByText('iPhone 14')).not.toBeInTheDocument()
  })

  it('shows no results when search does not match any product', async () => {
    const user = userEvent.setup()
    renderProductListPage()

    await waitFor(() => {
      expect(screen.getByText('3 results')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search by brand or model/i)
    await user.type(searchInput, 'Nokia')

    expect(screen.getByText('0 results')).toBeInTheDocument()
    expect(screen.queryByText('iPhone 14')).not.toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    vi.mocked(productApi.getProducts).mockImplementation(
      () => new Promise(() => {}) // nunca resuelve
    )
    renderProductListPage()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays error message on API failure', async () => {
    vi.mocked(productApi.getProducts).mockRejectedValue(new Error('API Error'))
    renderProductListPage()

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument()
    })
  })
})
