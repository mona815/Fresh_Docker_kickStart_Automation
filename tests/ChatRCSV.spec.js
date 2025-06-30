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
      .on('end', () => {
        console.log('✅ CSV data loaded:', results);
        resolve(results);
      })
      .on('error', (error) => reject(error));
  });
}

test.describe('Login Tests from CSV', () => {

  test('Login with multiple credentials', async ({ page }) => {
    let credentials;

    // Load credentials
    try {
      credentials = await readCSV('testdata/credentials.csv');
      if (!credentials || credentials.length === 0) {
        throw new Error("❌ No credentials found in CSV file");
      }
    } catch (error) {
      console.error("❌ Error reading CSV file:", error);
      return;
    }

    // Loop through credentials
    for (let index = 0; index < credentials.length; index++) {
      const cred = credentials[index];

      await test.step(`🔐 Login Test ${index + 1} - User: ${cred.username}`, async () => {
        console.log(`👉 Using credentials: username=${cred.username}, password=${cred.password}`);

        await page.goto('http://localhost:8080/');
        await page.click('a[href="/user/login"]');

        await page.fill('id=edit-name', cred.username);
        await page.fill('id=edit-pass', cred.password);

        await page.click('input#edit-submit');
        await page.waitForTimeout(2000); // Wait to observe result

        // Optional: Verify login worked, or check for error
        const isLoggedIn = await page.locator("text=My account").isVisible().catch(() => false);
        if (isLoggedIn) {
          console.log(`✅ Login succeeded for ${cred.username}`);
         // await page.click('text=Log out');
            await page.locator("//a[@class='secondary-nav__menu-link secondary-nav__menu-link--link secondary-nav__menu-link--level-1'][normalize-space()='Log out']").click();

        } else {
          console.warn(`❌ Login failed for ${cred.username}`);
        }
        expect(isLoggedIn).toBeTruthy();

      });
    }
  });

});
