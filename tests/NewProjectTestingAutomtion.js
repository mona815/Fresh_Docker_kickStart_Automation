const { test, expect} = require('@playwright/test');
const { clear } = require('console');

test.only('LoginNWC', async ({ page }) => {

// Go to the specified URL

  await page.goto('https://nwc-portal-dev.united-builders.net/en');
  await page.screenshot({path:'tests\screenshots'+Date.now()+'UpperPage.png'})
// click button Login 
await page.click("//a[contains(text(),'Log in')]");
//await page.screenshot({path:'tests\screenshots'+Date.now()+'First1Element.png'})
//provide username 
await page.fill('id=edit-name','mona');
//provide password 
await page.fill('id=edit-pass','monaqc123*_A12');
// click on submit button 
await page.click('id=edit-submit');
//await page.screenshot({path:'tests\screenshots'+Date.now()+'FullLoginhome1.png'})

  //await page.locator('html').click();

  /*await page.getByRole('link', { name: 'Log in' }).click();
  await page.screenshot({path:'tests\screenshots'+Date.now()+'First1Element.png'})
  await page.waitForTimeout(6000)
  //await page.getByPlaceholder('Enter email address').click();

  await page.getByLabel('Email or username').click();
  await page.getByLabel('Email or username').fill('mona');
  await page.screenshot({path:'tests\screenshots'+Date.now()+'First2Element.png'})
  //await page.getByLabel('Email or username').press('Tab');
  
  await page.getByLabel('Password', { exact: true }).fill('monaqc123*_A12');
  await page.locator("//input[@id='edit-pass']").screenshot({path:'tests\screenshots'+Date.now()+'SecElementPage.png'})
  //await  page.waitForTimeout(7000)
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({path:'tests\screenshots'+Date.now()+'FullLoginhome1.png'})
*/

// dropdown to selection  have my account  and Logout 
await page.locator("//button[@id='dropdownMenuButton']").isVisible({label:'Log out'});
await page.locator("//button[@id='dropdownMenuButton']").isVisible({label:'My account'});

  await page.getByRole('button', { name: 'user profile Welcome Mona' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
  await  page.waitForTimeout(7000)
  await page.screenshot({path:'tests\screenshots'+Date.now()+'dialogoutput1.png'})
  await page.click("//button[contains(text(),'Cancel')]");
  await page.getByRole('button', { name: 'user profile Welcome Mona' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
  await page.screenshot({path:'tests\screenshots'+Date.now()+'dialogoutput2.png'})
  await  page.waitForTimeout(7000)
  await page.click("//button[contains(text(),'Confirm')]");
  await page.screenshot({path:'tests\screenshots'+Date.now()+'HomepageOut.png'})
  
  await page.close()
});