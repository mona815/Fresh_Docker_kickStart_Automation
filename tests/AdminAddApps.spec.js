import { test, expect } from '@playwright/test';

test('Login test',async ({ page }) => {
    // Go to the specified URL
    await page.goto('http://localhost:8085/');
   
    // Perform login
     await page.click('a[href="/user/login"]');
     await page.fill('id=edit-name', 'admin');
     await page.fill('id=edit-pass', 'admin');
     await page.click("//form[@id='user-login-form']//input[@id='edit-submit']");
     // Navigate to Add Apps
     // await page.locator("//a[@title=A developer's apps.]").click();
     await page.locator('a.nav-link[href="/user/apps"]').click();//Using href^="/user/apps" allows dynamic token support.
     //await page.getByRole('link', { name: 'Apps' }).click();//By text:
     //await page.locator('//a[normalize-space()="Apps"]').click();//XPath (less preferred, but possible):
    await expect(page).toHaveTitle('Apps | Fresh Docker KickStart');
    await page.locator("//a[normalize-space()='Add app']").click();
    // Fill in form
    await page.fill('id=edit-displayname-0-value', 'Add_New_ App_2');
    await page.fill('id=edit-callbackurl-0-value', 'https://www.harf.com');
    //await page.fill('id=edit-description-0-value', 'Test Add Description For Add Apps');
    await page.getByLabel('Description').click();
    await page.getByLabel('Description').fill('Test Add Description For Add New Apps');
    // Choose and Check API 
   await expect(page.getByText('task API')).toBeVisible();
   await page.getByText('task API').click();
   // Submit form
   await page.getByRole('button', { name: 'Add app' }).click();
   //Get Message successfully by detailes Diynamiclly 
   const messageText = await page.locator("//div[@role='alert']").textContent();
   console.log(messageText);
   await expect (page.locator("//div[@role='alert']")).toBeVisible();
   //Navigate to LogOut 
   // await page.locator("//a[normalize-space()='Home']").click();//Using href^="/user/logout" allows dynamic token support.
    //await page.locator("//a[@class='nav-link'][normalize-space()='Log out']").click();
    // await page.locator('//a[normalize-space()="Log out"]').click();//XPath:
    //await page.locator('a.nav-link[href^="/user/logout"]').click();
    //await page.getByRole('link', { name: 'Log out' }).click();//By role and text:
    //await page.locator("//a[@class='secondary-nav__menu-link secondary-nav__menu-link--link secondary-nav__menu-link--level-1'][normalize-space()='Log out']").click();
  });
