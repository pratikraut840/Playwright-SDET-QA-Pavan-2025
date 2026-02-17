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

import { test, expect, Locator } from '@playwright/test';

test('Verify JQuery date picker', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const datePicker: Locator = page.locator("#datepicker");
    await expect(datePicker).toBeVisible();
    await datePicker.click();

    const nextMonthButton: Locator = page.locator(".ui-datepicker-next");
    const prevMonthButton: Locator = page.locator(".ui-datepicker-prev");

    const targetYear: string = '2028';
    const targetMonth: string = 'May';
    const targetDay: string = '20';

    let moveCalendar:boolean=true;

    while (moveCalendar) {

        const currentYear: Locator = page.locator(".ui-datepicker-year");
        const currentMonth: Locator = page.locator(".ui-datepicker-month");

        const currentYearText = await currentYear.textContent();
        const currentMonthText = await currentMonth.textContent()


        if (currentMonthText === targetMonth && currentYearText === targetYear) {
            moveCalendar=false;
            break;
        }

        await nextMonthButton.click();
    }
        const allDates: Locator[] = await page.locator(".ui-datepicker-calendar td").all();

        for (let date of allDates) {
            const getDate = await date.innerText();

            if (getDate === targetDay) {
                await date.click();
            }
        }

})