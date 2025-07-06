const { test, expect } = require('@playwright/test');
const fs = require('fs');

require('dotenv').config();

const baseURL = process.env.BASE_URL || 'http://localhost:8080';

// Load JSON data
const path = require('path');
//const pageData = JSON.parse(fs.readFileSync(require.resolve('tests/data/pageData.json'), 'utf8' ));
// Load PageData from JSON file
const pageData = JSON.parse(fs.readFileSync('tests/data/pageData.json', 'utf-8'));


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

// === Test 1: Create page and select format ===
test('Select different text formats dynamically', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.fill('id=edit-title-0-value', pageData.title);
  
  await page.locator('#edit-body-wrapper [contenteditable="true"]').fill(pageData.body);
  //await page.selectOption('select[name="body[0][format]"]', { value: pageData.text_format });
  await page.locator('id=edit-body-0-format--2').selectOption('Full HTML');

  await page.click('input#edit-submit');

  await expect(page.locator('.messages--status')).toContainText('has been created');
  const href = await page.locator("//div[@class='messages__content']//a").getAttribute('href');
  const pageId = href?.split('/').pop();
  console.log('Page ID:', pageId);
  const messageText = await page.locator('div.messages__content').textContent();
  console.log('Message:', messageText);
});
test('Check status checkbox is checked', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  // Make sure checkbox is visible
  //await page.waitForSelector('#edit-status-value', { state: 'visible' });
  //await page.locator('id=edit-status-value').toBeChecked();
  // Check if it is checked()
  const isChecked = await page.isChecked('#edit-status-value');
  console.log('Checked:', isChecked);
  // Optional assertion
  await expect(page.locator('#edit-status-value')).toBeChecked();
});