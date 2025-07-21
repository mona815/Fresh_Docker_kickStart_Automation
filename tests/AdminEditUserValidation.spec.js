import { test, expect } from '@playwright/test';
const fs = require('fs');
require('dotenv').config();
const baseURL = process.env.BASE_URL || 'http://localhost:8080';
//let userId ;

const userId = JSON.parse(fs.readFileSync('tests/data/last-user-id.json')).userId;
let createdUserId; // Shared variable
//const invaliduserId = 99999;
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

// After each, perform a logout
test.afterEach(async ({ page }) => {
    
    // Log Out
    await page.waitForTimeout(3000);
    await page.locator("//a[normalize-space()='Home']").click();
    await page.locator("//a[@class='secondary-nav__menu-link secondary-nav__menu-link--link secondary-nav__menu-link--level-1'][normalize-space()='Log out']").click();
  });

 // The First Test Case
 test('Add User To Get userId_1 ', async ({ page }) => {
   // Navigate to add-user
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   await expect(page).toHaveTitle('People | Drupal Site');
   await page.locator("//a[normalize-space()='Add user']").click();
   // Fill in form
   await page.fill('id=edit-mail', 'mona+9000@cloudypedia.net');
   await page.fill('id=edit-name', 'mona9000');
   await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
   await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
   // Check Authenticated User
   await page.waitForSelector('id=edit-roles-authenticated'); 
   await expect(page.locator('id=edit-roles-authenticated')).toBeVisible();
   await expect(page.locator('id=edit-roles-authenticated')).toBeDisabled();
   // Check Content Editor 
   await page.waitForSelector('id=edit-roles-content-editor'); // Wait First
   await page.check('id=edit-roles-content-editor'); // Then Check 
   // Submit form
   await page.waitForTimeout(3000);
   await page.click("//input[@id='edit-submit']");
   await expect(page.locator("//div[@role='status']")).toContainText('Created a new user account for');
   //await page.waitForTimeout(60000);
   //Get Message successfully by detailes Diynamiclly 
   const href= await page.locator("//div[@class='messages__content']//a").getAttribute('href');
   console .log('Href:',href)
   createdUserId = href?.split('/').pop(); // Will give 'Number'
   console.log('User ID:', createdUserId);
   const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
   await expect (page.locator('div.messages__content')).toBeVisible();
  });

  // Edit UserName and Email  Scenarios
  test('Update UserName and Email From URL_2', async ({ page }) => {

  // Make sure it's available
   if (!createdUserId) {
  throw new Error('User ID not available from previous test!');
  }
   expect(createdUserId).toBeDefined();
   console.log(`Navigated to user profile with ID: ${createdUserId}`);
   await page.goto(`${baseURL}/user/${createdUserId}/edit`);
   console.log(`Navigated to edit page of user ID: ${createdUserId}`);
   await expect(page).toHaveURL(/\/edit$/);
  // Fill Form 
    await page.fill('id=edit-mail', 'mona+10000@cloudypedia.net');
    await page.fill('id=edit-name', 'mona10000');
    await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
    await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
    page.click('input#edit-submit');
   //await expect(page.locator("//div[@role='status']")).toContainText('The changes have been saved.');
   const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
   await expect (page.locator('div.messages__content')).toBeVisible();
 });   


 //Third Test Case
 test('Edit All Data From Button Edit Content-EditorRole_3', async ({ page }) => {
  
  //await page.goto('http://localhost:8080/$href');
  // Navigate to Pepole Page
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  // Navigate  to Edit-user by Press Button Edit
  await page.locator("//a[@aria-label='Edit mona10000']").click();

   // Edit in form
   await page.fill('id=edit-mail', 'mona+20000@cloudypedia.net');
   await page.fill('id=edit-name', 'mona20000');
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
   await expect(page.locator("//div[@role='status']")).toContainText('The changes have been saved.');

   const messageText = await page.locator('div.messages__content').textContent();
   console.log('Content Message is:',messageText);
   await expect (page.locator("//div[@class='messages__content']")).toBeVisible();
   
 });
 //Four Test Case
 test('Edit All Data From UserLink Content-EditorRole_4', async ({ page }) => {
  
  // Navigate to Pepole Page
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  // Navigate  to Edit-user by Press Link User Name  
  await page.locator("//a[normalize-space()='mona20000']").click();
  await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
  await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona+30000@cloudypedia.net');
   await page.fill('id=edit-name', 'mona30000');
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
   //await expect(page.locator("//div[@role='status']")).toContainText('The changes have been saved.');

   const messageText = await page.locator('div.messages__content').textContent();
   console.log('Content Message is:',messageText);
   await expect (page.locator("//div[@class='messages__content']")).toBeVisible();
   
 });
 // Verifiy Edit  with Empty Mail Test Case
 test('Verifiy Edit  with Empty Mail_5', async ({ page }) => {
  
  // Navigate to Pepole Page
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  // Navigate  to Edit-user by Press Link User Name  
  await page.locator("//a[normalize-space()='mona30000']").click();
  await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
  await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', '');
   await page.fill('id=edit-name', 'mona40000');
   await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
   await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
   // Submit form
   await page.waitForTimeout(3000);
   await page.click("//input[@id='edit-submit']");
   //Get Message successfully 
   //await expect(page.locator("//div[@role='status']")).toContainText('The changes have been saved.');
   //const messageText = await page.locator('div.messages__content').textContent();
   //console.log('Content Message is:',messageText);
   //await expect (page.locator("//div[@class='messages__content']")).toBeVisible();
  
   // Alert  Message  Data required to fill 
     const isValid = await page.locator('id=edit-name').evaluate((input) => input.checkValidity());

     if (!isValid) {
      console.log('Field is invalid');
      console.log('please fill out this field');
     }
 });
 // Verifiy Edit  with Invaild  Mail Test Case
 test(' Edit  with Invaild  Mail_5', async ({ page }) => {
  
  // Navigate to Pepole Page
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  // Navigate  to Edit-user by Press Link User Name  
  await page.locator("//a[normalize-space()='mona30000']").click();
  await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
  await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona20000@cloudypedia');
   await page.fill('id=edit-name', 'mona20000');
   await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
   await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
   // Submit form
   await page.waitForTimeout(3000);
   await page.click("//input[@id='edit-submit']");
   //Get Message successfully 
   //await expect(page.locator("//div[@role='status']")).toContainText('The changes have been saved.');
   //const messageText = await page.locator('div.messages__content').textContent();
   //console.log('Content Message is:',messageText);
   //await expect (page.locator("//div[@class='messages__content']")).toBeVisible();
   
   // Get Error  Message  
    await expect(page.locator("//div[@class='messages__header']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText(' This value is not a valid email address');
 });

 // Verifiy Edit  with Invaild  Mail without @ Test Case
 test(' Show Error for  Email format without @', async ({ page }) => {
  // Navigate to Pepole Page
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  // Navigate  to Edit-user by Press Link User Name  
  await page.locator("//a[normalize-space()='mona30000']").click();
  await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
  await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona20000cloudypedia');
   await page.fill('id=edit-name', 'mona20000');
   await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
   await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
   // Submit form
   await page.waitForTimeout(3000);
   await page.click("//input[@id='edit-submit']");
   // Alert  Message  Data Format required to fill
     const isValid = await page.locator('id=edit-mail').evaluate((input) => input.checkValidity());

     if (!isValid) {
      console.log('Field is invalid Format Email');
      //console.log('please include an '@');
     }
 });
  // Verifiy Edit  with passwords do not match Test Case
 test(' Show Error when passwords do not match', async ({ page }) => {
  // Navigate to Pepole Page
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  // Navigate  to Edit-user by Press Link User Name  
  await page.locator("//a[normalize-space()='mona30000']").click();
  await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
  await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona+770000@cloudypedia.net');
   await page.fill('id=edit-name', 'mona770000');
   await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
   await page.fill('id=edit-pass-pass2', 'monaqc123*Tes');
   // Submit form
   await page.waitForTimeout(3000);
   await page.click("//input[@id='edit-submit']");
   // Error  Message  
     await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText(' The specified passwords do not match.');

 });
// Verifiy Edit  with passwords Number only Test Case
 test('Show Error for weak password Number only', async ({ page }) => {
  // Navigate to Pepole Page
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  // Navigate  to Edit-user by Press Link User Name  
  await page.locator("//a[normalize-space()='mona770000']").click();
  await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
  await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona+880000@cloudypedia.net');
   await page.fill('id=edit-name', 'mona880000');
   await page.fill('id=edit-pass-pass1', '123456789');
   await page.fill('id=edit-pass-pass2', '123456789');
   // Alert  Message  Data required weak or strong 
     await expect(page.locator("//div[@class='password-strength__title']")).toContainText('Password strength: ');
     await expect (page.locator('text=Weak')).toBeVisible();
     await expect (page.locator('text=Weak')).toContainText('Weak');
     console.log('Password strength:Weak','Now, display this command and save it successfully ');
     console.log('Error message appears:The password doesn’t meet the minimum security requirements','كلمة المرور لا تستوفي الحد الأدنى من المتطلبات الامنية');
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
 // Verifiy Edit  with passwords Less Than 8 Test Case
 test('Show Error for weak password Less Than 8 charcter', async ({ page }) => {
  // Navigate to Pepole Page
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  // Navigate  to Edit-user by Press Link User Name  
  await page.locator("//a[normalize-space()='mona880000']").click();
  await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
  await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona+990000@cloudypedia.net');
   await page.fill('id=edit-name', 'mona990000');
   await page.fill('id=edit-pass-pass1', '1234567');
   await page.fill('id=edit-pass-pass2', '1234567');
   // Alert  Message  Data required weak or strong 
     await expect(page.locator("//div[@class='password-strength__title']")).toContainText('Password strength: ');
     await expect (page.locator('text=Weak')).toBeVisible();
     await expect (page.locator('text=Weak')).toContainText('Weak');
     console.log('Password strength:Weak','Now, display this command and save it successfully ');
     console.log('Error message appears:The password doesn’t meet the minimum security requirements','كلمة المرور لا تستوفي الحد الأدنى من المتطلبات الامنية');
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

 // Validate Password not containing lowercase Test Case
 test('Validate Password not containing lowercase', async ({ page }) => {
   // Navigate to Pepole Page
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Navigate  to Edit-user by Press Link User Name  
   await page.locator("//a[normalize-space()='mona990000']").click();
   await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
   await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona+980000@cloudypedia.net');
   await page.fill('id=edit-name', 'mona980000');
   await page.fill('id=edit-pass-pass1', 'MONAQC');
   await page.fill('id=edit-pass-pass2', 'MONAQC');
   // Alert  Message  Data required weak or strong 
     await expect(page.locator("//div[@class='password-strength__title']")).toContainText('Password strength: ');
     await expect (page.locator('text=Weak')).toBeVisible();
     await expect (page.locator('text=Weak')).toContainText('Weak');
     console.log('Password strength:Weak','Now, display this command and save it successfully ');
     console.log('Error message appears:The password doesn’t meet the minimum security requirements','كلمة المرور لا تستوفي الحد الأدنى من المتطلبات الامنية');
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

  // Validate Password not containing Uppercase Test Case
  test('Validate Password not containing Uppercase', async ({ page }) => {
   // Navigate to Pepole Page
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Navigate  to Edit-user by Press Link User Name  
   await page.locator("//a[normalize-space()='mona980000']").click();
   await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
   await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona+970000@cloudypedia.net');
   await page.fill('id=edit-name', 'mona970000');
   await page.fill('id=edit-pass-pass1', 'monaqc1234567');
   await page.fill('id=edit-pass-pass2', '1234567monaqc1234567');
   // Alert  Message  Data required weak or strong 
     await expect(page.locator("//div[@class='password-strength__title']")).toContainText('Password strength: ');
     await expect (page.locator('text=Weak')).toBeVisible();
     await expect (page.locator('text=Weak')).toContainText('Weak');
     console.log('Password strength:Weak','Now, display this command and save it successfully ');
     console.log('Error message appears:The password doesn’t meet the minimum security requirements','كلمة المرور لا تستوفي الحد الأدنى من المتطلبات الامنية');
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
 // Validate Password not containing Number Test Case
  test('Validate Password not containing Number', async ({ page }) => {
   // Navigate to Pepole Page
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Navigate  to Edit-user by Press Link User Name  
   await page.locator("//a[normalize-space()='mona970000']").click();
   await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
   await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona+960000@cloudypedia.net');
   await page.fill('id=edit-name', 'mona960000');
   await page.fill('id=edit-pass-pass1', 'monaQc');
   await page.fill('id=edit-pass-pass2', 'monaQc');
   // Alert  Message  Data required weak or strong 
     await expect(page.locator("//div[@class='password-strength__title']")).toContainText('Password strength: ');
     await expect (page.locator('text=Weak')).toBeVisible();
     await expect (page.locator('text=Weak')).toContainText('Weak');
     console.log('Password strength:Weak','Now, display this command and save it successfully ');
     console.log('Error message appears:The password doesn’t meet the minimum security requirements','كلمة المرور لا تستوفي الحد الأدنى من المتطلبات الامنية');
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
   // Validate Password not containing Special Character Test Case
   test('Validate Password not containing Special Character', async ({ page }) => {
   // Navigate to Pepole Page
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Navigate  to Edit-user by Press Link User Name  
   await page.locator("//a[normalize-space()='mona960000']").click();
   await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
   await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona+950000@cloudypedia.net');
   await page.fill('id=edit-name', 'mona950000');
   await page.fill('id=edit-pass-pass1', 'monaQc12');
   await page.fill('id=edit-pass-pass2', 'monaQc12');
   // Alert  Message  Data required weak or strong 
     await expect(page.locator("//div[@class='password-strength__title']")).toContainText('Password strength: ');
     await expect (page.locator('text=Weak')).toBeVisible();
     await expect (page.locator('text=Weak')).toContainText('Weak');
     console.log('Password strength:Weak','Now, display this command and save it successfully ');
     console.log('Error message appears:The password doesn’t meet the minimum security requirements','كلمة المرور لا تستوفي الحد الأدنى من المتطلبات الامنية');
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
 
    // Validate UserName containing Number Only and password weak Test Case
   test('Validate UserName containing Number Only and password weak', async ({ page }) => {
   // Navigate to Pepole Page
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Navigate  to Edit-user by Press Link User Name  
   await page.locator("//a[normalize-space()='mona950000']").click();
   await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
   await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona+940000@cloudypedia.net');
   await page.fill('id=edit-name', '13111977');
   await page.fill('id=edit-pass-pass1', 'Test1234');
   await page.fill('id=edit-pass-pass2', 'Test1234');
   // Alert  Message  Data required weak or strong 
     await expect(page.locator("//div[@class='password-strength__title']")).toContainText('Password strength: ');
     await expect (page.locator('text=Weak')).toBeVisible();
     await expect (page.locator('text=Weak')).toContainText('Weak');
     console.log('Password strength:Weak','Now, display this command and save it successfully ');
     console.log('Error message appears:The password doesn’t meet the minimum security requirements','كلمة المرور لا تستوفي الحد الأدنى من المتطلبات الامنية');
     console.log('display message appears:Invalid User Name','اسم المستخدم غير صحيح يجب ان يكون حروف');
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

  // Show Error if username and Mail already exists Test Case
   test('Show Error if username and Mail already exists', async ({ page }) => {
   // Navigate to Pepole Page
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Navigate  to Edit-user by Press Link User Name  
   await page.locator("//a[normalize-space()='mona940000']").click();
   await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
   await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona@cloudypedia.net');
   await page.fill('id=edit-name', 'mona1');
   await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
   await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
   
   await page.click("//input[@id='edit-submit']");
   await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
   await expect(page.locator("//li[contains(text(),'The username')]")).toContainText(' The username mona1 is already taken.');
   await expect(page.locator("//em[normalize-space()='mona1']")).toContainText(' mona1 ');
   await expect(page.locator("//li[contains(text(),'The email address')]")).toContainText('The email address mona@cloudypedia.net is already taken.');
   await expect(page.locator("//em[normalize-space()='mona@cloudypedia.net']")).toContainText(' mona@cloudypedia.net ');
     
 });
 // Show Error if username already exists Test Case
   test('Show Error if username already exists', async ({ page }) => {
   // Navigate to Pepole Page
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Navigate  to Edit-user by Press Link User Name  
   await page.locator("//a[normalize-space()='mona940000']").click();
   await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
   await page.locator("//a[normalize-space()='Edit']").click();
   // Edit in form
   await page.fill('id=edit-mail', 'mona252525@cloudypedia.net');
   await page.fill('id=edit-name', 'mona2');
   await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
   await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
   await page.click("//input[@id='edit-submit']");
   await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
   await expect(page.locator("//div[@class='messages__content']")).toContainText(' The username mona2 is already taken.');
   await expect(page.locator("//em[normalize-space()='mona2']")).toContainText(' mona2 ');
     
 });
 //username has special characters
 test('Show Error if username has special characters_17 ', async ({ page }) => {
    
 // Navigate to Pepole Page
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Navigate  to Edit-user by Press Link User Name  
   await page.locator("//a[normalize-space()='mona940000']").click();
   await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
   await page.locator("//a[normalize-space()='Edit']").click();
  
     // Fill in form
     await page.fill('id=edit-mail', 'mona+2525@cloudypedia.net');
     await page.fill('id=edit-name', 'mona*');
     await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
     await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
     await page.click("//input[@id='edit-submit']");

     await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText('The username contains an illegal character.');
     await expect(page.locator("//em[normalize-space()='mona2']")).toContainText(' mona2 ');
     
    });
  //EMail already exists
    test('Show Error if EMail already exists_18', async ({ page }) => {
    // Navigate  to Edit-user by Press Link User Name  
     await page.locator("//a[normalize-space()='mona940000']").click();
     await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
     await page.locator("//a[normalize-space()='Edit']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+2@cloudypedia.net');
     await page.fill('id=edit-name', 'mona3535');
     await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
     await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
     await page.click("//input[@id='edit-submit']");
     await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText('The email address mona+2@cloudypedia.net is already taken.');
     await expect(page.locator("//em[normalize-space()='mona+2@cloudypedia.net']")).toContainText(' mona+2@cloudypedia.net ');

    });
   test('Show Error if username have space_19 ', async ({ page }) => {
    // Navigate  to Edit-user by Press Link User Name  
     await page.locator("//a[normalize-space()='mona940000']").click();
     await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
     await page.locator("//a[normalize-space()='Edit']").click();

     // Fill in form
     await page.fill('id=edit-mail', 'mona+6969@cloudypedia.net');
     await page.fill('id=edit-name', '  mona6969');
     await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
     await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
     await page.click("//input[@id='edit-submit']");
     await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText(' The username cannot begin with a space.');
     
    });
    //Edit-user by Password have spac
    test('Show Error if Password have space_20 ', async ({ page }) => {
         // Navigate  to Edit-user by Press Link User Name  
     await page.locator("//a[normalize-space()='mona940000']").click();
     await expect(page.locator("//a[normalize-space()='View']")).toBeVisible();
     await page.locator("//a[normalize-space()='Edit']").click();

     // Fill in form
     await page.fill('id=edit-mail', 'mona+6969@cloudypedia.net');
     await page.fill('id=edit-name', '  mona6969');
     await page.fill('id=edit-pass-pass1', '       ');
     await page.fill('id=edit-pass-pass2', '       ');
     await page.click("//input[@id='edit-submit']");
     await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText('Password field is required.');
     
    });

  //Unauthorized user attempts to edit
   test('Unauthorized user attempts to edit_5', async ({ page }) => {
   //await page.goto(`${baseURL}/user/logout`);
   await page.click("//a[@class='secondary-nav__menu-link secondary-nav__menu-link--link secondary-nav__menu-link--level-1'][normalize-space()='Log out']");
   await page.goto(`${baseURL}/user/${userId}/edit`);
   await expect(page.locator('body')).toContainText('You are not authorized');
   const Message = await page.locator("//div[contains(text(),'You are not authorized to access this page.')]").textContent();
   console.log('Content Message is:',Message);
   //await page.click("//span[@class='primary-nav__menu-link-inner primary-nav__menu-link-inner--level-1']");
  });
 
 // Delete Scenarios
 test(' Cancel the selected user account From People List_11 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
   //await page.check('id=edit-user-bulk-form-1');

   // Add the Content editor role to the selected user(s)
    await page.locator('id=edit-action').selectOption('Cancel the selected user account(s)'); 
    page.click('input#edit-submit');
    await expect(page.locator("//h1[contains(text(),'Are you sure you want to cancel these user account')]")).toContainText('Are you sure you want to cancel these user accounts?');
    await page.locator("//label[contains(text(),'Delete the account and its content. This action ca')]").check();
    await page.check('id=edit-user-cancel-confirm')
    await page.click("//input[@id='edit-submit']");
    await expect(page.locator("//div[@role='status']")).toContainText(' has been deleted.');
    const message=await page.locator("//div[@role='status']").textContent();
    console.log(message);
    //Get 2 Massages succssess After Delete 
    //await expect(page.locator("//div[@class='messages__wrapper']")).toContainText(' has been deleted.');
    //const message2=await page.locator("//div[@class='messages__wrapper']").textContent();
    //console.log(message2);
    await expect(page.locator("//body")).toBeVisible();
    });
    
    
