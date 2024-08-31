import { expect, test } from '@playwright/test'

test.describe('Register Functionality', () => {
  test('should register with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/register')

    await page.fill('input[id="full-name"]', 'Иван Иванов')
    await page.fill('input[id="email"]', 'example@example.ru')
    await page.fill('input[id="password"]', 'securepassword1')
    await page.fill('input[id="confirm-password"]', 'securepassword1')

    await page.click('button[type="submit"]')

    await page.waitForURL('http://localhost:3000/dashboard')

    const title = await page.locator('h1').innerText()
    expect(title).toBe('Главная страница')
  })

  test('should show error with mismatched passwords', async ({ page }) => {
    await page.goto('http://localhost:3000/register')

    await page.fill('input[id="full-name"]', 'Иван Иванов')
    await page.fill('input[id="email"]', 'example@example.ru')
    await page.fill('input[id="password"]', 'securepassword')
    await page.fill('input[id="confirm-password"]', 'differentpassword')

    await page.waitForTimeout(2000)

    const errorText = await page.locator('body').innerText()
    expect(errorText).toContain('Пароли не совпадают')
  })

  test('should show error with invalid email', async ({ page }) => {
    await page.goto('http://localhost:3000/register')

    await page.fill('input[id="full-name"]', 'Иван Иванов')
    await page.fill('input[id="email"]', 'invalid-email')
    await page.fill('input[id="password"]', 'securepassword')
    await page.fill('input[id="confirm-password"]', 'securepassword')

    await page.waitForTimeout(2000)

    const errorText = await page.locator('body').innerText()
    expect(errorText).toContain('Неверный формат почты')
  })

  test('should show error with weak password', async ({ page }) => {
    await page.goto('http://localhost:3000/register')

    await page.fill('input[id="full-name"]', 'Иван Иванов')
    await page.fill('input[id="email"]', 'example@example.ru')
    await page.fill('input[id="password"]', '123')
    await page.fill('input[id="confirm-password"]', '123')

    await page.waitForTimeout(2000)

    const errorText = await page.locator('body').innerText()
    expect(errorText).toContain('Пароль должен быть не короче 7 символов')
  })
})
