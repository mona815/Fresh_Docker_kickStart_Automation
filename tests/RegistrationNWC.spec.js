const { test, expect} = require('@playwright/test');

 test('Create AccountNWC',async ({page})=>{
 // Go to the specified URL
 await page.setDefaultTimeout(60000); // 60 seconds timeout
 await page.goto('https://nwc-portal-dev.united-builders.net/en');
 await page.setDefaultTimeout(60000); // 60 seconds timeout

 // click button Create Account   
 //await page.click("//a[contains(text(),'Create Account')]");
 await page.getByRole('link', { name: 'Create Account', exact: true }).click();
 await page.setDefaultTimeout(60000); // 60 seconds timeout
 await page.screenshot({path:'tests\screenshots'+Date.now()+'UpperHomePage.png'});

 const Adress=await page.isVisible("//h1[contains(text(),'Register a new account')]");
 console.log('Adress in Upper Page:',Adress);
 await page.setDefaultTimeout(60000); // 60 seconds timeout

 // Get the page title
 const pageTitle = await page.title(); // Await the title method
 console.log('Page title is:', pageTitle);
 // Verify the page title
 //await expect(page).toHaveTitle('Create new account | NWC');
 // Verify Lable Register A New Account 
 await page.screenshot({path:'tests\screenshots'+Date.now()+'UpperHomePage.png'});

 const Create=await page.locator("//div[contains(text(),'Register a new account')]").isVisible();
 console.log('Create a New Account:',Create);
 //provide First name
 await page.fill("//input[@id='edit-first-name-0-value']",'Wafaa');

 //provide Last name
 await page.fill("//input[@id='edit-last-name-0-value']",'Mohamed');

 //provide Email
 await page.fill("//input[@id='edit-mail']",'mona+85888@cloudypedia.net');
 await page.setDefaultTimeout(60000); // 60 seconds timeout

 //provide Phone

 await page.fill("//input[@id='edit-field-mobile-number-0-mobile']",'0567477589');
 await page.setDefaultTimeout(80000); // 80 seconds timeout
 //provide Organization 

 //await page.locator("#edit-organization-profiles-0-entity-field-organization").selectOption({lable:'test'});

 //await page.selectOption("#edit-organization-profiles-0-entity-field-organization",'test')
  await page.getByLabel('Select organization').click();
  //await page.getByRole('option', { name: 'test', exact: true }).click();
  //const organizationValue= await page.getByRole('option', { name: 'test', exact: true }).click();
 await page.setDefaultTimeout(80000); // 60 seconds timeout
 const organizationValue = await page.getByRole('option', { name: 'test', exact: true }).click();
 /*const organizationValue = await page.inputValue('select[name="test"]');
 if (organizationValue === 'test') {
     // Select the 'Identity' option from the organization categories dropdown
     await page.locator("//label[contains(text(),'Organization categories')]").getByRole('combobox').click();
     await page.getByRole('option', { name: 'Identity', exact: true }).click();
 }*/
     // Wait for the new element to appear
  await page.setDefaultTimeout(80000); // 80 seconds timeout

  //await page.waitForSelector('#organizationValue', { state: 'visible' });
  
  // Check if the new element exists
  const organizationValueExists = await page.$('#organizationValue') !== null;

  if (organizationValueExists) {
    console.log('organizationValue exists!');
  } else {
    console.log('organizationValue does not exist.');
  }
  await page.screenshot({ path: 'registration_confirmation_screenshot1.png' });

 //await page.selectOption("#select2-edit-organization-profiles-0-entity-field-organization-categories--dXZQpIJgPAk-result-nxwm-9",'Identity')
 //await page.locator('#edit-organization-profiles-0-entity-field-organization-categories-wrapper--eyc5vHI8VRc').getByRole('combobox').click();
 //await page.getByLabel('Select Organization categories').click();
 //await page.click('id=select2-edit-organization-profiles-0-entity-field-organization-categories--3dtlGmsPwcA-container')

 /*await page.locator("//label[contains(text(),'Organization categories')]").getByRole('combobox').click();
 await page.getByRole('option', { name: 'Identity',exact:true }).click();
*/
 //const organizationValue = page.getByRole('option', { name: 'test',exact:true }).click();
 // Get the selected option value from the organization dropdown
 //const organizationValue = await page.$eval("#select2-edit-organization-profiles-0-entity-field-organization--MTrOyfID7i0-container",el=>el.value);
// Check if the selected option is 'test'
 /*const organizationSelector='#select2-edit-organization-profiles-0-entity-field-organization--MTrOyfID7i0-container';
 const organizationCategoriesSelector = '#select2-edit-organization-profiles-0-entity-field-organization-categories--3dtlGmsPwcA-result-ql3i-9';
 */
 //const organizationValue= await page.$eval(organizationSelector,el=> el.value);
 /*if (organizationValue === 'test') {
     // Select the 'identity' option from the organization categories dropdown
     //const organizationCategoriesSelector= await page.getByRole('option', { name: 'Identity',exact:true }).click();
     //await page.selectOption('organizationCategoriesSelector','identity').click();  // Replace '#organization-categories' with the actual selector
     await page.locator("//label[contains(text(),'Organization categories')]").getByRole('combobox').click();
     await page.getByRole('option', { name: 'Identity',exact:true }).click();
 }*/
 
  //await page.click("//span[@id='select2-edit-organization-profiles-0-entity-field-organization--9P-m2PW-U8E-container']");
  //await page.click("//li[@id='select2-edit-organization-profiles-0-entity-field-organization--9P-m2PW-U8E-result-gmhi-21']")
  //await page.selectOption("#select2-edit-organization-profiles-0-entity-field-organization-categories--1TjRpztBP94-container",'Identity')
  //await page.selectOption("#select2-edit-organization-profiles-0-entity-field-organization-categories--omgf6EJ71I8-result-hf1j-9",'Identity')
  //await page.locator("#select2-edit-organization-profiles-0-entity-field-organization-categories--omgf6EJ71I8-container").selectOption({label:'Identity'})
  //await page.locator("//label[contains(text(),'Organization categories')]").selectOption('Identity');
  //await page.selectOption("//label[contains(text(),'Organization categories')]",'Identity')
  //await page.selectOption("select2-edit-organization-profiles-0-entity-field-organization-categories--omgf6EJ71I8-result-hf1j-9");
 // Provide Organization Category 
 await page.setDefaultTimeout(70000); // 70 seconds timeout

 //await page.getByPlaceholder('Select Categories').selectOption('Identity')
 //await page.selectOption("#select2-edit-organization-profiles-0-entity-field-organization-categories--Rshk8g3nL8E-container-choice-38zn-9",'Identity')
 //await page.selectOption("#edit-organization-profiles-10-entity-field-organization-categories-wrapper--AvH1nXEfP-8",'Identity');
 //await page.locator("#edit-organization-profiles-10-entity-field-organization-categories-wrapper--AvH1nXEfP-8").selectOption({lable:'Identity'});
 //await page.selectOption("#edit-organization-profiles-0-entity-field-organization-categories--Rshk8g3nL8E",'Identity');


 // Submit the registration form
 await page.getByRole('button', { name: 'Send' }).click();
 //await page.click("//input[@id='edit-submit']");
 await page.setDefaultTimeout(60000); // 60 seconds timeout
 await page.screenshot({ path: 'registration_confirmation_screenshot2.png' });

 // Wait for the success message to appear
 await page.waitForSelector('text=Registration successful.');
 await page.getByLabel('Status message').click();
  await expect(page.getByLabel('Status message')).toContainText('× Status message Thank you for applying for an account. Your account is currently pending approval by the site administrator.In the meantime, a welcome message with further instructions has been sent to your email address.');
 await page.setDefaultTimeout(60000); // 60 seconds timeout

 // Take a screenshot for visual confirmation
 await page.screenshot({ path: 'registration_confirmation_screenshot3.png' });

 // Close browser
 await page.close()
});