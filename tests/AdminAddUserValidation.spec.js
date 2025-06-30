
const { test, expect } = require('@playwright/test');
const fs = require('fs');

test.describe('Add User - Positive & Negative Scenarios', () => {

  //const baseURL = 'http://localhost:8080/'; // Replace with actual app URL
  //const registrationPath = 'http://localhost:8080/admin/people/create';    // Adjust if needed

  test.beforeEach(async ({ page }) => {
    // Go to the specified URL
    //await page.goto(`${baseURL}${registrationPath}`);
    await page.goto('http://localhost:8080/');
    await expect(page).toHaveTitle('Home | Drupal Site');
    // Perform login
     await page.click('a[href="/user/login"]');
     await page.fill('id=edit-name', 'admin');
     await page.fill('id=edit-pass', 'admin');
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
  // The first test
 test('Homepage_1', async ({ page }) => {
  await page.locator("//div[@class='site-branding__name']").click();
  await expect(page).toHaveTitle('Home | Drupal Site');
  await expect(page.locator("//a[normalize-space()='My account']")).toBeVisible({ label:'My account' });
 });
 // The Second test
 test('Add User as Content Editor with valid Data_2', async ({ page }) => {
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
  // Check Content Editor 
  await page.waitForSelector('id=edit-roles-content-editor'); // Wait First
  await page.check('id=edit-roles-content-editor'); // Then Check 

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
 test('Add User as Administrator with valid Data_3', async ({ page }) => {
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
  test('Show Error when User Name is empty_4', async ({ page }) => {
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
 
    test('Show Error for invalid email format_5', async ({ page }) => {
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
    test('Show Error for  Email format without @_6', async ({ page }) => {
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
 
    test('Show Error when passwords do not match_7', async ({ page }) => {
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

    test('Show Error for weak password Number only_8', async ({ page }) => {
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
    test('Show Error for weak password Less Than 8 charcter_9', async ({ page }) => {
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
    test (' Validate Password not containing lowercase_10', async ({ page }) => {
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
    test (' Validate Password not containing Uppercase_11', async ({ page }) => {
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
    test (' Validate Password not containing Numbers_12', async ({ page }) => {
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
    test (' Validate Password not containing Special Character_13', async ({ page }) => {
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
    test (' Validate UserName containing Number Only and password weak_14', async ({ page }) => {
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

    test('Show Error if username and Mail already exists_15', async ({ page }) => {
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
    test('Show Error if username already exists_16', async ({ page }) => {
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
    test('Show Error if username has special characters_17 ', async ({ page }) => {
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
  
    test('Show Error if EMail already exists_18', async ({ page }) => {
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
    test('Show Error if username have space_19 ', async ({ page }) => {
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
    test('Show Error if Password have space_20 ', async ({ page }) => {
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
     
    });

});
