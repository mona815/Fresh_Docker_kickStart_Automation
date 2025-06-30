//const { test, expect} = require('@playwright/test');
import {test, expect } from '@playwright/test';

test('AdminAddUserContentEditor', async ({ page }) => {

   // Go to the specified URL

    await page.goto('http://localhost:8080/');

   expect(page).toHaveTitle('Welcome! | Drupal Site');

   // click button Login 

   const loginLink = page.locator('a[href="/user/login"]');
   await loginLink.click();
   //provide username admi
   await page.fill('id=edit-name','admin');
   //provide password 
    await page.fill('id=edit-pass','admin');
   // click on submit button 
   
   await page.click("//input[@id='edit-submit']");
   await page.waitForTimeout(3000)

   // dropdown to selection  have my account  and Logout 
     await page.locator("//a[@class='secondary-nav__menu-link secondary-nav__menu-link--link secondary-nav__menu-link--level-1'][normalize-space()='Log out']").isVisible({label:'Log out'});
     await page.locator("//a[normalize-space()='My account']").isVisible({label:'My account'});

   //Admin Click Pepole from Menu 
    await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
    expect(page).toHaveTitle('People | Drupal Site');

   // Admin Click Add user 
   await page.locator("//a[normalize-space()='Add user']").click();

   //provide Email Address 
   await page.fill('id=edit-mail','mona+2362025@cloudypedia.net');
   //provide Username 
   await page.fill('id=edit-name','mona2362025');
   //provide Password
   await page.fill('id=edit-pass-pass1','monaqc123*Test');
   // provide Confirm password
   await page.fill('id=edit-pass-pass2','monaqc123*Test');
   // provide Roles 
  
   // Check Authenticated User
   await page.waitForSelector('id=edit-roles-authenticated'); // wait first
   // Store whether it's hidden

   const Authenticated=await page.locator('id=edit-roles-authenticated').isHidden();
   // Then assert with Playwright's expect
   await expect(page.locator('id=edit-roles-authenticated')).toBeVisible();
   await expect(page.locator('id=edit-roles-authenticated')).toBeDisabled();

   // Check Content editor
  
   await page.waitForSelector('id=edit-roles-content-editor'); // wait first
   await page.check('id=edit-roles-content-editor'); // then check

   // click on submit button 
   
    await page.click("//input[@id='edit-submit']");

  await page.close();
});

test('AdminAddUserِAdminstrator', async ({ page }) => {

  // Go to the specified URL

   await page.goto('http://localhost:8080/');

   expect(page).toHaveTitle('Welcome! | Drupal Site');

   // click button Login 

   const loginLink = page.locator('a[href="/user/login"]');
   await loginLink.click();
   //provide username admin
   await page.fill('id=edit-name','admin');
   //provide password 
   await page.fill('id=edit-pass','admin');
   // click on submit button 
   
   await page.click("//input[@id='edit-submit']");
   await page.waitForTimeout(3000)

   //Admin Click Pepole from Menu 
   await page.locator("//a[@id='toolbar-link-entity-user-collection']").click();
  
   // Admin Click Add user 
   await page.locator("//a[normalize-space()='Add user']").click();
 
   //provide Email Address 
   await page.fill('id=edit-mail','mona+2462025@cloudypedia.net');
   //provide Username 
   await page.fill('id=edit-name','mona2462025');
   //provide Password
   await page.fill('id=edit-pass-pass1','monaqc123*Test');
   // provide Confirm password
   await page.fill('id=edit-pass-pass2','monaqc123*Test');
    // provide Roles 
  
   // Check Authenticated User
   await page.waitForSelector('id=edit-roles-authenticated'); // wait first

   // Then assert with Playwright's expect
   await expect(page.locator('id=edit-roles-authenticated')).toBeVisible();
   await expect(page.locator('id=edit-roles-authenticated')).toBeDisabled();

   // Check Administrator
   await page.waitForSelector('id=edit-roles-administrator'); // wait first
   await page.check('id=edit-roles-administrator'); // then check

   // click on submit button 

   await page.click("//input[@id='edit-submit']");

  await page.close();
});