/**
 * =====================================================================
 * Playwright Automation - Handling IFrames
 * =====================================================================
 *
 * What is an IFrame?
 * ---------------------------------------------------------------------
 * IFrame (Inline Frame) is an HTML element that allows embedding another HTML document inside the current HTML page.
 *
 * Example:
 * A webpage contains another webpage inside it → this is an IFrame.
 *
 * Problem in Automation:
 * ---------------------------------------------------------------------
 * Playwright focuses on the main DOM by default.
 * It cannot directly interact with elements inside an iframe.
 *
 * Therefore:
 * We must switch the execution context from main page to iframe.
 * ---------------------------------------------------------------------
 * Methods to Handle IFrames in Playwright:
 * ---------------------------------------------------------------------
 * 1️⃣ Using Frame Object (page.frame())
 *    - page.frame({ name: '<frameName>' })
 *    - page.frame({ url: '<frameURL>' })
 *    - Returns: Frame | null
 *
 * 2️⃣ Using frameLocator()  (Recommended Method)
 *    - page.frameLocator('<locator>')
 *    - Accepts any valid locator
 *    - No need to manually switch context
 *
 * 3️⃣ Handling Child Frames
 *    - frame.childFrames()
 *    - Returns: Array<Frame>
 *
 *
 * Target Application:
 * ---------------------------------------------------------------------
 * https://ui.vision/demo/webtest/frames
 *
 */

import { test, expect, Frame } from '@playwright/test';

test.describe('IFrame Handling in Playwright', () => {

    /**
     * =====================================================================
     * Test Case 1:
     * Handle IFrame using Frame Object (page.frame())
     * =====================================================================
     *
     * Steps:
     * 1. Navigate to frames page
     * 2. Fetch total frames available
     * 3. Locate frame using URL
     * 4. Validate frame existence
     * 5. Perform action inside frame
     * 6. Verify entered value
     */
    test('Handle iframe using frame object (URL)', async ({ page }) => {

        // Step 1: Navigate to application
        await page.goto('https://ui.vision/demo/webtest/frames');

        // Step 2: Get all frames from page
        const totalFrames: Frame[] = page.frames();
        console.log("Total number of frames on page:", totalFrames.length);

        // Step 3: Locate frame using URL
        const frame1: Frame | null = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_1.html' });

        // Step 4: Check if frame exists
        if (frame1) {

            // Step 5: Interact with element inside iframe
            await frame1.locator('[name="mytext1"]').fill("Frame 1 detected");

            console.log("Frame 1 located and value entered successfully");

            // Step 6: Validate entered value
            await expect(frame1.locator('[name="mytext1"]')).toHaveValue("Frame 1 detected");

        } else {
            console.log("Frame 1 not found");
        }

    });


    /**
     * =====================================================================
     * Test Case 2:
     * Handle IFrame using frameLocator() (Recommended)
     * =====================================================================
     *
     * Why Recommended?
     * - Cleaner syntax
     * - No need to manually switch context
     * - Accepts any locator strategy
     *
     * Steps:
     * 1. Navigate to frames page
     * 2. Use frameLocator() with iframe locator
     * 3. Interact with element inside iframe
     * 4. Validate entered value
     */
    test('Handle iframe using frameLocator()', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames');

        const totalFrames: Frame[] = page.frames();
        console.log("Total number of frames on page:", totalFrames.length);

        // Step 2: Use frameLocator() method
        const frame2 = page.frameLocator('[src="frame_2.html"]');

        // Step 3: Interact directly inside iframe
        await frame2.locator('[name="mytext2"]').fill("Frame 2 detected");

        console.log("Frame 2 located and value entered successfully");

        // Step 4: Validate value
        await expect(frame2.locator('[name="mytext2"]')).toHaveValue("Frame 2 detected");
    });

    /**
     * =====================================================================
     * Test Case 3:
     * Handle Child (Nested) Frames
     * =====================================================================
     *
     * Scenario:
     * Frame 3 contains a child iframe.
     *
     * Steps:
     * 1. Navigate to frames page
     * 2. Locate parent frame (frame_3)
     * 3. Fetch child frames using childFrames()
     * 4. Store child frame in variable
     * 5. Perform action inside child frame
     */
    test('Handle child iframe using childFrames()', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames');

        // Step 2: Locate parent frame
        const parentFrame: Frame | null = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3.html' });

        if (parentFrame) {

            // Step 3: Get child frames
            const childFrames: Frame[] = parentFrame.childFrames();
            console.log("Number of child frames:", childFrames.length);

            // Step 4: Store first child frame
            const childFrame = childFrames[0];

            // Step 5: Perform action inside child frame
            await childFrame.locator("input[type='text']").first().fill("Inside Child Frame");

            console.log("Value entered inside child frame successfully");

        } else {
            console.log("Parent frame not found");
        }

    });

});