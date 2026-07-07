import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import ProductListPage from './ProductListPage'
import * as productApi from '../api/productApi'
import { mockProducts } from '../__fixtures__/products'

vi.mock('../api/productApi')

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
      mockProducts.forEach(product => {
        expect(screen.getByText(product.model)).toBeInTheDocument()
      })
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
      expect(screen.getByText(mockProducts[0].model)).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search by brand or model/i)
    const brandToSearch = mockProducts[0].brand
    await user.type(searchInput, brandToSearch)

    // should show only products matching the brand
    mockProducts
      .filter(p => p.brand === brandToSearch)
      .forEach(product => {
        expect(screen.getByText(product.model)).toBeInTheDocument()
      })

    // should not show products not matching the brand
    mockProducts
      .filter(p => p.brand !== brandToSearch)
      .forEach(product => {
        expect(screen.queryByText(product.model)).not.toBeInTheDocument()
      })

    const matchCount = mockProducts.filter(p => p.brand === brandToSearch).length
    expect(screen.getByText(`${matchCount} results`)).toBeInTheDocument()
  })

  it('filters by brand case-insensitive', async () => {
    const user = userEvent.setup()
    renderProductListPage()

    await waitFor(() => {
      expect(screen.getByText(mockProducts[1].model)).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search by brand or model/i)
    const brandToSearch = mockProducts[1].brand.toLowerCase()
    await user.type(searchInput, brandToSearch)

    const matchingProducts = mockProducts.filter(
      p => p.brand.toLowerCase() === brandToSearch
    )
    matchingProducts.forEach(product => {
      expect(screen.getByText(product.model)).toBeInTheDocument()
    })

    expect(screen.getByText(`${matchingProducts.length} results`)).toBeInTheDocument()
  })

  it('shows no results when search does not match any product', async () => {
    const user = userEvent.setup()
    renderProductListPage()

    await waitFor(() => {
      expect(screen.getByText(`${mockProducts.length} results`)).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search by brand or model/i)
    const nonexistentQuery = 'XXXXNONEXISTENT'
    await user.type(searchInput, nonexistentQuery)

    expect(screen.getByText('0 results')).toBeInTheDocument()
    mockProducts.forEach(product => {
      expect(screen.queryByText(product.model)).not.toBeInTheDocument()
    })
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
