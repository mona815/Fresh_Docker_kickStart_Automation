const { test, expect} = require('@playwright/test');

test('Delete AppsNWC',async ({page})=>{
// Go to the specified URL
await page.waitForTimeout(5000);
await page.goto('https://nwc-portal-dev.united-builders.net/en');
await page.setDefaultTimeout(60000); // 60 seconds timeout
// click button Login 
await page.click("//a[contains(text(),'Log in')]");
//provide username 
await page.fill('id=edit-name','mona45');
//provide password 
await page.fill('id=edit-pass','monaqc123*_A12');
//await page.click("//input[@id='edit-pass']");
await page.click("//div[@id='edit-actions']");
// click on submit button 
await page.setDefaultTimeout(60000); // 60 seconds timeout

await page.click('id=edit-submit');
await page.setDefaultTimeout(60000); // 60 seconds timeout

//click on Apps Menu 
await page.click("//span[contains(text(),'Apps')]");  

// Check if the 'Add New App' button is present
const addNewAppButton = await page.isVisible('text=Add New App');
console.log('Add New App button visible:', addNewAppButton);

// Check if the specific app is listed with the correct status
  const appName = await page.isVisible('text=SampleApp1');
  const appStatus = await page.isVisible('text=Approved'); 

 console.log('SampleApp1 visible:', appName);
 console.log('Approved status visible:', appStatus);

// Optionally, take a screenshot for visual confirmation
 await page.screenshot({ path: 'confirmation1_screenshot.png' });

 await page.setDefaultTimeout(60000); // 60 seconds timeout

 const Delete = await page.getByAltText('Delete App')
 await expect (Delete).toBeVisible();
 await page.click("//tbody/tr[1]/td[3]/span[3]/a[1]/img[1]");
 await page.screenshot({ path: 'confirmation2_screenshotDelete.png' });

 await page.setDefaultTimeout(60000); // 60 seconds timeout

 // Check if the delete confirmation message is present
 const confirmationMessage = await page.isVisible('text=Are You Sure You Want To Delete');
 console.log('Delete confirmation message visible:', confirmationMessage);

  await page.setDefaultTimeout(60000); // 60 seconds timeout
// Check if the input field is present
const inputField = await page.isVisible("//input[@id='edit-verification-code']");
console.log('Input field visible:', inputField);

// Type the app name into the input field
await page.fill("//input[@id='edit-verification-code']", 'sampleapp1');
await page.setDefaultTimeout(60000); // 60 seconds timeout

await page.click("//input[@id='edit-verification-code']");
await page.setDefaultTimeout(60000); // 60 seconds timeout

// Optionally, take a screenshot for visual confirmation
await page.screenshot({ path: 'delete_confirmation3_screenshot.png' });

await page.click("//input[@id='edit-submit']");
await page.screenshot({ path: 'delete_confirmation4List_screenshot.png' });


  await page.setDefaultTimeout(60000); // 60 seconds timeout

  await page.getByRole('button', { name: 'user profile Welcome Monaaa' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
  await page.screenshot({path:'tests\screenshots'+Date.now()+'dialogoutput2.png'})
  //await  page.waitForTimeout(7000)
  await page.setDefaultTimeout(60000); // 60 seconds timeout
  await page.click("//button[contains(text(),'Confirm')]");
  await page.screenshot({path:'tests\screenshots'+Date.now()+'HomepageOut.png'})

// Close browser
await page.close()
});
