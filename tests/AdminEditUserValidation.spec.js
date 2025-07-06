import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the specified URL
  await page.goto('http://localhost:8080/');
  await expect(page).toHaveTitle('Home | Drupal Site');

  // Perform login
  await page.click('a[href="/user/login"]');
  await page.fill('id=edit-name', 'admin');
  await page.fill('id=edit-pass', 'admin');
 // await page.click('id=edit-submit');
 await page.click("//input[@id='edit-submit']");
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

// The First Test Case
/*test('Add User as Content-EditorRole_2', async ({ page }) => {
   // Navigate to add-user
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   //await expect(page).toHaveTitle('People | Drupal Site');
   await page.locator("//a[normalize-space()='Add user']").click();

   // Fill in form
   await page.fill('id=edit-mail', 'mona+4562025@cloudypedia.net');
   await page.fill('id=edit-name', 'mona4562025');
   await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
   await page.fill('id=edit-pass-pass2', 'monaqc123*Test');

   //  Check Authenticated User
   await page.waitForSelector('id=edit-roles-authenticated'); 
   await expect(page.locator('id=edit-roles-authenticated')).toBeVisible();
   await expect(page.locator('id=edit-roles-authenticated')).toBeDisabled();
   // Check Content Editor and then checked 
   await page.waitForSelector('id=edit-roles-content-editor'); // Wait First
   await page.check('id=edit-roles-content-editor'); // Then Check

   // Submit form
   await page.waitForTimeout(3000);
   await page.click("//input[@id='edit-submit']");
   //Get Message successfully by detailes Diynamiclly
   const href= await page.locator("//div[@class='messages__content']//a").getAttribute('href');
   console .log('Href:',href)
   const userId = href?.split('/').pop(); // Will give 'Number'
   console.log('User ID:', userId);
   
   const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
   await expect (page.locator('div.messages__content')).toBeVisible();

 });
 */
 //Second Test Case
 test('Edit All Data From Button Edit Content-EditorRole_2', async ({ page }) => {
  
  //await page.goto('http://localhost:8080/$href');
  // Navigate to Pepole Page
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  // Navigate  to Edit-user by Press Button Edit
  await page.locator("//a[@aria-label='Edit mona4562025']").click();

   // Edit in form
   await page.fill('id=edit-mail', 'mona+5562025@cloudypedia.net');
   await page.fill('id=edit-name', 'mona5562025');
   await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
   await page.fill('id=edit-pass-pass2', 'monaqc123*Test');

   //  Check Authenticated User
   await page.waitForSelector('id=edit-roles-authenticated'); 
   await expect(page.locator('id=edit-roles-authenticated')).toBeVisible();
   await expect(page.locator('id=edit-roles-authenticated')).toBeDisabled();
   // Check Content Editor and then checked 
   await page.waitForSelector('id=edit-roles-content-editor'); // Wait First
   await expect(page.locator('id=edit-roles-content-editor')).toBeChecked();// check Role checked before Edit it 
   await page.check('id=edit-roles-content-editor'); // Then Check 
   //await expect( page.locator('id=edit-roles-conter')).not.toBeChecked(); // check Role Unchecked After Edit it
   const checkbox = page.locator('id=edit-roles-content-editor');
   await checkbox.uncheck(); // Uncheck it
   await expect(checkbox).not.toBeChecked(); // Confirm it is unchecked
   // Check Administrator
   await page.waitForSelector('id=edit-roles-administrator'); // wait first
   await page.check('id=edit-roles-administrator'); // then check so this user name has Administrator 
   // Submit form
   await page.waitForTimeout(3000);
   await page.click("//input[@id='edit-submit']");
   //Get Message successfully 
   const messageText = await page.locator('div.messages__content').textContent();
   console.log('Content Message is:',messageText);
   await expect (page.locator("//div[@class='messages__content']")).toBeVisible();
   
 });
//Third Test Case
 test('Edit All Data From UserLink Content-EditorRole_3', async ({ page }) => {
  
  //await page.goto('http://localhost:8080/$href');
  // Navigate to Pepole Page
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  // Navigate  to Edit-user by Press Link User Name  
  await page.locator("//a[normalize-space()='mona5562025']").click();
  await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
  await page.locator("//a[normalize-space()='Edit']").click();

   // Edit in form
   await page.fill('id=edit-mail', 'mona+6562025@cloudypedia.net');
   await page.fill('id=edit-name', 'mona6562025');
   await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
   await page.fill('id=edit-pass-pass2', 'monaqc123*Test');

   //  Check Authenticated Usernt-edito
   await page.waitForSelector('id=edit-roles-authenticated'); 
   await expect(page.locator('id=edit-roles-authenticated')).toBeVisible();
   await expect(page.locator('id=edit-roles-authenticated')).toBeDisabled();
   // Check Content Editor and then checked 
   await page.waitForSelector('id=edit-roles-content-editor'); // Wait First
   const checkbox = page.locator('id=edit-roles-content-editor');
   await checkbox.uncheck(); // Uncheck it
   await expect(checkbox).not.toBeChecked(); // Confirm it is unchecked
   await page.check('id=edit-roles-content-editor'); // Then Check
   await expect(page.locator('id=edit-roles-content-editor')).toBeChecked();// check Role checked After Edit it

   //await expect(page.locator('id=edit-roles-content-editor')).not.toBeChecked();// check Role Unchecked After Edit it 
   
   // Check Administrator
   await page.waitForSelector('id=edit-roles-administrator'); // wait first
 
   await expect(page.locator('id=edit-roles-administrator')).toBeChecked();// check user display checked before  Edit it
   await page.check('id=edit-roles-administrator'); // then check so this user name has Administrator
   // Submit form
   await page.waitForTimeout(3000);
   await page.click("//input[@id='edit-submit']");
   //Get Message successfully 
   const messageText = await page.locator('div.messages__content').textContent();
   console.log('Content Message is:',messageText);
   await expect (page.locator("//div[@class='messages__content']")).toBeVisible();
   
 });
 test('Unauthorized user attempts to edit', async ({ page }) => {
   await page.goto(`${baseURL}/user/logout`);
   await page.goto(`${baseURL}/node/${userId}/edit`);
   await expect(page.locator('body')).toContainText('You are not authorized');
 });
