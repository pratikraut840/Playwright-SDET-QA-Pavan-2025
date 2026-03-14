/**
 * ================================================================
 * Playwright - Handling JavaScript Dialogs (Alert, Confirm, Prompt)
 * ================================================================
 *
 * Dialog Types Covered:
 * 1. Simple Alert      -> alert()
 * 2. Confirmation      -> confirm()
 * 3. Prompt            -> prompt()
 *
 * Notes:
 * - JavaScript dialogs are NOT part of the DOM.
 * - Playwright auto-dismisses dialogs by default.
 * - To control dialog behavior, we must register a listener
 *   using page.on('dialog', handler).
 *
 * Dialog Methods:
 * - dialog.type()        -> Returns type (alert | confirm | prompt | beforeunload)
 * - dialog.message()     -> Returns dialog message
 * - dialog.defaultValue() -> Returns default text (for prompt)
 * - dialog.accept([text]) -> Accepts dialog (OK button / enter value)
 * - dialog.dismiss()     -> Dismisses dialog (Cancel button)
 */

import { test, expect } from "@playwright/test";

test.describe('JavaScript Dialog Handling', () => {

    /**
     * ================================================================
     * Test Case 1: Verify Simple Alert Dialog
     * ================================================================
     * Scenario:
     * - Click on Simple Alert button
     * - Validate dialog type & message
     * - Click OK button
     */
    test('Verify Simple Alert Dialog', async ({ page }) => {

        await page.goto('https://testautomationpractice.blogspot.com/');

        const simpleAlertButton = page.locator('#alertBtn');

        // Register dialog handler BEFORE triggering dialog
        page.on('dialog', async (dialog) => {

            console.log("Dialog Type:", dialog.type());
            console.log("Dialog Message:", dialog.message());

            // Validate dialog details
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toContain('I am an alert box');

            // Accept the alert (Click OK)
            await dialog.accept();
            console.log("Alert accepted successfully");
        });

        await simpleAlertButton.click();
    });


    /**
     * ================================================================
     * Test Case 2: Verify Confirmation Dialog
     * ================================================================
     * Scenario:
     * - Click Confirmation button
     * - Validate dialog type & message
     * - Click Cancel button
     * - Verify result message on UI
     */
    test('Verify Confirmation Dialog', async ({ page }) => {

        await page.goto('https://testautomationpractice.blogspot.com/');

        const confirmAlertButton = page.locator('#confirmBtn');

        page.on('dialog', async (dialog) => {

            console.log("Dialog Type:", dialog.type());
            console.log("Dialog Message:", dialog.message());

            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toContain('Press a button');

            // Dismiss dialog (Click Cancel)
            await dialog.dismiss();
            console.log("Confirmation dismissed successfully");
        });

        await confirmAlertButton.click();

        // Validate confirmation result
        await expect(page.locator("#demo"))
            .toHaveText("You pressed Cancel!");
    });


    /**
     * ================================================================
     * Test Case 3: Verify Prompt Dialog
     * ================================================================
     * Scenario:
     * - Click Prompt button
     * - Validate dialog type, message & default value
     * - Enter text into prompt
     * - Accept dialog
     * - Validate result message on UI
     */
    test('Verify Prompt Dialog', async ({ page }) => {

        await page.goto('https://testautomationpractice.blogspot.com/');

        const promptAlertButton = page.locator('#promptBtn');

        page.on('dialog', async (dialog) => {

            console.log("Dialog Type:", dialog.type());
            console.log("Dialog Message:", dialog.message());
            console.log("Default Value:", dialog.defaultValue());

            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toContain('Please enter your name');

            // Enter value and click OK
            await dialog.accept("Pratik Raut");

            console.log("Prompt accepted with input value");
        });

        await promptAlertButton.click();

        // Validate final output text
        await expect(page.locator("#demo"))
            .toHaveText("Hello Pratik Raut! How are you today?");
    });

});