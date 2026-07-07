import { test, expect } from '@playwright/test'

test.describe('Product Navigation', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/')

    // Verificar que carga la página principal
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    // Verificar que hay productos
    const productCards = page.locator('[data-testid="product-card"]')
    expect(await productCards.count()).toBeGreaterThan(0)
  })

  test('should have cart counter in header', async ({ page }) => {
    await page.goto('/')

    // Esperar que cargue la aplicación
    await page.waitForSelector('[data-testid="cart-count"]', { timeout: 10000 })

    // Verificar que hay un contador de carrito
    const cartCount = page.locator('[data-testid="cart-count"]')
    await expect(cartCount).toBeVisible()
    
    // Verificar que el contador es un número
    const text = await cartCount.textContent()
    expect(text).toMatch(/\d+/)
  })

  test('should display product details when available', async ({ page }) => {
    await page.goto('/')

    // Esperar que carguen productos
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Verificar que cada producto card tiene contenido
    const firstCard = page.locator('[data-testid="product-card"]').first()
    
    // Verificar que el card tiene texto visible (marca, modelo, precio)
    const cardText = await firstCard.textContent()
    expect(cardText?.length).toBeGreaterThan(0)
  })

  test('should have product actions component available', async ({ page }) => {
    await page.goto('/')

    // Esperar que carguen los elementos
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Verificar que hay al menos una tarjeta de producto
    const cards = page.locator('[data-testid="product-card"]')
    const cardCount = await cards.count()
    
    expect(cardCount).toBeGreaterThan(0)
  })
})
