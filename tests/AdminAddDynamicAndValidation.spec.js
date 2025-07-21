const { test, expect } = require('@playwright/test');
const fs = require('fs');
require('dotenv').config();

const baseURL = process.env.BASE_URL || 'http://localhost:8080';

// Load users from JSON file
const users = JSON.parse(fs.readFileSync('tests/data/users1111.json', 'utf-8'));

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

// After each, perform a logout
test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `screenshots/${testInfo.title.replace(/[^a-zA-Z0-9]/g, "_")}.png`, fullPage: true });
    }
    // Log Out
    await page.waitForTimeout(3000);
    await page.locator("//a[normalize-space()='Home']").click();
    await page.locator("//a[@class='secondary-nav__menu-link secondary-nav__menu-link--link secondary-nav__menu-link--level-1'][normalize-space()='Log out']").click();
  });

  users.forEach((user) => {
  test(user.description, async ({ page }) => {
   // await login(page);

    await page.goto('http://localhost:8080/admin/people/create');

    // Fill form
    await page.fill('#edit-mail', user.email);
    await page.fill('#edit-name', user.username);
    await page.fill('#edit-pass-pass1', user.password);
    await page.fill('#edit-pass-pass2', user.confirmPassword || user.password);

    // Select roles
    for (const role of user.roles || []) {
      await page.check(`#edit-roles-${role}`);
    }
    await page.click('#edit-submit');

    if (user.expected.success) {
      // Success case
      await expect(page.locator('div.messages__content')).toBeVisible();
      const messageText = await page.locator('div.messages__content').textContent();
      console.log(`✅ ${user.username}: ${messageText}`);
    } else {
      // Failure case
      const errorContent = page.locator('div.messages__content');
      //await expect(errorContent).toContainText(user.expected.errorMessage);
      const errorText = await errorContent.textContent();
      console.log(`❌ ${user.username} failed:`, errorText);
    }
  });

});

// Delete Scenarios
  test(' Cancel the selected user account ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
   await page.check('id=edit-user-bulk-form-1');
   // Add the Content editor role to the selected user(s)
    await page.locator('id=edit-action').selectOption('Cancel the selected user account(s)'); 
    page.click('input#edit-submit');
    await expect(page.locator("//h1[contains(text(),'Are you sure you want to cancel these user account')]")).toContainText('Are you sure you want to cancel these user accounts?');
    await page.locator("//label[contains(text(),'Delete the account and its content. This action ca')]").check();
    await page.check('id=edit-user-cancel-confirm')
    await page.click("//input[@id='edit-submit']");
    //Get 2 Massages succssess After Delete 
    // await expect(page.locator("//body/div[@class='page-wrapper dialog-off-canvas-main-canvas']/main/div[@class='layout-container']/div[@class='page-content clearfix']/div[@class='region region-highlighted']/div[@class='messages-list']/div[@class='messages__wrapper']/div[1]")).toContainText(' has been deleted.');
    //const message1=await page.locator("//body/div[@class='page-wrapper dialog-off-canvas-main-canvas']/main/div[@class='layout-container']/div[@class='page-content clearfix']/div[@class='region region-highlighted']/div[@class='messages-list']/div[@class='messages__wrapper']/div[1]").textContent();
   //console.log(message1);
    await expect(page.locator("//div[@class='messages__wrapper']")).toContainText(' has been deleted.');
    const message2=await page.locator("//div[@class='messages__wrapper']").textContent();
    console.log(message2);
    
    await expect(page.locator("//body")).toBeVisible();

    });

  
