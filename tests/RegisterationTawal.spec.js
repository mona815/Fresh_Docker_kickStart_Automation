const { test, expect} = require('@playwright/test');

 test.only('Create AccountNWC',async ({page})=>{
 // Go to the specified URL
 await page.setDefaultTimeout(60000); // 60 seconds timeout
 await page.goto('https://tawal-portal-dev.united-builders.net/');
 await page.setDefaultTimeout(60000); // 60 seconds timeout

 // click button Register    
 
 await page.click("//a[contains(text(),'Register')]");
 //await page.getByRole('link', { name: 'Register', exact: true }).click();
 await page.setDefaultTimeout(60000); // 60 seconds timeout
 await page.screenshot({path:'tests\screenshots'+Date.now()+'UpperHomePage.png'});

 const Adress=await page.isVisible("//h1[contains(text(),'Create new account')]");
 console.log('Adress in Upper Page:',Adress);
 await page.setDefaultTimeout(60000); // 60 seconds timeout

 // Get the page title
 const pageTitle = await page.title(); // Await the title method
 console.log('Page title is:', pageTitle);
 // Verify the page title
 //await expect(page).toHaveTitle('Create new account | Tawal Portal');
 // Verify Lable Register A New Account 
 await page.screenshot({path:'tests\screenshots'+Date.now()+'UpperHomePage.png'});

 const Register=await page.locator("//div[contains(text(),'Register a new account')]").isVisible();
 console.log('Create new account:',Register);
 //provide First name
 await page.fill("//input[@id='edit-first-name-0-value']",'Monaaaaa');

 //provide Last name
 await page.fill("//input[@id='edit-last-name-0-value']",'Mohamed');

 //provide Email
 await page.fill("//input[@id='edit-mail']",'mona+8589@cloudypedia.net');
 await page.setDefaultTimeout(60000); // 60 seconds timeout

 //provide Phone

 await page.fill("//input[@id='edit-field-phone-number-0-mobile']",'0533477599');
 await page.setDefaultTimeout(60000); // 60 seconds timeout
 //provide Position  
 await page.fill("//input[@id='edit-field-position-0-value']",'Ledaer');

 // provide Company name (EN)
 await page.setDefaultTimeout(60000); // 60 seconds timeout

 await page.fill("//input[@id='edit-field-company-name-en-0-value']",'Cloudypedia')
 
 //provide Company name (AR)
  await page.setDefaultTimeout(60000); // 60 seconds timeout
  await page.fill("//input[@id='edit-field-company-name-ar-0-value']",'كلاوديا')
 // provide Company commercial registration
 await page.setDefaultTimeout(60000); // 60 seconds timeout
 await page.fill("//input[@id='edit-field-company-commercial-registr-0-value']",'5557562132')


 //provide Reason for APIs usage
 await page.setDefaultTimeout(60000); // 60 seconds timeout
 await page.fill("//textarea[@id='edit-field-apis-usage-0-value']",'Test Add New Account To Using Apps')
 
 //provide Text Dispaly in Form 
 const Text =await page.locator("//span[contains(text(),'Already have an account?')]").isVisible();
 console.log('Already have an account?Login:', Text)

 // Submit the registration form
  await page.click("//input[@id='edit-submit']");
  // await page.getByRole('button', { name: 'Send' }).click();

 await page.setDefaultTimeout(60000); // 60 seconds timeout
 await page.screenshot({ path: 'registration_confirmation_screenshot2.png' });
 await page.setDefaultTimeout(80000); // 80 seconds timeout

 // Wait for the success message to appear
  //await page.waitForSelector('text=Registration successful.');
  await page.getByLabel('Status message').click();
  await expect(page.getByLabel('Status message')).toContainText('Thank you for applying for an account. Your account is currently pending approval by the site administrator.');
  await page.setDefaultTimeout(60000); // 60 seconds timeout

 // Take a screenshot for visual confirmation
 //await page.screenshot({ path: 'registration_confirmation_screenshot3.png' });

 // Close browser
 await page.close()
});