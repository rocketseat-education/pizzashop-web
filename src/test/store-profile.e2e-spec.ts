import { expect, test } from '@playwright/test'

test('update restaurant profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill('Another Name')
  await page.getByLabel('Descrição').fill('Another Description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso!')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  expect(page.getByText('Another Name')).toBeVisible()
})

test('update restaurant profile with error', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill('Invalid name')
  await page.getByLabel('Descrição').fill('Another Description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Falha ao atualizar o perfil, tente novamente!')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  expect(page.getByText('Invalid name')).not.toBeVisible()
})
