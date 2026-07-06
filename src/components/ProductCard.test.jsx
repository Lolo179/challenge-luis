import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'

const mockProduct = {
  id: 'abc123',
  brand: 'Samsung',
  model: 'Galaxy S21',
  price: '799',
  imgUrl: 'https://example.com/image.jpg',
}

function renderProductCard() {
  return render(
    <MemoryRouter>
      <ProductCard product={mockProduct} />
    </MemoryRouter>
  )
}

describe('ProductCard', () => {
  it('renders brand, model and price', () => {
    renderProductCard()
    expect(screen.getByText('Samsung')).toBeInTheDocument()
    expect(screen.getByText('Galaxy S21')).toBeInTheDocument()
    expect(screen.getByText('799 €')).toBeInTheDocument()
  })

  it('renders the product image with alt text', () => {
    renderProductCard()
    const img = screen.getByRole('img', { name: /samsung galaxy s21/i })
    expect(img).toHaveAttribute('src', mockProduct.imgUrl)
  })

  it('links to the product detail page', () => {
    renderProductCard()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/product/${mockProduct.id}`)
  })
})
