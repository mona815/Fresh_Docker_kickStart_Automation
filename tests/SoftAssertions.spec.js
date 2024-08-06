const{test,expect} = require('@playwright/test')


test("Soft Assertions",async({page})=>{

     await page.waitForTimeout(5000)
     await page.goto("https://nwc-portal-dev.united-builders.net/en")

     //Hard assertions 
     /*
     await expect (page).toHaveTitle('Home | NWC');
     await expect (page).toHaveURL("https://nwc-portal-dev.united-builders.net/en");
     await expect(page.locator('.navbar-brand')).toBeVisible();
    */
     //Soft assertions 
     await expect.soft (page).toHaveTitle('Home | NWC');
     await expect.soft (page).toHaveURL("https://nwc-portal-dev.united-builders.net/en");
     await expect.soft(page.locator('.navbar-brand')).toBeVisible();





await page.close();




})