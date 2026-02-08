/**
 * This test suite covers common HTML element interactions using Playwright:
 * - Text input fields
 * - Radio buttons
 * - Checkboxes
 *
 * Application under test:
 * https://testautomationpractice.blogspot.com/
 */

import { test, expect, Locator } from '@playwright/test';


test('Verify Text input actions', async ({ page }) => {
    /**
 * Test: Verify Text input actions
 * Validates:
 * - Visibility & enablement of input field
 * - maxlength attribute
 * - Entered value using inputValue()
 */

    // Navigate to application
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Validate page title
    const pageTitle: string = await page.title();
    expect(pageTitle).toBe("Automation Testing Practice");

    // Locate name input box
    const nameInputbox: Locator = page.locator("#name");

    // Validate input field state
    await expect(nameInputbox).toBeVisible();
    await expect(nameInputbox).toBeEnabled();

    // Validate maxlength attribute
    const maxLength: string | null = await nameInputbox.getAttribute("maxlength");
    expect(maxLength).toBe('15');

    // Enter text into input field
    await nameInputbox.fill("Nitish Reddy");

    /**
     * NOTE:
     * textContent() returns inner text between tags,
     * which is empty for input elements.
     * Hence, inputValue() should be used.
     */

    // Validate entered text
    const enteredValue: string = await nameInputbox.inputValue();
    expect(enteredValue).toBe("Nitish Reddy");
});



test('Verify radio buttons', async ({ page }) => {
    /**
 * Test: Verify radio buttons
 * Validates:
 * - Default unchecked state
 * - Ability to select radio button
 * - State after selection
 */

    // Navigate to application
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Validate page title
    const pageTitle: string = await page.title();
    expect(pageTitle).toBe("Automation Testing Practice");

    // Locate male radio button
    const maleRadio: Locator = page.locator("#male");

    // Validate radio button state
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();

    // Validate default unchecked state
    const beforeClickStatus: boolean = await maleRadio.isChecked();
    expect(beforeClickStatus).toBe(false);
    await expect(maleRadio).not.toBeChecked();

    // Select radio button
    await maleRadio.check();

    // Validate checked state
    const afterClickStatus: boolean = await maleRadio.isChecked();
    expect(afterClickStatus).toBe(true);
    await expect(maleRadio).toBeChecked();

    // Hard wait (used only for demo/learning purpose)
    await page.waitForTimeout(3000);
});


/**
 * Test: Verify checkboxes actions
 * Covers:
 * - Single checkbox selection
 * - Selecting all checkboxes
 * - Unchecking specific checkboxes using slice()
 * - Toggle logic
 * - Index-based selection
 * - Label-based selection
 */
test('Verify checkboxe actions', async ({ page }) => {

    // Navigate to application
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Validate page title
    const pageTitle: string = await page.title();
    expect(pageTitle).toBe("Automation Testing Practice");

    // Locate Sunday checkbox using label
    const sunCheckbox: Locator = page.getByLabel("Sunday");

    // Validate checkbox state
    await expect(sunCheckbox).toBeVisible();
    await expect(sunCheckbox).toBeEnabled();

    // Validate default unchecked state
    const sunCheckboxStatusBefore: boolean = await sunCheckbox.isChecked();
    expect(sunCheckboxStatusBefore).toBe(false);

    // i. Select specific checkbox (Sunday)
    await sunCheckbox.check();
    const sunCheckboxStatusAfter: boolean = await sunCheckbox.isChecked();
    expect(sunCheckboxStatusAfter).toBe(true);

    //ii. Create list of checkbox locators using map()
    const days: string[] = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const checkboxes: Locator[] = days.map(day => page.getByLabel(day));

    //iii. Select all checkboxes and assert
    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    await page.waitForTimeout(3000);

    // iv. Uncheck last 3 checkboxes using slice()
    const last3Days: Locator[] = checkboxes.slice(-3);

    for (const checkbox of last3Days) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(3000);

    // v. Toggle checkboxes, If checked → uncheck, If unchecked → check
    for (const checkbox of checkboxes) {
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
    await page.waitForTimeout(3000);

    // vi. Select checkboxes by index and assert
    const indexes: number[] = [1, 3, 6];
    for (const i of indexes) {
        await checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked();
    }
    await page.waitForTimeout(3000);

    // vii. Select checkbox based on label dynamically
    const dayName: string = "Friday";

    for (const label of days) {
        if (label.toLowerCase() === dayName.toLowerCase()) {
            const checkbox = page.getByLabel(label);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
});
