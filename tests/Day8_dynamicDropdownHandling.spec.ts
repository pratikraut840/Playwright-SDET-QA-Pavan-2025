// ==========================================================
// Day 8: Actions | Bootstrap Dropdowns | Dynamic Dropdown
// ==========================================================
//
// Types of Dropdowns:
// 1. Static Dropdown  – <select> tag (options remain fixed)
// 2. Dynamic/Auto-Suggest Dropdown – Options change dynamically (e.g., search suggestions)
// 3. Hidden Dropdown – Custom styled dropdowns (not visible in DOM until triggered)
//
// This file demonstrates:
//  - Handling Dynamic dropdown (Flipkart)
//  - Handling Bootstrap dropdown (OrangeHRM)
//
// ==========================================================

import { test, expect, Locator } from '@playwright/test';


// ==========================================================
// TEST 1: Handling Dynamic / Auto-Suggest Dropdown
// Website: Flipkart
// ==========================================================
test('Verify dynamic dropdown', async ({ page }) => {

    // Step 1: Navigate to Flipkart homepage
    await page.goto("https://www.flipkart.com/");

    // Step 2: Enter text inside search box
    await page.locator('form>div>div>input[name="q"]').fill("smart");

    // Wait for suggestions to load (Better practice: use waitForSelector instead)
    await page.waitForTimeout(3000);

    // Step 3: Capture all suggested dropdown options
    // NOTE: Emulate focused page if suggestions disappear
    const suggestedOptions: Locator = page.locator("ul>li");

    // Validate total suggestion count
    await expect(suggestedOptions).toHaveCount(8);

    const optionsCount: number = await suggestedOptions.count();
    console.log("The total suggested count is ", optionsCount);

    // Step 4: Print the 5th option (index starts from 0)
    const fifthOption = await suggestedOptions.nth(5).textContent();
    console.log("Fifth option is: " + fifthOption);

    // Step 5: Print all suggestions using loop
    // Demonstrating difference between textContent() and innerText()
    for (let i = 0; i < optionsCount; i++) {

        const optionValue1 = await suggestedOptions.nth(i).textContent();
        console.log("Using textContent():", optionValue1);

        const optionValue2 = await suggestedOptions.nth(i).innerText();
        console.log("Using innerText():", optionValue2);
    }

    // Step 6: Click on "smartphone" from suggestions
    for (let i = 0; i < optionsCount; i++) {

        const text = await suggestedOptions.nth(i).innerText();

        if (text === 'smartphone') {

            await suggestedOptions.nth(i).click();

            console.log("Clicked successfully on option: " +
                await suggestedOptions.nth(i).innerText());

            break;
        }
    }

    await page.waitForTimeout(3000);
});


// ==========================================================
// TEST 2: Handling Bootstrap Dropdown
// Website: OrangeHRM
// ==========================================================
test.only('Verify bootstrap dropdown on OrangeHRM', async ({ page }) => {

    // Step 1: Open OrangeHRM login page
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // Step 2: Login with valid credentials
    await page.locator('input[placeholder="Username"]').fill("Admin");
    await page.locator('input[placeholder="Password"]').fill("admin123");
    await page.locator('button[type="submit"]').click();

    // Step 3: Click on PIM from left side menu
    await page.getByText('PIM').click();

    await page.waitForTimeout(2000);

    // Step 4: Click on Job Title dropdown
    // (Bootstrap styled dropdown – not a <select> tag)
    await page.locator('form i').nth(2).click();

    // Step 5: Capture all dropdown options
    const jobTitleDropdown: Locator = page.locator('div[role="listbox"] span');

    const jobListCount: number = await jobTitleDropdown.count();
    console.log("Total Job Titles:", jobListCount);

    // Step 6: Print first option
    const firstTitle: string | null = await jobTitleDropdown.nth(1).textContent();
    console.log("First Job Title:", firstTitle);

    // Note: allInnerTexts() is used to capture multiple inner texts at once
    const allInnerTexts: string[] = await jobTitleDropdown.allInnerTexts();
    console.log("All Job Titles:", allInnerTexts);

    await page.waitForTimeout(2000);

    // Step 7: Print all options using loop
    for (let i = 0; i < jobListCount; i++) {

        const textContent = await jobTitleDropdown.nth(i).textContent();
        console.log("Using textContent():", textContent);

        const innerText = await jobTitleDropdown.nth(i).innerText();
        console.log("Using innerText():", innerText);
    }

    // Step 8: Click on "Content Specialist"
    for (let i = 0; i < jobListCount; i++) {
        const text = await jobTitleDropdown.nth(i).innerText();

        if (text.includes('Automaton Tester')) {

            await jobTitleDropdown.nth(i).click();

            await page.waitForTimeout(2000);
            console.log("Clicked successfully");
            console.log("Clicked successfully on:", text);
            break;
        }
    }
});
