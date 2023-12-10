import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in')

  await page.getByLabel('Seu e-mail').fill('john.doe@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  await page.waitForResponse('**/authenticate')

  const toast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail.',
  )

  expect(toast).toBeVisible()
})
