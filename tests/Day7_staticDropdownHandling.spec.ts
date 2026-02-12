// Day7: Actions | Static Dropdowns | Select Options | Part1
// Single select dropdown (static dropdown)


/**
 * Test Suite: Dropdown validations using Playwright
 * Website: https://testautomationpractice.blogspot.com/
 *
 * This file covers:
 * 1. Single select dropdown operations
 * 2. Multi-select dropdown operations
 * 3. Sorted dropdown verification
 * 4. Duplicate value identification using Set
 */

import { test, expect, Locator } from '@playwright/test';

/**
 * ------------------------------------------------------
 * Test Case: Verify Single Select Dropdown
 * ------------------------------------------------------
 * Validates:
 * - Dropdown visibility and enablement
 * - Multiple ways of selecting dropdown values
 * - Option count
 * - Presence of a specific option
 * - Printing all dropdown options
 */
test('Verify single select dropdown', async ({ page }) => {

    // Navigate to application
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Validate page title
    const pageTitle: string = await page.title();
    expect(pageTitle).toBe("Automation Testing Practice");

    // Locate single-select dropdown
    const countryDropdown: Locator = page.locator("#country");

    // Validate dropdown state
    await expect(countryDropdown).toBeVisible();
    await expect(countryDropdown).toBeEnabled();

    // Select option from dropdown using different approaches

    // 1 Select by visible text
    await countryDropdown.selectOption('India');

    // 2 Select by value attribute
    await countryDropdown.selectOption({ value: 'india' });

    // 3 Select by label
    await countryDropdown.selectOption({ label: 'India' });

    // 4 Select by index
    await countryDropdown.selectOption({ index: 3 });

    // Validate number of options in dropdown
    const dropdownOptions: Locator = page.locator("#country>option");
    await expect(dropdownOptions).toHaveCount(10);

    // Verify specific option exists
    const allOptionsContent: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());

    expect(allOptionsContent).toContain('Japan');

    // Print all dropdown values
    console.log('All dropdown options:', allOptionsContent);
    for (const option of allOptionsContent) {
        console.log('Option:', option);
    }
});

/**
 * ------------------------------------------------------
 * Test Case: Verify Multi-Select Dropdown
 * ------------------------------------------------------
 * Validates:
 * - Multiple selection techniques
 * - Option count
 * - Presence of specific option
 * - Printing all values
 */
test('Multi select dropdown', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    expect(await page.title()).toBe("Automation Testing Practice");

    const colourDropdown: Locator = page.locator("#colors");

    await expect(colourDropdown).toBeVisible();
    await expect(colourDropdown).toBeEnabled();

    // Select multiple values using different technique
    // 1 Select by visible text
    await colourDropdown.selectOption(["Red"]);

    // 2 Select by value attribute
    await colourDropdown.selectOption(["red", "green"]);

    // 3 Select by label
    await colourDropdown.selectOption([
        { label: "Red" },
        { label: "Green" }
    ]);

    // 4 Select by index
    await colourDropdown.selectOption([
        { index: 4 }
    ]);

    // Validate number of dropdown options
    const colourOptions: Locator = page.locator("#colors>option");
    await expect(colourOptions).toHaveCount(7);

    // Validate specific option exists
    const options: string[] = (await colourOptions.allTextContents()).map(text => text.trim());

    expect(options).toContain('Blue');

    // Print all options
    console.log("Color options:", options);
    for (const option of options) {
        console.log("Color:", option);
    }
});

/**
 * ------------------------------------------------------
 * Test Case: Verify Sorted Dropdown List
 * ------------------------------------------------------
 * Validates:
 * - Dropdown values are already sorted alphabetically
 */
test('Verify sorted list dropdown', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    expect(await page.title()).toBe("Automation Testing Practice");

    // Capture dropdown values
    const sortedArray: Locator = page.locator("#animals>option");
    const listValues: string[] = (await sortedArray.allTextContents()).map(text => text.trim());

    // Create copy of original list
    const originalList: string[] = [...listValues];
    console.log("Original List:", originalList);

    // Sort copied list
    const sortedList: string[] = [...listValues].sort();
    console.log("Sorted List:", sortedList);

    // Validate dropdown is already sorted
    expect(originalList).toEqual(sortedList);
});

/**
 * ------------------------------------------------------
 * Test Case: Verify Duplicate Dropdown Elements
 * ------------------------------------------------------
 * Validates:
 * - Detection of duplicate values using Set
 * - Separation of unique and duplicate elements
 */
test('Verify duplicate array elements', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    expect(await page.title()).toBe("Automation Testing Practice");

    // Dropdown containing duplicates
    const colourList: Locator = page.locator("#colors>option");

    // Normalize dropdown values (trim whitespace)
    const optionText: string[] = (await colourList.allTextContents()).map(text => text.trim());

    // Set for unique values (no duplicates allowed)
    const uniqueList = new Set<string>();

    // Array for duplicate values
    const duplicateList: string[] = [];

    //Identify duplicates
    for (const text of optionText) {
        if (uniqueList.has(text)) {
            duplicateList.push(text);
        } else {
            uniqueList.add(text);
        }
    }

    // Print results
    console.log("Unique Values:", [...uniqueList]);
    console.log("Duplicate Values:", duplicateList);

    // Optional assertion example:
    // expect(duplicateList.length).toBeGreaterThan(0);
});
