import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('html').click();
  await page.goto('https://nwc-portal-dev.united-builders.net/en');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByPlaceholder('Enter email address').click();
  await page.getByPlaceholder('Enter email address').fill('mo');
  await page.getByLabel('Email or username').click();
  await page.getByLabel('Email or username').fill('mona');
  await page.getByLabel('Email or username').press('Tab');
  await page.getByLabel('Password', { exact: true }).fill('monaqc123*_A12');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Personal profile' }).click();
  await page.getByRole('button', { name: 'user profile Welcome Mona' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
  await page.screenshot({path:'tests\screenshots'+Date.now()+'FullRecord.png'})
});