const { test, expect} = require('@playwright/test');

test('Contact UsNWC',async ({page})=>{
// Go to the specified URL
await page.waitForTimeout(5000);
await page.goto('https://nwc-portal-dev.united-builders.net/en');
await page.setDefaultTimeout(60000); // 60 seconds timeout

// click button Contact Us   
await page.click("//a[contains(text(),'Contact Us')]");
await page.setDefaultTimeout(60000); // 60 seconds timeout
await page.screenshot({path:'tests\screenshots'+Date.now()+'Contact Us Page.png'});
await page.setDefaultTimeout(60000); // 60 seconds timeout

// Get the page title
const pageTitle = await page.title(); // Await the title method
console.log('Page title is:', pageTitle);

const message=await page.isVisible("//p[contains(text(),'A message confirming our confirmation of communica')]");
console.log('Message Upper contact us :',message);
//provide Your name
await page.fill("//input[@id='edit-name']",'Test');

//provide Your Email address
await page.fill("//input[@id='edit-mail']",'mona+999@cloudypedia.net');
//provide Phone Number

await page.fill("//input[@id='edit-field-phone-number-0-value']",'01010480231');
// provide  Subject 

await page.fill("//input[@id='edit-subject-0-value']",'Test Send Message by Contact Us');

//provide   Message 
await page.fill("//textarea[@id='edit-message-0-value']",'Send New Message by Test Personal');
await page.setDefaultTimeout(60000); // 60 seconds timeout

// provide  Send Message Button 

await page.focus("//input[@id='edit-submit']");
await page.setDefaultTimeout(60000); // 60 seconds timeout

await page.click('#edit-actions');
await page.setDefaultTimeout(60000); // 60 seconds timeout
// Wait for the success message to appear
//await page.waitForSelector('text= Your message has been sent.');
const successMessage1 = await page.isVisible('Status message= Your message has been sent.');
//const successMessage1 = await page.isVisible('text= Your message has been sent.');

console.log('Success message for app creation visible:', successMessage1);
await page.setDefaultTimeout(60000); // 60 seconds timeout

// Take a screenshot for visual confirmation
await page.screenshot({ path: 'registration_confirmation_screenshot.png' });

// Close browser
await page.close()
});