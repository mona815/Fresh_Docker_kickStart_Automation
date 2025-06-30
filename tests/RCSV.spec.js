const { test, expect } = require('@playwright/test');
const fs = require('fs');
const csv = require('csv-parser');

// Function to read CSV file and return an array of credentials
async function readCSV(filePath) {
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

  // Wrap the logic inside a single test block
  test('login tests from CSV', async ({ page }) => {
    let credentials;

    // Load credentials from CSV
    try {
      credentials = await readCSV('testdata/credentials.csv');
      if (!credentials || credentials.length === 0) {
        throw new Error("No credentials found in CSV file");
      }
    } catch (error) {
      console.error("Error reading CSV file:", error);
      return; // Exit the test if credentials are not loaded
    }

    // Loop through each set of credentials from the CSV file
    for (let index = 0; index < credentials.length; index++) {
      const cred = credentials[index];
     
      // Use test.step to group actions per credential set
       await test.step(`login test with user ${index + 1}`, async () => {
        // Navigate to the login page
        await page.goto('http://localhost:8080/');
        // click button Login 

        const loginLink = page.locator('a[href="/user/login"]');
        await loginLink.click();
        console.log('username=${cred.username}, password=${cred.password}');
        // Fill in the username and password
        await page.fill('id=edit-name', cred.username);
        await page.fill('id=edit-pass', cred.password);
        
     
        await page.waitForTimeout(3000);

        // Click the login button
        //await page.click('id=edit-submit');
        await page.click("//input[@id='edit-submit']");
        await page.locator("//a[@class='secondary-nav__menu-link secondary-nav__menu-link--link secondary-nav__menu-link--level-1'][normalize-space()='Log out']").click();

       
      });
    }
  });
});