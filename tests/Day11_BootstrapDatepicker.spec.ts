import { test, Locator, expect } from '@playwright/test';

test('Verify Booking.com bootstrap date picker', async ({ page }) => {
    // --- 1. Navigate to Booking.com ---
    await page.goto("https://www.booking.com/");
    await page.waitForLoadState('domcontentloaded');

    // --- 2. Dismiss sign-in popup (blocking overlay) ---
    const dismissBtn = page.locator('[aria-label="Dismiss sign-in information."], [aria-label="Dismiss sign in information."]');
    try {
        await dismissBtn.first().waitFor({ state: 'visible', timeout: 5000 });
        await dismissBtn.first().click();
        await page.waitForTimeout(1000);
        console.log('Popup is visible and closed using Try block');
    } catch {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
        console.log('Popup is visible and closed using Catch block');
    }

    // --- 3. Open calendar by clicking date picker ---
    await page.locator('[data-testid="searchbox-dates-container"]').click();

    // --- 4. Configure desired dates ---
    let checkInMonth: string = "April 2027"
    let checkInDay: string = "20"

    let checkOutMonth: string = "May 2027"
    let checkOutDay: string = "25"



    // --- 5. Navigate to check-in month using while loop ---
    let moveCalendar: boolean = true;

    while (moveCalendar) {

        const checkInMonthText: string|null = await page.locator('[data-testid="searchbox-datepicker-calendar"] h3').nth(0).textContent();
        //const checkoUTMonthText: string|null = await page.locator('[data-testid="searchbox-datepicker-calendar"] h3').nth(1).textContent();

        const nextMonthButton: Locator = page.locator('button[aria-label="Next month"]');

        if (checkInMonthText === checkInMonth) {
            moveCalendar = false;
            break;
        }
        await nextMonthButton.click();
    }

    // --- 6. Select check-in and check-out dates ---
    // nth(0) = first month (check-in), nth(1) = second month (check-out)
    const checkInTable: Locator[] = await page.locator('.d7bd90e008 tbody').nth(0).locator("td").all();
    const checkOutTable: Locator[] = await page.locator('.d7bd90e008 tbody').nth(1).locator("td").all();

    let checkInDateSelected: boolean = false;
    let checkOutDateSelected: boolean = false;

    for (let date of checkInTable) {

        if (await date.innerText() === checkInDay) {
            await date.click();
            checkInDateSelected = true;
            break;
        }
    }
    expect(checkInDateSelected).toBeTruthy();

    // Select check-out date (may require next month if in second calendar panel)
    for (let date of checkOutTable) {
        if (await date.innerText() === checkOutDay) {
            await date.click();
            checkOutDateSelected = true;
            break;
        }
    }
    expect(checkOutDateSelected).toBeTruthy();


    await page.waitForTimeout(5000);

})