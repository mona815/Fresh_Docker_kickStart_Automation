const { test, expect} = require('@playwright/test');

test('Home Page UnLogin',async ({page})=>{
// Go to the specified URL
await page.goto('https://nwc-portal-dev.united-builders.net/en');


// Get the page title
const pageTitle= await page.title(); // Await the title method
console.log('page title is',pageTitle);
 // Verify the page title
await expect.soft(page).toHaveTitle('Home | NWC');
// Get the page URL
const pageURL=page.url();
console.log('page URL is : ',pageURL);
  // Verify the page URL
await expect.soft(page).toHaveURL('https://nwc-portal-dev.united-builders.net/en');
await page.screenshot({path:'tests\screenshots'+Date.now()+'UpperHomePage.png'});

await page.close();

})