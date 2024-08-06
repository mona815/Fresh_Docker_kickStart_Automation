const { test, expect } = require('@playwright/test');
const fs = require('fs');
const csv = require('csv-parser');

// Function to read CSV file and return an array of credentials
function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

 test.describe('Login Tests', () => {
  let credentials;

  // Before all tests, read the CSV file
  test.beforeAll(async () => {
    credentials = await readCSV('credentials.csv');
  });

  credentials.forEach((cred, index) => {
    test(`login test with user ${index + 1}`, async ({ page }) => {
      // Navigate to the login page
      await page.goto('https://nwc-portal-dev.united-builders.net/en');
      await page.click("//a[contains(text(),'Log in')]");

      // Fill in the username and password
      await page.fill('id=edit-name', cred.name);
      await page.fill('id=edit-pass', cred.pass);

      // Click the login button
      await page.click('id=edit-submit');
      //await page.click('button[type="submit"]');

      // Check for a successful login by verifying some element on the next page
      //await expect(page).toHaveURL('https://nwc-portal-dev.united-builders.net/en/user/1?check_logged_in=1');
      await expect(page.locator("//span[contains(text(),'Welcome')]")).toBeVisible();
      await page.locator("//button[@id='dropdownMenuButton']").isVisible({label:'Log out'});
      await page.locator("//button[@id='dropdownMenuButton']").isVisible({label:'My account'});

    }); 
  });

});