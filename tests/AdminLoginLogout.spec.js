import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8085/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
});