const { test, expect } = require('@playwright/test');
const fs = require('fs');
require('dotenv').config();


const baseURL = process.env.BASE_URL || 'http://localhost:8080';

// Load users from JSON file
const users = JSON.parse(fs.readFileSync('tests/data/users.json', 'utf-8'));

// Shared login logic
async function login(page) {
  await page.goto(`${baseURL}/user/login`);
  await page.fill('input[name="name"]', process.env.DRUPAL_USERNAME);
  await page.fill('input[name="pass"]', process.env.DRUPAL_PASSWORD);
  await page.click('input#edit-submit');
}

test.beforeEach(async ({ page }) => {
  await login(page);
});
test.setTimeout(60000);

// Run a test for each user in JSON
for (const user of users) {
  test(`Add User 2Roles with Valid Data - ${user.username}`, async ({ page }) => {
    //  Navigate To Add User by link create user Page 
    // await page.goto('${baseURL}/admin/people/create'); 

    // Navigate to add-user by click button Add User
    await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
    await page.locator("//a[normalize-space()='Add user']").click();
   // Fill Form 
    await page.fill('id=edit-mail', user.email);
    await page.fill('id=edit-name', user.username);
    await page.fill('id=edit-pass-pass1', user.password);
    await page.fill('id=edit-pass-pass2', user.password);
    // Handle role selection
    for (const role of user.roles) {
      await page.check(`#edit-roles-${role}`);
    }
    await page.click('#edit-submit');
    // Validate result
    await expect(page.locator('div.messages__content')).toBeVisible();
    const messageText = await page.locator('div.messages__content').textContent();
    console.log(`User ${user.username} message:`, messageText);
    // Get User ID ans URL 
    const href= await page.locator("//div[@class='messages__content']//a").getAttribute('href');
    console .log('Href:',href)
    const userId = href?.split('/').pop(); // Will give 'Number'
    console.log('User ID:', userId);
  });

/*test('Show Error when User Name is empty_4', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail',user.email);
     await page.fill('id=edit-pass-pass1', user.password);
     await page.fill('id=edit-pass-pass2', user.password);
     await page.click("//input[@id='edit-submit']");

     // Alert  Message  Data required to fill 
     const isValid = await page.locator('id=edit-name').evaluate((input) => input.checkValidity());

     if (!isValid) {
      console.log('Field is invalid');
      console.log('please fill out this field');
     }

    });*/



}
