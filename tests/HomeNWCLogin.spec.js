const { test, expect } = require('@playwright/test');

test('Home Page', async ({ page }) => {
  // Go to the specified URL
  await page.waitForTimeout(3000)
  await page.goto('https://nwc-portal-dev.united-builders.net/en');
 //await page.goto(process.env.URL)
  // Get the page title
  const pageTitle = await page.title(); // Await the title method
  console.log('Page title is:', pageTitle);

  // Verify the page title
  await expect(page).toHaveTitle('Home | NWC');

  // Get the page URL
  const pageURL = page.url();
  console.log('Page URL is:', pageURL);

  // Verify the page URL
  await expect(page).toHaveURL('https://nwc-portal-dev.united-builders.net/en');
  // click button Login 
  await page.click("//a[contains(text(),'Log in')]");
  //provide username 
await page.fill('id=edit-name','mona');

  //await page.fill(process.env.edit-name) 
  //provide password 
await page.fill('id=edit-pass','monaqc123*_A12');
//await page.fill(process.env.edit-pass)
  // click on submit button 
  await page.click('id=edit-submit');
  await page.screenshot({path:'tests\screenshots'+Date.now()+'Full3Page.png'})
  

  //verify logout link presecence
  await page.click("//button[@id='dropdownMenuButton']");
  const logoutLink = await page.locator("//a[contains(text(),'Log out')]");
  await expect.soft(logoutLink).toBeVisible();
  
  await page.waitForTimeout(5000)
   //await expect(page).toHaveTitle('mona | NWC');
  
   //await expect(page).toBeVisible('Personal profile');
  
   // Wait for the element to be visible
   await page.waitForSelector('text=Personal Profile', { state: 'visible' });

   // Verify the element is visible
   const personalProfileElement = page.locator('text=Personal Profile');
   await expect(personalProfileElement).toBeVisible();

   await page.click("//span[contains(text(),'Welcome')]");
   
    await page.click("//a[contains(text(),'Log out')]");
  
    await page.close()

});