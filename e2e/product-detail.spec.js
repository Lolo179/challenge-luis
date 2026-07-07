import { test, expect } from '@playwright/test'

test.describe('Product Detail & Cart', () => {
  test('should navigate to product detail page', async ({ page }) => {
    await page.goto('/')

    // Esperar que carguen productos
    await page.waitForSelector('[data-testid="product-card"]')

    // Click en el primer producto
    const firstProductLink = page.locator('[data-testid="product-card"]').first().locator('a')
    await firstProductLink.click()

    // Verificar que navegó a detalle (URL contiene /product/)
    await expect(page).toHaveURL(/\/product\//)

    // Verificar que muestra descripción del producto
    const description = page.locator('[data-testid="product-description"]')
    await expect(description).toBeVisible()

    // Verificar que muestra specs como CPU, RAM
    await expect(page).toContainText(/CPU|RAM|Storage/)
  })

  test('should display product options (storage, color)', async ({ page }) => {
    await page.goto('/')

    // Navegar al primer producto
    await page.waitForSelector('[data-testid="product-card"]')
    await page.locator('[data-testid="product-card"]').first().locator('a').click()

    // Esperar detalle
    await expect(page).toHaveURL(/\/product\//)

    // Verificar que hay selectores de storage y color
    const storageSelect = page.locator('select#storage')
    const colorSelect = page.locator('select#color')

    await expect(storageSelect).toBeVisible()
    await expect(colorSelect).toBeVisible()
  })

  test('should add product to cart and update counter', async ({ page }) => {
    await page.goto('/')

    // Obtener contador inicial
    const cartBadge = page.locator('[data-testid="cart-count"]')
    const initialCount = await cartBadge.textContent()
    const initialValue = parseInt(initialCount || '0')

    // Navegar a producto
    await page.waitForSelector('[data-testid="product-card"]')
    await page.locator('[data-testid="product-card"]').first().locator('a').click()

    // Esperar a que cargue el detalle
    await expect(page).toHaveURL(/\/product\//)

    // Click en "Add to cart"
    const addButton = page.locator('[data-testid="add-to-cart-btn"]')
    await addButton.click()

    // Esperar que desaparezca el estado "Adding..."
    await page.waitForLoadState('networkidle')

    // Verificar que el contador se incrementó
    const newCount = await cartBadge.textContent()
    const newValue = parseInt(newCount || '0')

    expect(newValue).toBe(initialValue + 1)
  })

  test('should disable button while adding to cart', async ({ page }) => {
    await page.goto('/')

    // Navegar a producto
    await page.waitForSelector('[data-testid="product-card"]')
    await page.locator('[data-testid="product-card"]').first().locator('a').click()

    await expect(page).toHaveURL(/\/product\//)

    // Click en agregar
    const addButton = page.locator('[data-testid="add-to-cart-btn"]')
    await addButton.click()

    // Verificar que el botón está deshabilitado durante la petición
    await expect(addButton).toBeDisabled()

    // Esperar a que se habilite nuevamente
    await expect(addButton).toBeEnabled({ timeout: 5000 })
  })
})
