/**
 * ============================================================
 * PLAYWRIGHT ASSERTIONS DOCUMENTATION
 * ============================================================
 * Assertions are used to verify that the application behaves as expected during automated testing.
 * Playwright provides different types of assertions:
 * 1. Auto-Retrying Assertions
 * 2. Hard Assertions
 * 3. Soft Assertions
 * 4. Non-Retrying Assertions
 * 5. Negating Matchers
 */
import { test, expect } from '@playwright/test';
/**
 * ============================================================
 * 1. AUTO-RETRYING ASSERTIONS
 * ============================================================
 * Auto-retrying assertions automatically retry the assertion until the expected condition becomes true or the timeout limit is reached.
 */

test('Verify auto retry assertions', async ({ page }) => {

    // Navigate to Playwright documentation page
    await page.goto('https://playwright.dev/docs/codegen');

    // Locate the "locators" link on the page
    const locatorLink = page.locator(`//p//a[@href="/docs/locators" and text()='locators']`);

    // Assertion automatically retries until text appears
    await expect(locatorLink).toHaveText('locators');

    // Assertion verifies the page title
    await expect(page).toHaveTitle('Test generator | Playwright');
});
/**
 * ============================================================
 * 2. HARD ASSERTIONS
 * ============================================================
 * Hard assertions stop the test execution immediately when the assertion fails.
 * Default Playwright expect() behaves as a hard assertion.
 * If one assertion fails, the remaining test steps will NOT execute.
 */
test('Verify hard assertions', async ({ page }) => {

    await page.goto('https://playwright.dev/docs/codegen');

    const locatorLink = page.locator(`//p//a[@href="/docs/locators" and text()='locators']`);

    // If this assertion fails, the next step will not execute
    await expect(locatorLink).toHaveText('locators');

    await expect(page).toHaveTitle('Test generator | Playwright');
});
/**
 * ============================================================
 * 3. NON-RETRYING ASSERTIONS
 * ============================================================
 * Non-retrying assertions are used for validating normal values.
 * These assertions:
 * - Do NOT auto retry
 * - Execute immediately
 * - Are used for variables or static values
 */
test('Verify non-retrying assertions', async () => {

    const framework = "Playwright";
    const version = 1.40;

    expect(framework).toBe("Playwright");
    expect(framework).toContain("Play");
    expect(framework.length).toBe(10);
});
/**
 * ============================================================
 * 4. NEGATING MATCHERS
 * ============================================================
 * Negating matchers allow verifying the opposite condition.
 */

test('Verify negating assertions', async ({ page }) => {

    await page.goto('https://playwright.dev/docs/codegen');

    const locatorLink = page.locator(`//p//a[@href="/docs/locators"]`);

    // Verify text is NOT equal to another value
    await expect(locatorLink).not.toHaveText('playwright');
});
/**
 * ============================================================
 * 5. SOFT ASSERTIONS
 * ============================================================
 * Soft assertions allow the test to continue execution even if the assertion fails.
 * Instead of stopping the test, failures are collected and shown in the final test report.
 * Syntax: expect.soft()
 */

test('Verify soft assertions', async ({ page }) => {

    await page.goto('https://playwright.dev/docs/codegen');

    const locatorLink = page.locator(`//p//a[@href="/docs/locators" and text()='locators']`);

    // Soft assertion (test continues even if it fails)
    await expect.soft(locatorLink).not.toHaveText('locators');

    // Test execution continues
    await expect(page).toHaveTitle('Test generator | Playwright');
});