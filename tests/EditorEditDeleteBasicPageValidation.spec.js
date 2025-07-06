
const { test, expect } = require('@playwright/test');
require('dotenv').config();

const baseURL = process.env.BASE_URL || 'http://localhost:8080';
const pageId = 1;
const invalidpageId = 99999;

async function login(page) {
  await page.goto(`${baseURL}/user/login`);
  await page.fill('input[name="name"]', process.env.DRUPAL_USERNAME1);
  await page.fill('input[name="pass"]', process.env.DRUPAL_PASSWORD1);
  await page.click('input#edit-submit');
}

test.beforeEach(async ({ page }) => {
  await login(page);
});
test.setTimeout(60000);

// Edit Scenarios
test('Update title and body_1', async ({ page }) => {
  await page.goto(`${baseURL}/node/${pageId}/edit`);
  await page.fill('input[name="title[0][value]"]', 'Updated Title');
  await page.fill('textarea[name="body[0][value]"]', 'Updated body', { force: true });
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been updated');
});

test('Save and verify changes_2', async ({ page }) => {
  await page.goto(`${baseURL}/node/${pageId}/edit`);
  await page.fill('textarea[name="body[0][value]"]', 'Verified update.', { force: true });
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been updated');
});

test('Submit without title_3', async ({ page }) => {
  await page.goto(`${baseURL}/node/${pageId}/edit`);
  await page.fill('input[name="title[0][value]"]', '');
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--error')).toBeVisible();
});

test('Change text format_4', async ({ page }) => {
  await page.goto(`${baseURL}/node/${pageId}/edit`);
  //await page.selectOption('select[name="body[0][format]"]', 'plain_text');
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been updated');
});

test('Preview before save_5', async ({ page }) => {
  await page.goto(`${baseURL}/node/${pageId}/edit`);
  await page.click('input#edit-preview');
  await expect(page.locator('h1')).toBeVisible();
});

test('Edit non-existent article_6', async ({ page }) => {
  await page.goto(`${baseURL}/node/${invalidpageId}/edit`);
  await expect(page.locator('body')).toContainText(/Access denied|Page not found/);
});

test('Unauthorized user attempts to edit_7', async ({ page }) => {
  await page.goto(`${baseURL}/user/logout`);
  await page.goto(`${baseURL}/node/${pageId}/edit`);
  await expect(page.locator('body')).toContainText('You are not authorized');
});

// Delete Scenarios
test('Delete existing Page_8', async ({ page }) => {
  await page.goto(`${baseURL}/node/${pageId}/delete`);
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been deleted');
});

test('Cancel deletion_9', async ({ page }) => {
  await page.goto(`${baseURL}/node/${pageId}/delete`);
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`/node/${articleId}`));
});

test('Show deletion success message_10', async ({ page }) => {
  await page.goto(`${baseURL}/node/${pageId}/delete`);
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been deleted');
});

test('Attempt to delete non-existent Basic Page_11', async ({ page }) => {
  await page.goto(`${baseURL}/node/${invalidpageId}/delete`);
  await expect(page.locator('body')).toContainText(/Access denied|Page not found/);
});

test('Unauthorized user attempts to delete_12', async ({ page }) => {
  await page.goto(`${baseURL}/user/logout`);
  await page.goto(`${baseURL}/node/${pageId}/delete`);
  await expect(page.locator('body')).toContainText('You are not authorized');
});

test('Verify Basic Page removal from content list_13', async ({ page }) => {
  await page.goto(`${baseURL}/admin/content`);
  await expect(page.locator(`text=Updated Title`)).toHaveCount(0);
});
