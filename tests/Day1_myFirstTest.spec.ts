/**
 * Import Playwright's test runner and assertion library.
 * - test: Used to define test cases
 * - expect: Used for assertions and validations
 */
import { test, expect } from "@playwright/test";

test("validate page title", async ({ page }) => {
  // Navigate to the OrangeHRM login page
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  // Retrieve the title of the current page
  const pageTitle: string = await page.title();

  // Log the page title for debugging and reporting purposes
  console.log("The title of the page is: " + pageTitle);

  // Validate that the page title is exactly "OrangeHRM"
  await expect(page).toHaveTitle("OrangeHRM");
});


// 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
