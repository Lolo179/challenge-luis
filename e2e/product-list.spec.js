import { test, expect } from '@playwright/test'

test.describe('Product List', () => {
  test('should load and display products', async ({ page }) => {
    await page.goto('/')

    // Verificar que la página carga (espera que haya al menos un producto)
    await page.waitForSelector('[data-testid="product-card"]')

    // Verificar que hay productos en la lista
    const productCards = page.locator('[data-testid="product-card"]')
    const count = await productCards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should display product count', async ({ page }) => {
    await page.goto('/')

    // Esperar que carguen los productos
    await page.waitForSelector('[data-testid="product-card"]')

    // Verificar que hay al menos 3 productos
    const resultCount = page.locator('[data-testid="result-count"]')
    await expect(resultCount).toContainText(/3 results/)
  })

  test('should filter products by search query', async ({ page }) => {
    await page.goto('/')

    // Esperar input de búsqueda
    const searchInput = page.locator('input[type="text"]')
    await searchInput.waitFor({ state: 'visible' })

    // Buscar por marca "Apple"
    await searchInput.fill('apple')

    // Verificar que filtra resultados (debe haber menos productos)
    await page.waitForLoadState('networkidle')
    const productCards = page.locator('[data-testid="product-card"]')
    const count = await productCards.count()
    expect(count).toBeGreaterThan(0)

    // Verificar que los resultados contienen "Apple"
    const firstProduct = productCards.first()
    await expect(firstProduct).toContainText(/Apple|iPhone/)
  })

  test('should show no results when search does not match', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[type="text"]')
    await searchInput.fill('nonexistentbrand')

    await page.waitForLoadState('networkidle')

    // Verificar que no hay productos
    const noResults = page.locator('text=No results found')
    await expect(noResults).toBeVisible()
  })
})
