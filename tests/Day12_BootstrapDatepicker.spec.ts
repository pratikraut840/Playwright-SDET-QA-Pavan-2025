import { test, Locator, expect } from '@playwright/test';

test('Verify the bootstrap date picker', async ({ page }) => {
    await page.goto("https://www.booking.com/");

    // Locate the popup
    const popup: Locator = page.locator('[role="dialog"]');
    const signButtonText = page.locator("//span[text()='Sign in or register']");

    //check if popup is visible
    if (await popup.isVisible() || await signButtonText.isVisible()) {
        console.log("Popup is visible");
        //close prompt popup
        const crossIcon: Locator = page.locator('[aria-label="Dismiss sign in information."]');
        await crossIcon.click();
        console.log('Popup closed');
    }


    await page.locator('[data-testid="searchbox-dates-container"]').click();

    let checkInMonth: string = "April 2027"
    let checkInDay: string = "20"

    let checkOutMonth: string = "May 2027"
    let checkOutDay: string = "25"



    let moveCalendar: boolean = true;

    while (moveCalendar) {

        const checkInMonthText: string|null = await page.locator('[data-testid="searchbox-datepicker-calendar"] h3').nth(0).textContent();
        const checkoUTMonthText: string|null = await page.locator('[data-testid="searchbox-datepicker-calendar"] h3').nth(1).textContent();

        const nextMonthButton: Locator = page.locator('button[aria-label="Next month"]');

        if (checkInMonthText === checkInMonth) {
            moveCalendar = false;
            break;
        }
        await nextMonthButton.click();
    }

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

    for (let date of checkOutTable) {
        if (await date.innerText() === checkOutDay) {
            await date.click();
            checkOutDateSelected = true;
            break;
        }
    }
    expect(checkOutDateSelected).toBeTruthy();



})