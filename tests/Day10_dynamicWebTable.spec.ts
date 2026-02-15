//Dynamic web table: web table contains dynamically changing rows and columns.
/*
// Todo
1.	Open URL https://practice.expandtesting.com/dynamic-table
2.	For Chrome process get value of CPU load.
1.	Identify and locate the entire table body
2.	Capture all rows (<tr>) from the table body.
3.	Iterate each row to check Chrome name/process presence
	Read the first column value using nth(0) to identify the process name.
	Apply a conditional check If the process name equals "Chrome", then:
	Locate the CPU load value using a CSS locator:
	locator("td:has-text('%')") OR locator("td", { hasText: '%' })
	Extract and store the CPU load value.
*/

import { test, expect, Locator } from '@playwright/test';

test('Verify dynamic web table', async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    const table: Locator = page.locator('.table.table-striped');
    await expect(table).toBeVisible();

    const rows: Locator[] = await table.locator("tr").all();
    expect(rows).toHaveLength(5);

    let cpuLoad: string = '';

    for (let row of rows) {

        //way: by
        const cell: string[] = await row.locator("td").allInnerTexts();
        const browserName: string = cell[0];

        if (browserName === 'Chrome') {
            cpuLoad = await row.locator("td", { hasText: '%' }).innerText();

            console.log("The CPU load for chrome is :", cpuLoad);
            expect(cpuLoad).toContain('%');
            break;
        }
    }

    const yellowTextLabel: string = await page.locator("#chrome-cpu").innerText();
    if (yellowTextLabel.includes(cpuLoad)) {
        console.log("The CPU load is equal");
        expect(yellowTextLabel).toContain(cpuLoad);
    } else {
        console.log("The CPU load is not equal")
    }

})

