
const { test, expect } = require('@playwright/test');
require('dotenv').config();

const baseURL = process.env.BASE_URL || 'http://localhost:8080';
//const validPic = 'tests/assets/validEsoo.jpg';
//const invalidPic = 'tests/assets/invalid.bmp';
const userId = 40;
const invaliduserId = 99999;

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

/*
// Edit Scenarios
test('Update UserName and Email', async ({ page }) => {
  await page.goto(`${baseURL}/user/${userId}/edit`);
  // Fill Form 
    await page.fill('id=edit-mail', user.email);
    await page.fill('id=edit-name', user.username);
    await page.fill('id=edit-pass-pass1', user.password);
    await page.fill('id=edit-pass-pass2', user.password);
    page.click('input#edit-submit');
  await expect(page.locator('.messages--status')).toContainText('has been updated');
});
*/
// Block User Scenarios From Inside Edit Form

test('Block User Inside Edit Form_1 ', async ({ page }) => {
  await page.goto(`${baseURL}/user/${userId}/edit`);
   // Check user Activation 
   await expect(page.locator('id=edit-status-1')).toBeChecked();
   // Convert  To Block User 
   await page.check('id=edit-status-0'); //  Check
    page.click('input#edit-submit');
    await expect(page.locator("//div[@role='status']")).toContainText('The changes have been saved.');
    const message = await page.locator('div.messages__content').textContent();
    console.log(message);
});
// UnBlock User Scenarios From Inside Edit Form
test('UnBlock User Inside Edit Form_2 ', async ({ page }) => {
  await page.goto(`${baseURL}/user/${userId}/edit`);

   // Check user Block 
   await expect (page.locator('id=edit-status-0')).toBeChecked();
   // Convert  To Active User 
   await page.check('id=edit-status-1'); //  Check

    page.click('input#edit-submit');
    await expect(page.locator("//div[@role='alert']")).toContainText('Unable to send email. Contact the site administrator if the problem persists.');
    const Alert = await page.locator("//div[@role='alert']").textContent();
    console .log(Alert);
    await expect(page.locator("//div[@role='status']")).toContainText('The changes have been saved.');
    const Status = await page.locator("//div[@role='status']").textContent();
    console.log(Status);

});
// Block User Scenarios From People List 
test('Block User From People List_3 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
   // Convert  To Block User 
    await page.locator('id=edit-action').selectOption('Block the selected user(s)');//  select block user from list 
    page.click('input#edit-submit');
    await expect(page.locator("//div[@role='status']")).toContainText('Block the selected user(s) was applied to 1 item.');
    const message = await page.locator("//div[@role='status']").textContent();
    console.log(message);
});
// UnBlock User Scenarios From People List 
test('UnBlock User From People List_4 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
   // Convert  To UnBlock User 
    await page.locator('id=edit-action').selectOption('Unblock the selected user(s)');//  select block user from list 
    page.click('input#edit-submit');
    await expect(page.locator("//div[@role='alert']")).toContainText('Unable to send email. Contact the site administrator if the problem persists.');
    const Alert = await page.locator("//div[@role='alert']").textContent();
    console .log(Alert);
    await expect(page.locator("//div[@role='status']")).toContainText('Unblock the selected user(s) was applied to 1 item.');
    const message = await page.locator("//div[@role='status']").textContent();
    console.log(message);
});
//  Add the Administrator role to the selected user  From People List 
test('Add the Administrator role to the selected user From People List_5 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
   //  Add the Administrator role to the selected user
    await page.locator('id=edit-action').selectOption('Add the Administrator role to the selected user(s)');
    page.click('input#edit-submit');
    await expect(page.locator("//div[@role='status']")).toContainText('Add the Administrator role to the selected user(s) was applied to 1 item.');
    const message = await page.locator("//div[@role='status']").textContent();
    console.log(message);
});
//  Remove the Administrator role to the selected user  From People List 
test('Remove the Administrator role from the selected user From People List_6 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
   //  Add the Administrator role to the selected user
    await page.locator('id=edit-action').selectOption('Remove the Administrator role from the selected user(s)');
    page.click('input#edit-submit');
    await expect(page.locator("//div[@role='status']")).toContainText('Remove the Administrator role from the selected user(s) was applied to 1 item.');
    const message = await page.locator("//div[@role='status']").textContent();
    console.log(message);
});
//  Add the Content role to the selected user  From People List 
test('Add the Content editor role to the selected user From People List_7 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
   // Add the Content editor role to the selected user(s)
    await page.locator('id=edit-action').selectOption('Add the Content editor role to the selected user(s)'); 
    page.click('input#edit-submit');
    await expect(page.locator("//div[@role='status']")).toContainText('Add the Content editor role to the selected user(s) was applied to 1 item.');
    const message = await page.locator("//div[@role='status']").textContent();
    console.log(message);
});
//  remove the Content role to the selected user  From People List 
test('Remove the Content editor role to the selected user From People List_8 ', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
   // Add the Content editor role to the selected user(s)
    await page.locator('id=edit-action').selectOption('Remove the Content editor role from the selected user(s)'); 
    page.click('input#edit-submit');
    await expect(page.locator("//div[@role='status']")).toContainText('Remove the Content editor role from the selected user(s) was applied to 1 item.');
    const message = await page.locator("//div[@role='status']").textContent();
    console.log(message);
});
//  check if click button Apply to selected user without choose Action  From People List 
 test(' Click button Apply to selected user without choose Action _9', async ({ page }) => {
   // Go To People List Page 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
   // Checked user Activation From List 
   await page.check('id=edit-user-bulk-form-0');
   // Add the Content editor role to the selected user(s)
   // await page.locator('id=edit-action').selectOption('Remove the Content editor role from the selected user(s)'); 
    page.click('input#edit-submit');
    await expect(page.locator("//div[@role='contentinfo']")).toContainText(' No Action option selected.');
    const message = await page.locator("//div[@role='contentinfo']").textContent();
    console.log(message);
});
//  Cancel Cancel the selected user account(s)  From People List 
test('Cancel Cancel the selected user account From People List_10 ', async ({ page }) => {
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
    await page.click("//a[@id='edit-cancel']");

    await expect(page.locator("//body")).toBeVisible();
    
});
test(' Cancel the selected user account From People List_11 ', async ({ page }) => {
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

// Cancele Delete
test('Cancel Delete Accont when  choose Delete method_12 ', async ({ page }) => {
  await page.goto(`${baseURL}/user/${userId}/edit`);
  await page.click("//a[@id='edit-delete']");
  await expect(page.locator("//span[@class='fieldset__label fieldset__label--group']")).toContainText('Cancellation method');
  await page.click("//label[contains(text(),'Delete the account and its content. This action ca')]");
  await page.click("//a[@id='edit-cance//l']");
  await expect(page.locator("//div[@class='main-content']")).toBeVisible();
  await expect(page.locator("//a[@class='breadcrumb__link']")).toContainText('Home');
  
});
// Delete Scenarios
test('Delete Accont when  choose Delete method_13 ', async ({ page }) => {
  await page.goto(`${baseURL}/user/${userId}/edit`);
  //await page.fill('input[name="mail[0][value]"]', 'Updated mona+501@cloudypedia.net');
  //await page.fill('input[name="name[0][value]"]', 'Updated mona501', { force: true });
  await page.click("//a[@id='edit-delete']");//div[@role='status'
  await expect(page.locator("//span[@class='fieldset__label fieldset__label--group']")).toContainText('Cancellation method');
  await page.click("//label[contains(text(),'Delete the account and its content. This action ca')]");
  await page.click("//input[@id='edit-submit']");
  // Show deletion success message
  await expect(page.locator('.messages--status')).toContainText('has been deleted.');
  const messageText = await page.locator('div.messages__content').textContent();
   console.log(messageText);
});
 // confirm after delete user not found in list 
test('Verify User removal from People list_14', async ({ page }) => {
  await page.goto(`${baseURL}/admin/people`);
  await expect(page.locator(`text=mona4162025 `)).toHaveCount(0);
  //await page.goto(`${baseURL}/user/${userId}/edit`);
  //await expect(page).toHaveTitle('Page not found | Drupal Site'); 
  //const message = await page.locator("//h1[normalize-space()='Page not found']").textContent();
  // console.log(message);
});
// Try delete User not Found 
test('Edit non-existent User_15', async ({ page }) => {
  await page.goto(`${baseURL}/user/${invaliduserId}/edit`);
  await expect(page.locator('body')).toContainText(/Access denied|Page not found/);
});

test('Unauthorized user attempts to edit_16', async ({ page }) => {
  await page.goto(`${baseURL}/user/logout`);
  await page.goto(`${baseURL}/user/${userId}/edit`);
  await expect(page.locator('body')).toContainText('You are not authorized');
});

test('Attempt to delete non-existent user_17', async ({ page }) => {
  await page.goto(`${baseURL}/user/${invaliduserId}/delete`);
  await expect(page.locator('body')).toContainText(/Access denied|Page not found/);
});

