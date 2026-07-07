import { test, expect } from '@playwright/test'

test.describe('Product List', () => {
  test('should load and display products', async ({ page }) => {
    await page.goto('/')

    // Verificar que la página carga (espera que haya al menos un producto)
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Verificar que hay productos en la lista
    const productCards = page.locator('[data-testid="product-card"]')
    const count = await productCards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should display result count', async ({ page }) => {
    await page.goto('/')

    // Esperar que carguen los productos
    await page.waitForSelector('[data-testid="result-count"]', { timeout: 10000 })

    // Verificar que hay un contador de resultados visible
    const resultCount = page.locator('[data-testid="result-count"]')
    await expect(resultCount).toBeVisible()
    
    // Verificar que el texto contiene números y "results"
    const text = await resultCount.textContent()
    expect(text).toMatch(/\d+ results/)
  })
})
