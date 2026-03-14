import { test, expect } from '@playwright/test';

test('Select check-in date on booking.com', async ({ page }) => {
    // 1. Navigate to https://booking.com/
    await page.goto('https://www.booking.com/');
    await page.waitForLoadState('domcontentloaded');

    // Dismiss sign-in popup - wait for overlay and close (blocking element)
    const dismissBtn = page.locator('[aria-label="Dismiss sign-in information."], [aria-label="Dismiss sign in information."]');
    try {
        await dismissBtn.first().waitFor({ state: 'visible', timeout: 5000 });
        await dismissBtn.first().click();
        await page.waitForTimeout(1000);
    } catch {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
    }

    // 2. Click on the date picker field to open calendar
    await page.locator('[data-testid="searchbox-dates-container"]').click({ force: true });

    // Wait for calendar to be visible
    await page.locator('[data-testid="searchbox-datepicker-calendar"]').waitFor({ state: 'visible', timeout: 10000 });

    // Desired check-in date (configurable)
    const desiredCheckInMonth = 'April 2026';
    const desiredCheckInDay = '15';

    // 3a. Navigate through calendar to find the desired check-in month and year using while loop
    const maxMonthsToNavigate = 24; // Prevent infinite loop
    let monthsNavigated = 0;
    let foundDesiredMonth = false;

    while (!foundDesiredMonth && monthsNavigated < maxMonthsToNavigate) {
        const currentMonthText = await page
            .locator('[data-testid="searchbox-datepicker-calendar"] h3')
            .nth(0)
            .textContent();

        if (currentMonthText?.trim() === desiredCheckInMonth) {
            foundDesiredMonth = true;
            break;
        }

        await page.locator('button[aria-label="Next month"]').click();
        monthsNavigated++;
    }

    expect(foundDesiredMonth).toBeTruthy();

    // 3b. Select the specific check-in date
    const checkInDateCells = await page
        .locator('.d7bd90e008 tbody')
        .nth(0)
        .locator('td')
        .all();

    let checkInDateSelected = false;
    for (const cell of checkInDateCells) {
        const dayText = await cell.innerText();
        if (dayText.trim() === desiredCheckInDay) {
            await cell.click();
            checkInDateSelected = true;
            break;
        }
    }

    // 3c. Assertion to confirm check-in date was selected
    expect(checkInDateSelected).toBeTruthy();

    // Verify the selected date appears in the date picker field
    const datePickerValue = await page
        .locator('[data-testid="searchbox-dates-container"]')
        .textContent();
    expect(datePickerValue).toContain(desiredCheckInDay);
});
