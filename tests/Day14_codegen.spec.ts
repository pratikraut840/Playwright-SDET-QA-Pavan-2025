import { test, expect } from '@playwright/test';

/**
 * ============================================================
 * Test Suite: Booking.com Flight Search
 * ============================================================
 * This test automates the flight search flow on Booking.com.

 * Test Flow:
 * 1. Navigate to Booking.com homepage
 * 2. Handle optional sign-in popup
 * 3. Navigate to Flights section
 * 4. Enter destination city
 * 5. Select travel date
 * 6. Search for flights
 * 7. Navigate between result pages
 * 8. Apply filters
 * 9. Select a flight option
 * 10. Handle popup window and perform search again
 * ============================================================
 */

test('Booking.com Flights search flow', async ({ page }) => {

  // Open Booking homepage
  await page.goto('https://www.booking.com/');
  await page.waitForLoadState('domcontentloaded');

  // Close sign-in popup if it appears
  const dismissBtn = page.locator(
    '[aria-label="Dismiss sign-in information."], [aria-label="Dismiss sign in information."]'
  );
  try {
    await dismissBtn.first().click({ timeout: 5000 });
  } catch { }

  // Navigate directly to Flights page
  await page.goto('https://www.booking.com/flights/index.html');
  await page.waitForLoadState('domcontentloaded');

  // Enter destination
  await page.getByRole('button', { name: 'Going to' }).click();
  const destinationInput = page.getByRole('combobox', { name: 'Arrival airport or city.' });
  await destinationInput.fill('bangal');

  // Select suggestion
  const suggestion = page.getByRole('button', { name: /Anywhere/i });
  await expect(suggestion).toBeVisible();
  await suggestion.click();

  // Select flight option
  await page.locator('[class*="InputRadio"]').first().click();

  // Choose travel date
  await page.getByRole('button', { name: /Travel date/i }).click();
  await page.getByRole('button', { name: 'Sa 2 May' }).click();

  // Search flights
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page).toHaveURL(/flights/);

  // Navigate results
  await page.getByRole('button', { name: 'Page 2' }).click();
  await page.locator('[class*="InputCheckbox"]').first().click();
  await page.getByRole('button', { name: 'Page 1' }).click();

  // Select Bangalore flight
  await page.getByRole('button', { name: 'Bangalore India Check prices' }).click();

  // Handle popup window
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Search all flights' }).click();

  const popupPage = await popupPromise;
  await popupPage.waitForLoadState('domcontentloaded');

  // Search again in popup
  await popupPage.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(popupPage).toHaveURL(/flights/);

});