const { test, expect} = require('@playwright/test');

  test('Home Page',async ({page})=>{
  // Go to the specified URL
await page.goto('https://rega.united-builders.net');

debugger;  // This will pause the execution if you run Node.js with --inspect

// Get the page title
const pageTitle= await page.title(); // Await the title method
console.log('page title is',pageTitle);
 // Verify the page title
await expect(page).toHaveTitle('Home | REGA');
// Get the page URL
const pageURL=page.url();
console.log('page URL is : ',pageURL);
  // Verify the page URL
await expect(page).toHaveURL('https://rega.united-builders.net');

await page.close();

});