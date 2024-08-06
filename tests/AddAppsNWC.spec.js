const { test, expect} = require('@playwright/test');

test('Add New Apps',async ({page})=>{
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
//await page.waitForTimeout(5000);
// click on submit button 
await page.setDefaultTimeout(60000); // 60 seconds timeout

await page.click('id=edit-submit');
await page.setDefaultTimeout(60000); // 60 seconds timeout

//click on Apps Menu 
await page.click("//span[contains(text(),'Apps')]");  
// Check if the 'Add New App' button is present
const addNewAppButton = await page.isVisible('text=Add New App');
console.log('Add New App button visible:', addNewAppButton);

// Check if the 'There are no applications created yet.' text is present
const noApplicationsText = await page.isVisible('text=There are no applications created yet.');
console.log('No applications created text visible:', noApplicationsText);

// Optionally, take a screenshot for visual confirmation
await page.screenshot({ path: 'confirmation_screenshot.png' });

// Set a higher timeout for navigation and actions
 await page.setDefaultTimeout(60000); // 60 seconds timeout
//await page.waitForRequest(5000);
await page.screenshot({path:'tests\screenshots'+'FirstPageApps.png'})
// cick on Add New Apps Button 
//await page.waitForRequest(5000);
await page.click("//a[contains(text(),'Add New App')]");
await page.setDefaultTimeout(60000); // 60 seconds timeout
await expect(page).toHaveTitle('Add App | NWC');
//await page.waitForTimeout(3000),

await page.screenshot({path:'tests\screenshots'+'SecPageApps.png'})
//await page.waitForTimeout(3000),
// Fill in the form fields
await page.fill("//input[@id='edit-displayname-0-value']", 'SampleApp1');
await page.fill("//input[@id='edit-callbackurl-0-value']", 'https://callback.example.com');
await page.fill("//textarea[@id='edit-description-0-value']", 'This is a sample app description.');

//await page.waitForTimeout(3000),
await page.setDefaultTimeout(60000); // 60 seconds timeout
await page.click("//form[@id='developer-app-add-for-developer-form']");
// Select a service from the dropdown (assuming the value 'service1' exists)
//await page.selectOption("//ul[@id='select2-edit-api-products-container']", ({lable:'Blady'}));
await page.locator("#edit-api-products").selectOption({lable:'Balady'});
await page.setDefaultTimeout(60000); // 60 seconds timeout
 await page.click("//body/main[1]/div[2]/div[1]/div[1]/div[1]/div[2]/form[1]/div[5]/span[1]/span[1]/span[1]");
//await page.locator("//select[@id='edit-api-products']").dblclick();

await page.setDefaultTimeout(60000); // 60 seconds timeout

//await page.waitForTimeout(3000),
// Click the "Add app" button
//await page.click("//input[@id='edit-actions-submit']");
await page.click('#edit-actions-submit');

await page.setDefaultTimeout(60000); // 60 seconds timeout

// Navigate to the page where the success message should appear
await page.goto('http://nwc-portal-dev.united-builders.net/en/user/16/apps');

// Check if the success message is visible
const successMessage1 = await page.isVisible('text=App has been successfully created.');
const successMessage2 = await page.isVisible('text=Credential’s product list has been successfully updated.');

console.log('Success message for app creation visible:', successMessage1);
console.log('Success message for product list update visible:', successMessage2);

// Optionally, take a screenshot for visual confirmation
await page.screenshot({ path: 'success_message_screenshot.png' });




//await page.screenshot({path:'tests\screenshots'+'ThredPageApps.png'})
//await page.isVisible('.messages__list');
//await page.locator('.messages__list').isVisible();
//await expect(page).textContent('App has been successfully created.');
// Optionally, wait for a specific element that confirms the app was added
//await page.waitForSelector('SampleApp1 successfully added');
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
