import { expect, test } from '@playwright/test'

test.describe('Login Functionality', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    await page.fill('input[id="email"]', 'somebody@gmail.com')
    await page.fill('input[id="password"]', '1111111')

    await page.click('button[type="submit"]')

    await page.waitForURL('http://localhost:3000/dashboard')

    const title = await page.locator('h1').innerText()
    expect(title).toBe('Главная страница')
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    await page.fill('input[id="email"]', 'somebody@gmail.com')
    await page.fill('input[id="password"]', '1111112')

    await page.click('button[type="submit"]')

    await page.waitForTimeout(2000)

    const errorText = await page.locator('body').innerText()
    expect(errorText).toContain('Неверный логин или пароль')
  })
})
