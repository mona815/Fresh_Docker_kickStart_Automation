const { test, expect} = require('@playwright/test');

test('Edit Apps NWC',async ({page})=>{
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

 const Edit = await page.getByAltText('Edit App')
 await expect (Edit).toBeVisible();
 await page.click("//tbody/tr[1]/td[3]/span[4]/a[1]/img[1]");
 await page.setDefaultTimeout(60000); // 60 seconds timeout
 await page.screenshot({ path: 'confirmation2_screenshotEdit.png' });

 await page.setDefaultTimeout(60000); // 60 seconds timeout
 const nameApps= await page.locator("//input[@id='edit-displayname-0-value']");
 await expect(nameApps).toBeDisabled();
 
  await page.setDefaultTimeout(60000); // 60 seconds timeout

  await page.fill("//input[@id='edit-callbackurl-0-value']", 'https://harf.example.com');
  await page.fill("//textarea[@id='edit-description-0-value']", 'New description content for SampleApp1');
  

  // Edit the description field
   //const descriptionSelector = 'textarea[name="description"]';
   //await page.fill(descriptionSelector, 'New description content for SampleApp1');

   // Edit the Callback URL field
   //const callbackUrlSelector = 'input[name="callback_url"]';
   //const callbackUrlSelector = await page.locator("//input[@id='edit-callbackurl-0-value']");
   //await page.locator("#edit-api-products").selectOption({lable:'PG Payfort'});
  
  //await page.fill(callbackUrlSelector, 'http://new-callback-url.com');
  await page.setDefaultTimeout(60000); // 60 seconds timeout

 // Save the changes
  await page.click("//input[@id='edit-actions-submit']");
  await page.setDefaultTimeout(60000); // 60 seconds timeout

 // Wait for the success message to appear
 await page.waitForSelector('text=App has been successfully updated.');
 await page.setDefaultTimeout(60000); // 60 seconds timeout

 // Take a screenshot for visual confirmation
 await page.screenshot({ path: 'edit_confirmation_screenshot.png' });

 await page.setDefaultTimeout(60000); // 60 seconds timeout

  //await page.setDefaultTimeout(60000); // 60 seconds timeout

  await page.getByRole('button', { name: 'user profile Welcome Monaaa' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
  await page.screenshot({path:'tests\screenshots'+Date.now()+'dialogoutput2.png'})
  
  await page.setDefaultTimeout(60000); // 60 seconds timeout
  await page.click("//button[contains(text(),'Confirm')]");
  await page.screenshot({path:'tests\screenshots'+Date.now()+'HomepageOut.png'})

 // Close browser
 await page.close()
});
