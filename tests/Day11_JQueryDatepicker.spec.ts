/*
// Todo | JQuery date picker:
1.	Navigate to https://testautomationpractice.blogspot.com/
2.	Locate the JQuery dropdown and check visibility and fill date using fill() method
3.	Locate the actual Month & year from the first date picker and compare it with target/expected future date and month using while loop
1.	If it is not matching then click on next month button
2.	If it is matching then break the loop
4.	Locate all the actual date from each month and compare it with target date
1.	If date is matching then select the date and break the loop
5.	Make the code dynamic the same code for past date selection using only one locator change
6.	Create the common function to select the date
1.	Function named as selectDate with parameter year, month, date and page (from playwright), isFuture
2.	Make the function async to support await
3.	Check the condition if future date is passed in function then click on next month button else click on past month button
*/

import { test, expect, Locator, Page } from '@playwright/test';
/*
Test 1: Verify basic JQuery date picker selection
Select a past date using the calendar UI.
*/
test('Verify JQuery date picker 1', async ({ page }) => {
    // 1. Navigate to the test page
    await page.goto("https://testautomationpractice.blogspot.com/");

    // 2. Locate the JQuery date picker input field and ensure it's visible
    const datePicker: Locator = page.locator("#datepicker");
    await expect(datePicker).toBeVisible();

    // Click to open the date picker
    await datePicker.click();

    // 3. Locate navigation buttons for months
    const nextMonthButton: Locator = page.locator(".ui-datepicker-next");
    const prevMonthButton: Locator = page.locator(".ui-datepicker-prev");

    // 4. Set target date to select
    const targetYear: string = '2000';
    const targetMonth: string = 'May';
    const targetDay: string = '20';

    // 5. Navigate calendar until target month/year is displayed
    let moveCalendar = true;
    while (moveCalendar) {
        const currentYearText = await page.locator(".ui-datepicker-year").textContent();
        const currentMonthText = await page.locator(".ui-datepicker-month").textContent();

        // Stop looping if target month and year is found
        if (currentMonthText === targetMonth && currentYearText === targetYear) {
            moveCalendar = false;
            break;
        }

        // Click previous month to navigate back in time
        await prevMonthButton.click();
    }

    // 6. Select the target day
    const allDates: Locator[] = await page.locator(".ui-datepicker-calendar td:not(.ui-datepicker-other-month)").all();
    for (let date of allDates) {
        if ((await date.innerText()) === targetDay) {
            await date.click();
            break;
        }
    }

    // Wait briefly to observe selection
    await page.waitForTimeout(3000);
});


/* 
Test 2: Use a reusable common function to select any date
Supports both past and future dates dynamically.
*/
test('Verify date picker using common function', async ({ page }) => {
    // Navigate to the test page
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Define the target date
    const targetYear: string = '2050';
    const targetMonth: string = 'May';
    const targetDay: string = '20';

    async function selectDate(year: string, month: string, day: string, page: Page, isFuture: boolean) {
        // Open the date picker input
        const datePicker = page.locator("#datepicker");
        await datePicker.click();

        // Locate month navigation buttons
        const nextMonthButton = page.locator(".ui-datepicker-next");
        const prevMonthButton = page.locator(".ui-datepicker-prev");

        // Navigate to the target month/year
        let moveCalendar = true;
        while (moveCalendar) {
            const currentYearText = await page.locator(".ui-datepicker-year").textContent();
            const currentMonthText = await page.locator(".ui-datepicker-month").textContent();

            if (currentMonthText === month && currentYearText === year) {
                moveCalendar = false;
                break;
            }

            // Click next or previous month based on isFuture
            if (isFuture) {
                await nextMonthButton.click();
            } else {
                await prevMonthButton.click();
            }
        }

        // Select the target day from current month
        const allDates = await page.locator(".ui-datepicker-calendar td:not(.ui-datepicker-other-month)").all();
        for (let date of allDates) {
            if ((await date.innerText()) === day) {
                await date.click();
                break;
            }
        }
    }

    // Call the common function to select the target date
    await selectDate(targetYear, targetMonth, targetDay, page, true);

    await page.waitForTimeout(3000);
});


/* 
Test 3: Handle another date picker input (#txtDate)
This demonstrates selecting a future date using a second date picker field.
*/
test('Verify JQuery date picker 2', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Click to open the second date picker input
    await page.locator("#txtDate").click();

    // Locate the month and year dropdowns (if they are <select> elements)
    const selectMonth: Locator = page.locator(".ui-datepicker-month");
    const selectYear: Locator = page.locator(".ui-datepicker-year");

    // All date cells in the calendar
    const selectDate: Locator[] = await page.locator(".ui-datepicker-calendar td:not(.ui-datepicker-other-month)").all();

    // Define target date
    const targetYear: string = "2035";
    const targetMonth: string = "Aug";
    const targetDate: string = "25";

    // Loop through the dates and select the matching day
    for (let date of selectDate) {
        if ((await date.innerText()) === targetDate) {
            // Select month and year if dropdowns exist
            await selectMonth.selectOption(targetMonth);
            await selectYear.selectOption(targetYear);

            // Click the target date
            await date.click();
            break;
        }
    }

    await page.waitForTimeout(3000);
});
