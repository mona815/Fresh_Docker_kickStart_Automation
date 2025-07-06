
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

test('Create with all valid fieldsByURL Link_1', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.fill('input[name="title[0][value]"]', 'Valid Title');
  await page.fill('textarea[name="body[0][value]"]', 'This is the article body.', { force: true });
  
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been created');
   const href= await page.locator("//div[@class='messages__content']//a").getAttribute('href');
   console .log('Href:',href)
   const pageId1 = href?.split('/').pop(); // Will give 'Number'
   console.log('Page ID:', pageId1);
   const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
   await expect (page.locator('div.messages__content')).toBeVisible();
});
test('Create with all valid fieldsBy Button Add_2', async ({ page }) => {
  //await page.goto(`${baseURL}/node/add/page`);
  // Navigate to Add Content Basic Page By Button Add
  await page.locator("//a[@id='toolbar-link-system-admin_content']").click();
  
  await expect(page).toHaveTitle('Content | Drupal Site');
  await page.locator("//a[@class='button button--action button--primary']").click();//click button Add Content 
  await page.locator("//a[normalize-space()='Basic page']").click();//click Link Basic Page
  //Form Basic Page 
  await page.fill('input[name="title[0][value]"]', 'Valid Title');
  await page.fill('textarea[name="body[0][value]"]', 'This is the article body.', { force: true });
  
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been created');
   const href= await page.locator("//div[@class='messages__content']//a").getAttribute('href');
   console .log('Href:',href)
   const pageId1 = href?.split('/').pop(); // Will give 'Number'
   console.log('Page ID:', pageId1);
   const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
   await expect (page.locator('div.messages__content')).toBeVisible();
});


test('Create with minimal required fields_3', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.fill('input[name="title[0][value]"]', 'Minimal Title');
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been created');
  const href= await page.locator("//div[@class='messages__content']//a").getAttribute('href');
   console .log('Href:',href)
   const pageId1 = href?.split('/').pop(); // Will give 'Number'
   console.log('Page ID:', pageId1);
   const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
   await expect (page.locator('div.messages__content')).toBeVisible();

});

test('Missing title field_4', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.fill('textarea[name="body[0][value]"]', 'Body only', { force: true });
  await page.click('input#edit-submit');
  //await expect(await page.$eval('input[name="title[0][value]"]',el => el.valitionMessage)).toBe("please fill out this field");
  //await expect(page.locator('.messages--error')).toBeVisible();
     // Alert  Message  Data required to fill 
     const isValid = await page.locator('id=edit-title-0-value').evaluate((input) => input.checkValidity());

     if (!isValid) {
      console.log('Field is invalid');
      console.log('please fill out this field');
     }


});

test('Missing body field_5', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.fill('input[name="title[0][value]"]', 'Title only');
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been created');
  const href= await page.locator("//div[@class='messages__content']//a").getAttribute('href');
   console .log('Href:',href)
   const pageId1 = href?.split('/').pop(); // Will give 'Number'
   console.log('Page ID:', pageId1);
   const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
   await expect (page.locator('div.messages__content')).toBeVisible();

});

test('Special characters in title_6', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.fill('input[name="title[0][value]"]', '!@#$%^&*()');
  await page.fill('textarea[name="body[0][value]"]', 'Body Basic Pgae with special title', { force: true });
  await page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been created');
  const href= await page.locator("//div[@class='messages__content']//a").getAttribute('href');
   console .log('Href:',href)
   const pageId1 = href?.split('/').pop(); // Will give 'Number'
   console.log('Page ID:', pageId1);
   const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
   await expect (page.locator('div.messages__content')).toBeVisible();

});

/*test('Select different text formats_7', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.fill('input[name="title[0][value]"]', 'HTML Format');
  await page.fill('textarea[name="body[0][value]"]', 'Using Full HTML', { force: true });
  await page.selectOption('select[name="body[0][format]"]', { value: 'full_html' });
  const isVisible = await page.locator('select[name="body[0][format]"]').isVisible();
  console.log('Dropdown visible:', isVisible);
  const count = await page.locator('select[name="body[0][format]"]').count();
  console.log('Dropdown count:', count);

   await page.click('input#edit-submit');
   await expect(page.locator('.messages--status')).toContainText('has been created');
   const href= await page.locator("//div[@class='messages__content']//a").getAttribute('href');
   console .log('Href:',href)
   const pageId1 = href?.split('/').pop(); // Will give 'Number'
   console.log('Page ID:', pageId1);
   const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
   await expect (page.locator('div.messages__content')).toBeVisible();

});*/

test('Check Status Published Firstlly checked _8', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.fill('input[name="title[0][value]"]', 'Preview Basic page ');
  await page.fill('textarea[name="body[0][value]"]', 'Preview content', { force: true });
  // Check Status Published Firstlly checked
   await page.waitForSelector('#edit-status-value'); // ✅ Wait for checkbox to appear
   const checkbox = page.locator('#edit-status-value');
   await expect(checkbox).toBeChecked(); // ✅ Confirm checkbox is checked
   console.log('Checkbox status is being verified...');
   console.log('checkbox status is :',checkbox);
    await expect(checkbox).toBeChecked(); // Confirm it is checked
   await page.waitForTimeout(3000);
   //const isChecked = await page.isChecked('#edit-status-value');
  // console.log('Published checked?', isChecked);
  
   // Submit Form
   await page.click('input#edit-submit');
 });
 

 // === Test : Check status checkbox ===
test('Check status checkbox is checked_9', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.waitForSelector('#edit-status-value', { state: 'visible' });
  const isChecked = await page.isChecked('#edit-status-value');
  console.log('Checked:', isChecked);
  await expect(page.locator('#edit-status-value')).toBeChecked();
});

test('Submit empty form_10', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.click('input#edit-submit');
  //await expect(page.locator('.messages--error')).toBeVisible();
       // Alert  Message  Data required to fill 
     const isValid = await page.locator('id=edit-title-0-value').evaluate((input) => input.checkValidity());

     if (!isValid) {
      console.log('Field is invalid');
      console.log('please fill out this field');
     }
});

test('Preview before save_11', async ({ page }) => {
  await page.goto(`${baseURL}/node/add/page`);
  await page.fill('input[name="title[0][value]"]', 'Preview Basic page ');
  await page.fill('textarea[name="body[0][value]"]', 'Preview content', { force: true });
  await page.click('input#edit-preview');
  await expect(page.locator('h1')).toContainText('Preview Basic page ');
});
