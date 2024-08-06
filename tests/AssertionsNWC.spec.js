const { test, expect } = require('@playwright/test');

test('AssertionNWCTest', async ({ page }) => {

  // Go to the specified URL
  await page.goto('https://nwc-portal-dev.united-builders.net/en');
  // 1- expect (page).toHaveURL()   page has URL 

  await expect (page).toHaveURL('https://nwc-portal-dev.united-builders.net/en')

  // 2- expect (page).toHaveTitle('get title from hyml inspect')    page has Title 

  await expect(page).toHaveTitle('Home | NWC')
  // 3- expect (locator).toBeVisiabile ()  Element is visabile  as text in page under logo
   // const TextElement= await page.locator('div.title')  Or put id 
   const TextElement = await page.locator("//div[contains(text(),'Digital integration with the National Water Compan')]")
   await expect(TextElement).toBeVisible()
 
  // 4- expect (locator).toBeEnabled  Or expect (locator).toBeDisabled control is enabled /disabled as search box or input data as usernams 

  // click button Login 
 await page.click("//a[contains(text(),'Log in')]");

  //const UserNameBox=await page.locator("//input[@id='edit-name']")
  //await expect(UserNameBox).toBeEnabled()

 // 6- expect (Locator).toHaveAttribute()   Element has Attribute  as a button in page 
   const RegButton = await page.locator('#edit-submit')
   await expect(RegButton).toHaveAttribute('type','submit')

   // 7- expect(locator).toHaveText ()           Element match text exactlly equale the text mean  full text 
   await expect( await page.locator('.form-title')).toHaveText('Log in')
  // 8- expect(locator).toContainText ()        Element contain text  partial text  mean part of word
  await expect( await page.locator('.form-title')).toContainText('Log ')

  // 9- expect(locator).toHaveValue (Value)     Inout has a Value
const usernamevalue=await page.locator('#edit-name')
await usernamevalue.fill('mona');
await expect(usernamevalue).toHaveValue('mona')

 // Enter Data in User Name and Password to Login 
 await page.fill('id=edit-name','mona');
 await page.fill('id=edit-pass','monaqc123*_A12');
  // click on submit button 
  await page.click('id=edit-submit');

  //click on Services Menu 
 await page.click("//a[contains(text(),'Services')]");

 // confirm TextBox Search Enabled 
 const SearchTextBox=await page.locator("//input[@id='edit-combine']")
 await expect(SearchTextBox).toBeEnabled()
 // 5- Radio button and check box in file word not Here 
 // expect(locator).toBeChecked ()   Radio/CheckBox  is checked 

 
 // 10- expect(locator).toHaveCount ()     List of Element has given length as dropdown list 
 
 //const options = await page.locator("//select[@id='edit-field-categories-target-id--xm4Dnupg-EY']");
 //await expect(options).toHaveCount('1')

  //await page.click("//button[@id='dropdownMenuButton']");
  //await page.click("//a[contains(text(),'Log out')]");
  
  await page.close()

});