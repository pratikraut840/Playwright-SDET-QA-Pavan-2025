import { test, expect, Locator } from '@playwright/test';

test("XPath locators usage",async ({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');

    //1. absolute xpath
    const absLogo:Locator =  page.locator("//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
    await expect(absLogo).toBeVisible();

    //2. relative xpath
    const relLogo:Locator = page.locator('//img[@alt="Tricentis Demo Web Shop"]');
    await expect(relLogo).toBeVisible();
})