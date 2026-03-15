import { Browser, BrowserContext, chromium, expect, test, Page, Locator } from '@playwright/test';
/*
===============================================================================
Test Suite: Playwright Tab and Window Handling
===============================================================================

Objective:
Demonstrate how to handle browser tabs and popup windows in Playwright.

Test Case 1: Verify Tab Handling
Steps:
1. Navigate to https://testautomationpractice.blogspot.com/
2. Capture the title of the current (parent) page
3. Click the "New Tab" button
4. Capture the newly opened tab using the 'page' event
5. Store pages using Promise.all()
6. Validate titles of both parent and child pages
7. Demonstrate switching between pages using references
*/
test('Verify tab handling ', async () => {

    // Create a new browser instance
    const browser: Browser = await chromium.launch();

    // Create a new isolated browser context
    const browserContext: BrowserContext = await browser.newContext();

    // Open a new page (this will act as the parent page)
    const parentPage: Page = await browserContext.newPage();

    // Navigate to the automation practice website
    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    // Capture and print the title of the parent page
    console.log("Title of parent page :", await parentPage.title());

    // Validate the title of the parent page
    await expect(parentPage).toHaveTitle('Automation Testing Practice');

    // Locate the "New Tab" button on the page
    const newTabButton: Locator = parentPage.locator("button:has-text('New Tab')");

    /*
    Handle new tab creation
    Promise.all ensures that Playwright listens for the page event
    while simultaneously clicking the button that opens the tab.
    */
    const [childPage] = await Promise.all([browserContext.waitForEvent('page'), newTabButton.click()]);

    // Wait until the child tab finishes loading
    await childPage.waitForLoadState();

    // Capture and print the title of the child tab
    console.log("Title of child page :", await childPage.title());

    // Validate the title of the child page
    await expect(childPage).toHaveTitle('SDET-QA Blog');

    // Close browser context
    await browserContext.close();

    // Close browser
    await browser.close();
})
/*
Test Case 2: Verify Window Handling
Steps:
1. Navigate to the same website
2. Click the "Popup Windows" button
3. Capture the popup window using the 'popup' event
4. Retrieve all open pages/windows using browserContext.pages()
5. Print title and URL for each window
*/
test('Verify window handling', async () => {

    // Create a new browser instance
    const browser: Browser = await chromium.launch();

    // Create a new browser context
    const browserContext: BrowserContext = await browser.newContext();

    // Open a new page
    const page: Page = await browserContext.newPage();

    // Navigate to the automation practice website
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Validate page title
    await expect(page).toHaveTitle('Automation Testing Practice');

    // Print page title and URL
    console.log("Title of the page :", await page.title())
    console.log("URL of the page :", page.url())

    /*
    Handle popup window
    Clicking the "Popup Windows" button opens a new window.
    Playwright captures it using the 'popup' event.
    */
    const newWindowButton: Locator = page.locator("button:has-text('Popup Windows')");

    const [window] = await Promise.all([page.waitForEvent('popup'), newWindowButton.click()]);

    // Wait for the popup window to load completely
    await window.waitForLoadState();
    /*
    Retrieve all open pages/windows from the browser context
    This includes the original page and the popup window.
    */
    const allWindowPages: Page[] = browserContext.pages();

    // Count total open pages/windows
    const totalPages: number = allWindowPages.length;
    console.log("Total pages/windows :", totalPages);

    // Access first window (original page)
    const window1:Page = allWindowPages[0];
    if (window1) {
        console.log("Window1 Title :", await window1.title());
        console.log("URL of the Window1", window1.url());
    }

    // Access second window (popup window)
    const window2:Page = allWindowPages[1];
    if (window2) {
        console.log("Window2 Title :", await window2.title());
        console.log("URL of the Window2", window2.url());
    }

    // Access third window (popup window)
    // const window3: Page | undefined = allWindowPages[2];
    // if (window3) {
    //     console.log("Window3 Title :", await window3.title());
    //     console.log("URL of the Window3", window3.url());
    // }


    // Interact with each window using its own page reference (not the parent page)
    for (const currentPage of allWindowPages) {
        const title = await currentPage.title();

        if (title.includes('Automation Testing Practice')) {
            const dynamicButton:Locator = currentPage.locator('button[onclick="toggleButton(this)"]');
            await dynamicButton.click();
            await expect(dynamicButton).toContainText('STOP');
        } else if (title.includes('Playwright')) {
            const getStarted:Locator = currentPage.getByRole('link', { name: /get started/i }).first();
            await getStarted.click();
        }
    }

    // Close browser context
    await browserContext.close();

    // Close browser
    await browser.close();

})