/*
These are the recommended built in locators.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByPlaceholder() to locate an input by placeholder.
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element(as button) based on its data-testid attribute (other attributes can be configured).

*/

const {test,expect} = require("@playwright/test");

test ('Locators_biltinNWC',async({page})=>{

// Go to the specified URL
await page.goto('https://nwc-portal-dev.united-builders.net/en');
//await page.locator('//a[contains(text(),'Log in')]').click();

  // click button Login 
  await page.click("//a[contains(text(),'Log in')]");
  //provide username 
  // 5- page.getByLabel() to locate a form control by associated label's text.
  //await page.getByLabel('Email or username').fill(('id=edit-name','mona'));

  await page.fill('id=edit-name','mona');
  //provide password 
  //await page.getByLabel('Password').fill('id=edit-pass','monaqc123*_A12');

  await page.fill('id=edit-pass','monaqc123*_A12');
  // click on submit button 
  await page.click('id=edit-submit');
// 4- page.getByText('Locator') to locate by text content. 

 await expect (await page.getByText('Welcome')).toBeVisible();

 await expect (await page.getByText('Personal profile')).toBeVisible;
//click on Get Started Menu 
  await page.click("//a[contains(text(),'Get Started')]"); 

// 1- page.getByAltText() to locate an element, usually image, by its text alternative.
 const StepByStep= await page.getByAltText('Default Image');
 await expect (StepByStep).toBeVisible();
// Get the page title
const pageTitle= await page.title(); // Await the title method
console.log('page title is',pageTitle);
// Verify the page title
 await expect(page).toHaveTitle('Get started | NWC');
// 2-page.getByPlaceholder() to locate an input by placeholder.) Not Used in my project 
// (NWC Not using placeholder using floating labels this is based on custom requirements) 
// in code inspect using placeholder =password or user name 
// await page.getByPlaceholder(UserName).fill("Admin");
// 3-  page.getByRole() to locate by explicit and implicit accessibility attributes.Basiclly Button
//await page.getByRole('button',{type:'submit'}).click();
// 4- page.getByText('Locator') to locate by text content. 
  
 const name=await page.locator("//span[contains(text(),'Mona')]").textContent();
 await expect (await page.getByText(name)).toBeVisible();
//click on About Portal Menu
 await page.click("//a[contains(text(),'About Portal')]");

// 6- page.getByTitle(or locator title) to locate an element by its title attribute.
 await expect(page.getByTitle("//title[contains(text(),'About Portal | NWC')]")).toHaveText('About Portal | NWC');

 await page.click("//button[@id='dropdownMenuButton']");
 await page.click("//a[contains(text(),'Log out')]");

 await page.close();
})