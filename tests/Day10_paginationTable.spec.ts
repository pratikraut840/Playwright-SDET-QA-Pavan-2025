/**
 * Pagination Table Automation
 * ---------------------------------------------------------
 * Objective:
 * 1. Open the DataTables example URL.
 * 2. Read data across all pages dynamically.
 * 3. Handle pagination using a while loop (unknown page count).
 * 4. Extract and print row data from each page.
 * 5. Stop execution when no further pages are available.
 */

import { test, expect, Locator } from '@playwright/test';

test('Verify pagination table, Read data across all pages', async ({ page }) => {

    // Navigate to the application URL
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    // Locate the table and verify visibility
    const table = page.locator(".display.dataTable");
    expect(table).toBeVisible();

    /**
     * Pagination control variable:
     * hasMorePages = true  → Continue pagination
     * hasMorePages = false → Exit loop
     */
    let hasMorePages: boolean = true;

    /**
     * Use while loop because total number of pages is unknown.
     * Continue execution until the Next button becomes disabled.
     */
    while (hasMorePages) {

        // Locate all table rows (including header row)
        const rows: Locator[] = await table.locator("tr").all();

        // Skip header row using slice(1)
        for (let row of rows.slice(1)) {

            let cells: string[] = await row.locator("td").allInnerTexts();

            // Remove blank values from row data
            const cleanedRow = cells.filter((text) => text.trim() !== '');

            console.log("Row Data:", cleanedRow);
        }

        /**
         * Pagination Handling:
         * Check whether the Next button is disabled.
         * If disabled → stop loop.
         * If enabled → click and continue.
         */
        const nextButton: Locator = page.locator(".dt-paging-button.next");
        const isDisabled = await nextButton.getAttribute("class") // dt-paging-button disabled next

        if (isDisabled?.includes("dt-paging-button disabled next") == true) {

            hasMorePages = false;
            console.log("Pagination: No more pages available. Exiting loop.");

        } else {

            console.log("Pagination: Next page exists. Moving to next page.");
            await nextButton.click();
        }
    }
});

test('Verify Filter rows and validate row count', async ({ page }) => {

    // Navigate to the application URL
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    // Locate the count dropdown 
    const countDropdown = page.locator("#dt-length-0");
    await countDropdown.selectOption('25');

    //way1: using all()
    const rows: Locator[] = await page.locator("#example tbody tr").all();
    expect(rows.length).toBe(25);


    //way2:
    const rows2: Locator = page.locator("#example tbody tr");
    expect(rows2).toHaveCount(25);

})

/*
4. Search for specific data across pages
---------------------------------------------------------
Objective:
1. Capture all rows on the current page.
2. Verify whether result rows exist after search/filter.
3. If the desired record is found:
   - Print the matched text
   - Break the loop
   - Log message: "Record exists"
4. If not found, continue pagination (if applicable).
5. Apply assertion once the match is found to ensure the expected data equals actual data.
*/
test.only('Search for specific data across pages', async ({ page }) => {

    // Navigate to the application URL
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    // Locate the search box and fill the desired value
    const searchbox: Locator = page.locator("#dt-search-0");
    await expect(searchbox).toBeEnabled()
    await searchbox.fill("Sonya Frost");

    // Locate all rows in the table body
    const rows: Locator[] = await page.locator("#example tr").all();

    // Flag to track if record is found
    let recordFound = false;

    // Iterate through each row
    for (let row of rows) {
        // Extract all cell values in the current row
        const desiredRow: string[] = await row.locator("td").allInnerTexts();

        if (rows.length !== 0) {
            // Check if the desired record exists in this row
            if (desiredRow.includes('Sonya Frost')) {
                console.log("Record exist", desiredRow);
                recordFound = true;
                break;// Stop searching once found
            }

        } else {
            console.log("Record does not exist");
        }
    }
    // Assertion (optional) to ensure the record exists
    expect(recordFound).toBe(true);
})
