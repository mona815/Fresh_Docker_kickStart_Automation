import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nwc-portal-dev.united-builders.net/en/');
  await page.getByRole('link', { name: 'Create Account', exact: true }).click();
  await page.getByLabel('First name').click();
  await expect(page.getByLabel('First name')).toBeVisible();
  await expect(page.getByLabel('First name')).toBeEmpty();
  await page.getByLabel('First name').dblclick();
  await page.getByLabel('First name').fill('mona');
  //await page.getByLabel('First name').press('NumLock');
  //await page.getByLabel('First name').press('NumLock');
  //await page.getByLabel('First name').click();
  //await page.getByLabel('First name').click();
  await page.getByLabel('Last name').click();
  await page.getByLabel('Last name').fill('tester');
  await page.getByLabel('Email').click();
  await page.getByLabel('First name').click();
  await page.getByLabel('First name').fill('monaaa');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('mona+9989@cloudypedia.net');
  await page.getByLabel('Phone number').click();
  await page.getByLabel('Phone number').fill('056478529');
  await page.getByLabel('Select organization').click();
  await page.getByRole('option', { name: 'test', exact: true }).click();
  await page.setDefaultTimeout(80000); // 80 seconds timeout
 //await page.locator('#edit-organization-profiles-0-entity-field-organization-categories-wrapper--Rbuz17GIzRA').getByRole('combobox').click();
  await page.locator("//label[contains(text(),'Organization categories')]").getByRole('combobox').click();
  await page.getByRole('option', { name: 'Identity' }).click();
  /*await page.locator('#edit-organization-profiles-0-entity-field-organization-categories-wrapper--Rbuz17GIzRA').getByRole('combobox').click();
  await page.locator('#edit-organization-profiles-0-entity-field-organization-categories-wrapper--Rbuz17GIzRA').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Identity' }).click();
  await page.getByRole('option', { name: 'Identity' }).click();
  */
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByLabel('Phone number').click();
  await page.getByLabel('Phone number').fill('056478589');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByLabel('Phone number').click();
  await page.getByLabel('Phone number').click();
  await page.getByLabel('Phone number').fill('0564748989');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByLabel('Status message').click();
  await expect(page.getByLabel('Status message')).toContainText('× Status message Thank you for applying for an account. Your account is currently pending approval by the site administrator.In the meantime, a welcome message with further instructions has been sent to your email address.');
  await page.getByLabel('Error message').click();
  await expect(page.getByLabel('Error message')).toContainText('× Error message Error adding account to ldap.');
});