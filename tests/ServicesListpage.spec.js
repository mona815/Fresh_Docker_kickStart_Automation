
const {test,expect} = require("@playwright/test");  

//import{test,expect} from '@playwright/test'   or import
test ('ServicesListPage',async({page})=>{

// Go to the specified URL

await page.goto('https://nwc-portal-dev.united-builders.net/en');
await page.waitForTimeout(5000)
await page.screenshot({path:'tests\screenshots'+Date.now()+'UpperPage.png'})

// Alocate any Element use this await page.locator('locate as property /css/xpath').click 
// await page.click('locator');
//click on login button  - property 

//await page.locator('//a[contains(text(),'Log in')]').click();

 // click button Login 
 await page.click("//a[contains(text(),'Log in')]");
  //provide username 
 await page.fill('id=edit-name','mona');
  //provide password 
 await page.fill('id=edit-pass','monaqc123*_A12');
  // click on submit button 
 await page.click('id=edit-submit');

 //click on Services Menu 
 await page.click("//a[contains(text(),'Services')]");  

  // Verify the page title
await page.click("//h1[contains(text(),'Services')]");
await expect(page).toHaveTitle('Services | NWC');
await page.screenshot({path:'tests\screenshots'+Date.now()+'ServicesPage.png'})
//Locators Multiple web Elements in services page by const Elements =awaite page.$$(locator)

/*const links = await page.$$ ('a');  // a ankor catch all links 
for (const link of links)
  {
     const linktext=await link.textContent();// catsch all links 
     console.log(linktext);                   // print links 
    
  }*/
   /* page.waitForSelector("//div[@id='block-nwc-theme-content']//div//p/a"); For loop to get word Details on Card product
  const products=await page.$$("//div[@id='block-nwc-theme-content']//div//p/a");

  for(const product of products)
    {
      const productName=await product.textContent();
      console.log(productName);

    } 

*/ 
// Loop to get nameof product card 

page.waitForSelector("//div[@id='block-nwc-theme-content']//div//p"); 
  const products=await page.$$("//div[@id='block-nwc-theme-content']//div//p");

  for(const product of products)
    {
      const productName=await product.textContent();
      console.log(productName);

    }
// Search Services Part 
await page.locator("//select[@id='edit-field-categories-target-id']").selectOption({label:'Data Append'})

  await page.click("//button[@id='dropdownMenuButton']")
  await page.click("//a[contains(text(),'Log out')]")

  await page.click("//button[contains(text(),'Confirm')]");

 await page.close();

});