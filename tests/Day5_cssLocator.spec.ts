import { test, expect,Locator } from '@playwright/test';

test('CSS Locator execution', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');

  // ----------------------------------------------------
  // 1. CSS Locator using TAG + ID
  // Syntax: tag#id
  // ----------------------------------------------------
    const searchBox:Locator = page.locator('input#small-searchterms');
    await searchBox.fill('book');

  // ----------------------------------------------------
  // 2. CSS Locator using TAG + CLASS
  // Syntax: tag.className
  // ----------------------------------------------------
    const logInBtn:Locator = page.locator('a.ico-login');
    await expect(logInBtn).toBeVisible();
    
  // ----------------------------------------------------
  // 3. CSS Locator using TAG + ATTRIBUTE
  // Syntax: tag[attribute="value"]
  // ----------------------------------------------------
    const searchButton:Locator = page.locator('input[value="Search"]');
    await searchButton.click();

  // ----------------------------------------------------
  // 4. Relative CSS Locator using parent > child relationship
  // Syntax: parent > child
  // ----------------------------------------------------
    const bookResult:Locator = page.locator("div>h2>a[href='/health']");
    await expect(bookResult).toBeVisible();
})