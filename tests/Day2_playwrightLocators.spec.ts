// These are the recommended built-in locators.
// 1. page.getByAltText()     — locate an element (usually an image) by its alt text.
// 2. page.getByText()        — locate elements by visible text content.
// 3. page.getByRole()        — locate by ARIA role and accessibility attributes.
// 4. page.getByLabel()       — locate a form control by its associated label text.
// 5. page.getByPlaceholder() — locate an input by its placeholder text.
// 6. page.getByTitle()       — locate an element by its title attribute.
// 7. page.getByTestId()      — locate an element using its data-testid attribute (configurable).

import { test, expect, Locator } from '@playwright/test';

test('Locator identification', async ({ page }) => {

    // -------------------------------------------------
    // 1. getByAltText() — Image identified by alt text
    // -------------------------------------------------
    await page.goto('https://www.testingmavens.com/');

    const logo: Locator = page.getByAltText('Testing Mavens');
    await expect(logo).toBeVisible();
    await logo.click();


    // -------------------------------------------------
    // 3. getByRole() — ARIA role with accessible name
    // -------------------------------------------------
    const mainHeading: Locator = page.getByText('Elevating Software ');
    await expect(mainHeading).toContainText(" Elevating Software ");

    const headTxt: Locator = page.getByRole('heading', { name: 'Elevating Software ' });
    await expect(headTxt).toBeVisible();

    const trustedHeading: Locator = page.getByRole('heading', { name: 'Trusted by Leading Companies.' });
    await expect(trustedHeading).toBeVisible();

    
  // -------------------------------------------------
  // Navigate to second site
  // ------------------------------------------------
    await page.goto('https://testautomationpractice.blogspot.com/');
    const startButton: Locator = page.getByRole('button', { name: 'START' });
    await expect(startButton).toBeVisible();

  // -------------------------------------------------
  // 4. getByLabel() — Locate by associated label
  // -------------------------------------------------
    const genderLabel: Locator = page.getByText('Gender:');
    await expect(genderLabel).toBeVisible();

  // -------------------------------------------------
  // 5. getByPlaceholder() — Locate input by placeholder
  // -------------------------------------------------
    const nameInput: Locator = page.getByPlaceholder('Enter Name');
    await expect(nameInput).toBeVisible();

  // -------------------------------------------------
  // 6. getByTitle() — Locate by title attribute
  // -------------------------------------------------
    const pageTitleElement:Locator = page.getByTitle('Automation Testing Practice').first();
    // await expect(pageTitleElement).toContainText('Automation Testing Practice');

  // -------------------------------------------------
  // 7. getByTestId() — Example (commented as site has none)
  // -------------------------------------------------
  // const exampleTestId: Locator = page.getByTestId('example-id');
  // await expect(exampleTestId).toBeVisible();

})

// npx playwright test playwrightLocators.spec.ts
