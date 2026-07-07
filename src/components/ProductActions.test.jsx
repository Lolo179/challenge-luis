import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider } from '../context/CartContext'
import ProductActions from './ProductActions'
import * as productApi from '../api/productApi'
import { mockProductDetail } from '../__fixtures__/products'

vi.mock('../api/productApi')

function renderProductActions(product = mockProductDetail) {
  return render(
    <CartProvider>
      <ProductActions product={product} />
    </CartProvider>
  )
}

describe('ProductActions', () => {
  beforeEach(() => {
    vi.mocked(productApi.addToCart).mockResolvedValue({ count: 1 })
  })

  it('renders storage and color selectors with first option selected by default', () => {
    renderProductActions()

    const storageSelect = screen.getByLabelText('Storage')
    const colorSelect = screen.getByLabelText('Color')

    expect(storageSelect).toHaveValue(String(mockProductDetail.options.storages[0].code))
    expect(colorSelect).toHaveValue(String(mockProductDetail.options.colors[0].code))
  })

  it('renders all available storage options', () => {
    renderProductActions()

    const storageSelect = screen.getByLabelText('Storage')
    mockProductDetail.options.storages.forEach(storage => {
      expect(storageSelect).toHaveTextContent(storage.name)
    })
  })

  it('renders all available color options', () => {
    renderProductActions()

    const colorSelect = screen.getByLabelText('Color')
    mockProductDetail.options.colors.forEach(color => {
      expect(colorSelect).toHaveTextContent(color.name)
    })
  })

  it('changes selected storage option', async () => {
    renderProductActions()

    const storageSelect = screen.getByLabelText('Storage')
    fireEvent.change(storageSelect, { target: { value: String(mockProductDetail.options.storages[1].code) } })

    expect(storageSelect).toHaveValue(String(mockProductDetail.options.storages[1].code))
  })

  it('changes selected color option', async () => {
    renderProductActions()

    const colorSelect = screen.getByLabelText('Color')
    fireEvent.change(colorSelect, { target: { value: String(mockProductDetail.options.colors[1].code) } })

    expect(colorSelect).toHaveValue(String(mockProductDetail.options.colors[1].code))
  })

  it('calls addToCart API when button is clicked', async () => {
    const user = userEvent.setup()
    renderProductActions()

    const button = screen.getByRole('button', { name: /add to cart/i })
    await user.click(button)

    expect(vi.mocked(productApi.addToCart)).toHaveBeenCalledWith({
      id: mockProductDetail.id,
      colorCode: mockProductDetail.options.colors[0].code,
      storageCode: mockProductDetail.options.storages[0].code,
    })
  })

  it('calls addToCart with user-selected storage and color', async () => {
    const user = userEvent.setup()
    renderProductActions()

    const storageSelect = screen.getByLabelText('Storage')
    const colorSelect = screen.getByLabelText('Color')

    fireEvent.change(storageSelect, { target: { value: String(mockProductDetail.options.storages[1].code) } })
    fireEvent.change(colorSelect, { target: { value: String(mockProductDetail.options.colors[1].code) } })

    const button = screen.getByRole('button', { name: /add to cart/i })
    await user.click(button)

    expect(vi.mocked(productApi.addToCart)).toHaveBeenCalledWith({
      id: mockProductDetail.id,
      colorCode: mockProductDetail.options.colors[1].code,
      storageCode: mockProductDetail.options.storages[1].code,
    })
  })

  it('disables button while adding to cart', async () => {
    const user = userEvent.setup()
    vi.mocked(productApi.addToCart).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ count: 1 }), 100))
    )

    renderProductActions()

    const button = screen.getByRole('button', { name: /add to cart/i })
    expect(button).not.toBeDisabled()

    await user.click(button)
    expect(button).toBeDisabled()

    await waitFor(() => {
      expect(button).not.toBeDisabled()
    })
  })

  it('shows "Adding..." text while request is in progress', async () => {
    const user = userEvent.setup()
    vi.mocked(productApi.addToCart).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ count: 1 }), 100))
    )

    renderProductActions()

    const button = screen.getByRole('button')
    await user.click(button)

    expect(button).toHaveTextContent('Adding...')

    await waitFor(() => {
      expect(button).toHaveTextContent('Add to cart')
    })
  })
})
