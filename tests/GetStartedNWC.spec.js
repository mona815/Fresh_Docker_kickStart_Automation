const { test, expect} = require('@playwright/test');

test('Get StartedNWC',async ({page})=>{
// Go to the specified URL
await page.waitForTimeout(5000);
await page.goto('https://nwc-portal-dev.united-builders.net/en');
await page.setDefaultTimeout(60000); // 60 seconds timeout









// Close browser
await page.close()
});