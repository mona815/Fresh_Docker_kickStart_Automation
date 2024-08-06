import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nwc-portal-dev.united-builders.net/en/');
  await page.getByRole('link', { name: 'Create Account', exact: true }).click();
  await page.getByLabel('First name').click();
  await page.getByLabel('First name').fill('monaaa');
  await page.getByLabel('Last name').click();
  await page.getByLabel('Last name').fill('ahmed');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('mona+737363@cloudypedia.net');
  await page.getByLabel('Phone number').click();
  await page.getByLabel('Phone number').fill('0587496587');
  await page.getByLabel('- Select -').click();
  await page.getByRole('option', { name: 'test', exact: true }).click();
  //await page.locator('#edit-organization-profiles-0-entity-field-organization-categories-wrapper--bTZvDa1fIdc').getByRole('combobox').click();
  //await page.locator('#edit-organization-profiles-0-entity-field-organization-categories-wrapper--bTZvDa1fIdc').getByRole('combobox').click();
  await page.locator('#edit-organization-profiles-0-entity-field-organization-categories-wrapper--bTZvDa1fIdc').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Identity',exact:true }).click();
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByLabel('Status message').click();
  await page.getByLabel('Status message').click();
  await expect(page.getByLabel('Status message')).toContainText('× Status message Thank you for applying for an account. Your account is currently pending approval by the site administrator.In the meantime, a welcome message with further instructions has been sent to your email address.');
  await page.getByLabel('Error message').click();
  await expect(page.getByLabel('Error message')).toContainText('× Error message Error adding account to ldap.');
});