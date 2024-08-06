import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nwc-portal-dev.united-builders.net/en/');
  await page.goto('https://nwc-portal-dev.united-builders.net/en/user/register');
  await expect(page.getByLabel('First name')).toBeVisible();
  await page.getByLabel('Last name').click();
  await page.getByLabel('Email').click();
  await page.getByLabel('First name').click();
  await page.getByLabel('First name').fill('yara');
  await page.getByLabel('Last name').click();
  await page.getByLabel('Last name').fill('ahmed');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('mona+585858@cloudypedia.net');
  await page.getByLabel('Phone number').click();
  await page.getByLabel('Phone number').fill('0589647886');
  await page.getByLabel('Select organization').click();
  await page.getByRole('option', { name: 'test', exact: true }).click();
  await page.locator('#edit-organization-profiles-0-entity-field-organization-categories-wrapper--XAWbmtFlBCU').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Identity' }).click();
  await page.getByRole('option', { name: 'Identity' }).click();
  await page.getByRole('option', { name: 'Identity' }).click();
  await page.locator('#edit-organization-profiles-0--9uAFERMHcgc div').filter({ hasText: 'Organization Organization' }).first().click();
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByLabel('Error message')).toBeVisible();
});