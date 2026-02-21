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
