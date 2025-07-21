
const { test, expect } = require('@playwright/test');
const fs = require('fs');
require('dotenv').config();

const baseURL = process.env.BASE_URL || 'http://localhost:8085/';
// Load users from JSON file
const Apps = JSON.parse(fs.readFileSync('tests/data/appsData.json', 'utf-8'));

async function login(page) {
  await page.goto(`${baseURL}/user/login`);
  await page.fill('input[name="name"]', process.env.DRUPAL_USERNAME);
  await page.fill('input[name="pass"]', process.env.DRUPAL_PASSWORD);
  await page.click("//form[@id='user-login-form']//input[@id='edit-submit']");
}

test.beforeEach(async ({ page }) => {
  await login(page);
});
test.setTimeout(60000);

test.describe('Add Apps - Positive & Negative Scenarios', () => {

   
   
  // The first test
 test('Homepage_1', async ({ page }) => {
  //await page.locator("//div[@class='site-branding__name']").click();
  await expect(page).toHaveTitle('admin  | Fresh Docker KickStart');
  //const title = await page.locator("//title[normalize-space()='admin  | Fresh Docker KickStart']").textContent();
  //console.log(title);
  //await expect(page.locator("//a[normalize-space()='My account']")).toBeVisible({ label:'My account' });
  await page.waitForTimeout(3000);

 });
 // The Second test
 test('Add Apps with valid Data_2', async ({ page }) => {
  // Navigate to Add Apps
  
  //await page.goto(`${baseURL}/user/1/apps`);
  
  await page.locator('a.nav-link[href="/user/apps"]').click();//Using href^="/user/apps" allows dynamic token support.
  //await page.getByRole('link', { name: 'Apps' }).click();//By text:
  //await page.locator('//a[normalize-space()="Apps"]').click();//XPath (less preferred, but possible):
  await expect(page).toHaveTitle('Apps | Fresh Docker KickStart');
  await page.locator("//a[normalize-space()='Add app']").click();
  // Fill in form
  //await page.fill('id=edit-displayname-0-value', Apps.appName);
  //await page.fill('id=edit-callbackurl-0-value', Apps.callbackUrl);
  //await page.getByLabel('Description').click();
  //await page.fill('id=edit-description-0-value', Apps.description);
    //////////// test code
  await page.fill('id=edit-displayname-0-value', Apps.appName);
  await page.fill('id=edit-callbackurl-0-value', Apps.callbackUrl);
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill(Apps.description);


   // Select APIs
  for (const api of Apps.apis) {
    await page.check(`text=${api}`);
  }
  
  // Submit form
   await page.waitForTimeout(3000);
   await page.click("//input[@id='edit-actions-submit']");
  // await page.getByRole('button', { name: 'Add app' }).click();

   //Get Message successfully by detailes Diynamiclly 
   const messageText = await page.locator("//div[@role='alert']").textContent();
   console.log(messageText);
   await expect (page.locator("//div[@role='alert']")).toBeVisible();

  if (user.expected.success) {
      // Success case
      await expect(page.locator("//div[@role='alert']")).toBeVisible();
      const messageText = await page.locator("//div[@role='alert']").textContent();
      console.log(`✅ ${messageText}`);
    } else {
      // Failure case
      const errorContent = page.locator("//div[@role='alert']");
      //await expect(errorContent).toContainText(user.expected.errorMessage);
      const errorText = await errorContent.textContent();
      console.log(`❌ failed:`, errorText);
    }

 });

 /*
// Delete Scenarios
  test(' Delete user account From People_3 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
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
    await expect(page.locator("//body")).toBeVisible();
    });

 test('Add User as Administrator with valid Data_4', async ({ page }) => {
  // Navigate to add-user
  await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  await expect(page).toHaveTitle('People | Drupal Site');
  await page.locator("//a[normalize-space()='Add user']").click();

  // Fill in form
  await page.fill('id=edit-mail', 'mona+31@cloudypedia.net');
  await page.fill('id=edit-name', 'mona31');
  await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
  await page.fill('id=edit-pass-pass2', 'monaqc123*Test');

  // Check roles
  // Check Authenticated User
  await page.waitForSelector('id=edit-roles-authenticated'); 
  await expect(page.locator('id=edit-roles-authenticated')).toBeVisible();
  await expect(page.locator('id=edit-roles-authenticated')).toBeDisabled();
  // Check Administrator
   await page.waitForSelector('id=edit-roles-administrator'); // Wait First
   await page.check('id=edit-roles-administrator'); // Then Check

  // Submit form
   await page.waitForTimeout(3000);
   await page.click("//input[@id='edit-submit']");
  // console.log('New user successfully added');
  // await expect(page.locator("//div[@class='messages__content']")).toContainText('Created a new user account for mona31. No email has been sent');
   //Get Message successfully by detailes Diynamiclly 
   const href= await page.locator("//div[@class='messages__content']//a").getAttribute('href');
   console .log('Href:',href)
   const userId = href?.split('/').pop(); // Will give 'Number'
   console.log('User ID:', userId);
   const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
   await expect (page.locator('div.messages__content')).toBeVisible();
    
   });
   // Delete User
    test(' Remove user account From People_5', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
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
    await expect(page.locator("//body")).toBeVisible();
    });

  test('Show Error when User Name is empty_6', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+55@cloudypedia.net');
     // await page.fill('id=edit-name', 'mona4');
     await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
     await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
     await page.click("//input[@id='edit-submit']");

     // Alert  Message  Data required to fill 
     const isValid = await page.locator('id=edit-name').evaluate((input) => input.checkValidity());

     if (!isValid) {
      console.log('Field is invalid');
      console.log('please fill out this field');
     }

    });
 
    test('Show Error for invalid email format_7', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+1977@cloudypedia');
     await page.fill('id=edit-name', 'mona6');
     await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
     await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
     await page.click("//input[@id='edit-submit']");

     await expect(page.locator("//div[@class='messages__header']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText(' This value is not a valid email address');

    });
    test('Show Error for  Email format without @_8', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+1977cloudypedia');
     await page.fill('id=edit-name', 'mona1977');
     await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
     await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
     await page.click("//input[@id='edit-submit']");

     // Alert  Message  Data Format required to fill
     const isValid = await page.locator('id=edit-mail').evaluate((input) => input.checkValidity());

     if (!isValid) {
      console.log('Field is invalid Format Email');
      //console.log('please include an '@');
     }

    });
 
    test('Show Error when passwords do not match_8', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+1111@cloudypedia.net');
     await page.fill('id=edit-name', 'mona1111');
     await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
     await page.fill('id=edit-pass-pass2', 'monaqc123*Tester');
     await page.click("//input[@id='edit-submit']");
     // Error  Message  
     await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText(' The specified passwords do not match.');
    });

    test('Show Error for weak password Number only_9', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+202@cloudypedia.net');
     await page.fill('id=edit-name', 'mona202');
     await page.fill('id=edit-pass-pass1', '12345');
     await page.fill('id=edit-pass-pass2', '12345');
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
    // Cancel Delete Scenarios
   test(' CancelDelete  the selected user account From People List_10 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
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
    await expect(page.locator("//body")).toBeVisible();
    });

    test('Show Error for weak password Less Than 8 charcter_11', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+202@cloudypedia.net');
     await page.fill('id=edit-name', 'mona202');
     await page.fill('id=edit-pass-pass1', 'Admin1');
     await page.fill('id=edit-pass-pass2', 'Admin1');
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
    // Delete Scenarios
   test(' Delete the selected user account From People List_12', async ({ page }) => {
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
    await expect(page.locator("//div[@role='status']")).toContainText(' has been deleted.');
    const message=await page.locator("//div[@role='status']").textContent();
    console.log(message);
    //Get 2 Massages succssess After Delete 
    await expect(page.locator("//div[@class='messages__wrapper']")).toContainText(' has been deleted.');
    const message2=await page.locator("//div[@class='messages__wrapper']").textContent();
    console.log(message2);
    await expect(page.locator("//body")).toBeVisible();
    });

    test (' Validate Password not containing lowercase_13', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+202@cloudypedia.net');
     await page.fill('id=edit-name', 'mona202');
     await page.fill('id=edit-pass-pass1', 'ADMIN123*');
     await page.fill('id=edit-pass-pass2', 'ADMIN123*');
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
    // Delete Scenarios
   test(' Cancel the selected user account From People List_14 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
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
    await expect(page.locator("//body")).toBeVisible();
    });

    test (' Validate Password not containing Uppercase_15', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+202@cloudypedia.net');
     await page.fill('id=edit-name', 'mona202');
     await page.fill('id=edit-pass-pass1', 'admin123*');
     await page.fill('id=edit-pass-pass2', 'admin123*');
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
    // Delete Scenarios
   test(' Delet the selected user account _16 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
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
    await expect(page.locator("//body")).toBeVisible();
    });

    test (' Validate Password not containing Numbers_17', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+202@cloudypedia.net');
     await page.fill('id=edit-name', 'mona202');
     await page.fill('id=edit-pass-pass1', 'TestingQC');
     await page.fill('id=edit-pass-pass2', 'TestingQC');
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
    // Delete Scenarios
    test(' Delete Cancel the selected user account From People List_18 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
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
    await expect(page.locator("//body")).toBeVisible();
    });

    test (' Validate Password not containing Special Character_19', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+202@cloudypedia.net');
     await page.fill('id=edit-name', 'mona202');
     await page.fill('id=edit-pass-pass1', 'Test1234');
     await page.fill('id=edit-pass-pass2', 'Test1234');
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
    // Delete Scenarios
   test(' Cancel the selected user account From People List_20 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
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
    await expect(page.locator("//body")).toBeVisible();
    });

    test (' Validate UserName containing Number Only and password weak_21', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+202@cloudypedia.net');
     await page.fill('id=edit-name', '12345');
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
 // Delete Scenarios
  test(' Cancel the selected user account From People List_22 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
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
    await expect(page.locator("//body")).toBeVisible();
    });

    test('Show Error if username and Mail already exists_23', async ({ page }) => {
    await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
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
    test('Show Error if username already exists_24', async ({ page }) => {
    await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+2525@cloudypedia.net');
     await page.fill('id=edit-name', 'mona2');
     await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
     await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
     await page.click("//input[@id='edit-submit']");

     await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText(' The username mona2 is already taken.');
     await expect(page.locator("//em[normalize-space()='mona2']")).toContainText(' mona2 ');
     
    });
    test('Show Error if username has special characters_25 ', async ({ page }) => {
    await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
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
  
    test('Show Error if EMail already exists_26', async ({ page }) => {
    await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
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
    test('Show Error if username have space_27 ', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+6969@cloudypedia.net');
     await page.fill('id=edit-name', '  mona6969');
     await page.fill('id=edit-pass-pass1', 'monaqc123*Test');
     await page.fill('id=edit-pass-pass2', 'monaqc123*Test');
     await page.click("//input[@id='edit-submit']");
     await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText(' The username cannot begin with a space.');
     
    });
    test('Show Error if Password have space_28 ', async ({ page }) => {
     await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
     await page.locator("//a[normalize-space()='Add user']").click();
     // Fill in form
     await page.fill('id=edit-mail', 'mona+6969@cloudypedia.net');
     await page.fill('id=edit-name', '  mona6969');
     await page.fill('id=edit-pass-pass1', '       ');
     await page.fill('id=edit-pass-pass2', '       ');
     await page.click("//input[@id='edit-submit']");
     await expect(page.locator("//h2[@id='message-error-title']")).toContainText('Error message');
     await expect(page.locator("//div[@class='messages__content']")).toContainText('Password field is required.');
     
    });*/

});