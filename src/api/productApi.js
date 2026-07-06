import { cacheService } from '../services/cacheService'

const BASE_URL = 'https://itx-frontend-test.onrender.com'

function mapProductList(raw) {
  return {
    id: raw.id,
    brand: raw.brand,
    model: raw.model,
    price: raw.price,
    imgUrl: raw.imgUrl,
  }
}

function mapProductDetail(raw) {
  return {
    id: raw.id,
    brand: raw.brand,
    model: raw.model,
    price: raw.price,
    imgUrl: raw.imgUrl,
    cpu: raw.cpu,
    ram: raw.ram,
    os: raw.os,
    displayResolution: raw.displayResolution,
    battery: raw.battery,
    cameras: raw.cameras,
    dimentions: raw.dimentions,
    weight: raw.weight,
    options: raw.options,
  }
}

export async function getProducts() {
  const cached = cacheService.get('products')
  if (cached) return cached

  const response = await fetch(`${BASE_URL}/api/product`)
  if (!response.ok) throw new Error('Error al obtener productos')

  const data = await response.json()
  const products = data.map(mapProductList)

  cacheService.set('products', products)
  return products
}

export async function getProductById(id) {
  const cacheKey = `product_${id}`
  const cached = cacheService.get(cacheKey)
  if (cached) return cached

  const response = await fetch(`${BASE_URL}/api/product/${id}`)
  if (!response.ok) throw new Error('Error al obtener el producto')

  const raw = await response.json()
  const product = mapProductDetail(raw)

  cacheService.set(cacheKey, product)
  return product
}

export async function addToCart({ id, colorCode, storageCode }) {
  const response = await fetch(`${BASE_URL}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, colorCode, storageCode }),
  })
  if (!response.ok) throw new Error('Error al añadir al carrito')
  return response.json()
}
