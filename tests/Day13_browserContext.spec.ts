import { Browser, BrowserContext, chromium, expect, Page, test } from '@playwright/test';
/*
================================================================================
Playwright Concepts: Browser, BrowserContext, and Page
================================================================================
How to define browser, browser context and page in test?
1. Default Page from Playwright Config: When we directly use page inside the test, Playwright automatically provides it from playwright.config.ts.
2. Creating an Isolated Browser: To handle an isolated browser instance, we manually launch the browser and store it in a variable.
3. Creating an Isolated Browser Context: To create a new isolated context, we need to import the browser and create a new context object using browser.
4. Creating an Isolated Page: To create a new page in the test, we need to import the context and create a newPage object using context.
5. context.pages() – This method returns the array of all pages created in context
*/

test('Verify browser and browserContext creation', async (): Promise<void> => {

    // Create a new browser instance using Chromium
    const browser: Browser = await chromium.launch();

    // Create a new isolated browser context
    const browserContext: BrowserContext = await browser.newContext();

    // Create two separate pages (browser tabs) within the same context
    const page1: Page = await browserContext.newPage();
    const page2: Page = await browserContext.newPage();

    // Retrieve all active browser contexts
    const totalContexts: BrowserContext[] = browser.contexts();
    console.log("No of contexts :", totalContexts.length);

    // Retrieve all pages created within the current context
    const totalPages: Page[] = browserContext.pages();
    console.log("No of pages :", totalPages.length);

    // Navigate the first page to Selenium's official website
    await page1.goto('https://www.selenium.dev/');

    // Validate that the page title matches the expected value
    await expect(page1).toHaveTitle('Selenium');

    // Output the page title to the console
    console.log(await page1.title());

    // Navigate the second page to the Playwright official website
    await page2.goto('https://playwright.dev/');

    // Validate that the page title matches the expected value
    await expect(page2).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');

    // Output the page title to the console
    console.log(await page2.title());

});