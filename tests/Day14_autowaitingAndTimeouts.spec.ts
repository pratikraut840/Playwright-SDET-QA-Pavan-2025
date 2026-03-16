import { test, expect , Locator} from '@playwright/test';
/*
Actions - Auto-Waits
• Auto-waiting means Playwright automatically waits for certain conditions 
  (called Actionability checks) before performing actions like click(), fill(), type() etc.
• Default action timeout in Playwright is 30 seconds.

Before performing a click(), Playwright waits until:
• The element is attached to the DOM
• It is visible
• It is stable (not moving)
• It is enabled
• It is not covered by another element
*/

// Global timeout can be configured in playwright.config.ts (default is 30s)
// Local timeout can also be configured at the test level

test('Verify auto waiting mechanism', async ({ page }) => {
    test.setTimeout(50_000); // Sets timeout for this specific test to 50 seconds

    await page.goto('https://playwright.dev/docs/actionability');

    const testTimeoutLink: Locator = page.locator("(//a[normalize-space()='locator.click()'])[1]");

    // force:true bypasses Playwright actionability checks and forces the click action
    await testTimeoutLink.click({ force: true });

})
/*
Timeout Types in Playwright
• Global timeout can be configured in playwright.config.ts
• Local timeout can be configured at test level
• Assertion timeout can also be customized
• Local timeout overrides the global timeout when specified
*/
test('Verify Assertion timeout mechanism', async ({ page }) => {

    test.slow(); // Marks the test as slow and triples the default timeout

    // Navigation timeout set to 40 seconds for page load
    await page.goto('https://playwright.dev/docs/test-timeouts', { timeout: 40_000 });

    const copyButton: Locator = page.locator("(//button[@class='clean-btn'])[1]");

    // Default assertion timeout is used
    await expect(copyButton).toBeVisible();

    // Custom assertion timeout set to 30 seconds
    await expect(copyButton).toBeVisible({ timeout: 30_000 }); // local assertion timeout
})