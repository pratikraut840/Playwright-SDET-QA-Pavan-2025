import { test, Locator, expect } from '@playwright/test';
/**
 * Test Name: Verify static web table
 * 
 * Description:
 * This test validates the static Book Table available at:
 * https://testautomationpractice.blogspot.com/
 * 
 * The test performs the following validations:
 * 1. Verifies total number of rows
 * 2. Verifies total number of columns (headers)
 * 3. Validates second row data
 * 4. Reads entire table data excluding header
 * 5. Prints book names written by author "Mukesh"
 * 6. Calculates total price of all books (2 different ways)
 */

test('Verify static web table', async ({ page }) => {

    // ============================================================
    // STEP 1: Navigate to the application URL
    // ============================================================
    await page.goto("https://testautomationpractice.blogspot.com/");


    // ============================================================
    // STEP 2: Locate the Book Table
    // ============================================================
    // Using table name attribute to uniquely identify the table
    const webTable: Locator = page.locator('table[name="BookTable"]');


    // ============================================================
    // STEP 3: Count total number of rows
    // ============================================================
    // Includes header row
    const rows: Locator = webTable.locator("tr");
    const rowsCount: number = await rows.count();

    expect(rowsCount).toBe(7);
    console.log("rowsCount :", rowsCount);


    // ============================================================
    // STEP 4: Count total number of columns (headers)
    // ============================================================
    const cols: Locator = webTable.locator("th");
    const headerColsCount: number = await cols.count();

    expect(headerColsCount).toBe(4);
    console.log("headerCount :", headerColsCount);


    // ============================================================
    // STEP 5: Validate data of the second row
    // ============================================================
    // nth(1) → second row (index starts from 0)
    const secondRow: Locator = rows.nth(1).locator("td");

    // Capture all cell texts from second row
    const secondRowContent: string[] = await secondRow.allInnerTexts();
    console.log("secondRow data is :", secondRowContent);

    // Assertion: Validate exact row data
    await expect(secondRow).toHaveText([
        'Learn Selenium',
        'Amit',
        'Selenium',
        '300'
    ]);


    // ============================================================
    // STEP 6: Read all table data excluding header
    // ============================================================
    // rows.all() → returns array of row locators
    // slice(1) → skip header row
    const allRowsData: Locator[] = await rows.all();

    for (let row of allRowsData.slice(1)) {
        const tableData = await row.locator("td").allInnerTexts();
        // console.log("Row Data:", tableData.join("\t"));
    }


    // ============================================================
    // STEP 7: Print book names where author is "Mukesh"
    // ============================================================
    const mukeshBooks: string[] = [];

    for (let row of allRowsData.slice(1)) {

        const allCells: string[] = await row.locator("td").allInnerTexts();

        const bookName: string = allCells[0];   // First column
        const authorName: string = allCells[1]; // Second column

        // Trim used to remove extra spaces
        if (authorName?.trim() === 'Mukesh') {

            console.log(`Author & BookName :${authorName} \t ${bookName}`);
            mukeshBooks.push(bookName);
        }
    }

    console.log("Mukesh Books:", mukeshBooks);


    // ============================================================
    // STEP 8: Calculate total price of all books
    // ============================================================
    let totalPrice: number = 0;
    const priceArray: number[] = [];

    for (let row of allRowsData.slice(1)) {

        const allCellsData: string[] = await row.locator("td").allInnerTexts();
        const price: string = allCellsData[3];  // 4th column (Price)

        // -------------------------------
        // Method 1: Simple Addition
        // -------------------------------
        totalPrice = totalPrice + parseInt(price);

        // -------------------------------
        // Method 2: Store in array for reduce()
        // -------------------------------
        priceArray.push(parseInt(price));
    }

    console.log("Total Price (Addition):", totalPrice);
    console.log("Price Array:", priceArray);


    // ============================================================
    // STEP 9: Calculate total using reduce()
    // ============================================================
    let totalArrayPrice: number = priceArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    console.log("Total Price using Reduce():", totalArrayPrice);

});
