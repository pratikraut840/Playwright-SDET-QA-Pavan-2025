/* XPath Axes
 XPath axes define the relationship between the current node and nodes in the document.
 They allow you to navigate up, down, forward or backward through elements and attributes in an XML document.

Here are the primary XPath axes:
1. self
2. parent
3. child
4. ancestor
5. descendent
6. following
7. following-sibling
8. preceding
9. preceding-sibling
*/

import { test, expect, Locator } from '@playwright/test';

test('XPath Axes Locator', async ({ page }) => {

  await page.goto('https://www.w3schools.com/html/html_tables.asp');

  // -------------------------------------------------
  // 1. self — Select the current node itself
  // -------------------------------------------------
  const germanyCell: Locator = page.locator("//td[text()='Germany']");
  await expect(germanyCell).toHaveText('Germany');

  // -------------------------------------------------
  // 2. parent — Select the parent of the current node
  // -------------------------------------------------
  const parentRow: Locator = page.locator("//td[text()='Germany']/parent::tr");
  await expect(parentRow).toHaveCount(1);
  await expect(parentRow).toContainText('Maria Anders');

  // -------------------------------------------------
  // 3. child — Select direct children of a node
  // -------------------------------------------------
  const childCells: Locator = page.locator(
    "//table[@id='customers']//tbody/child::tr[2]/child::td"
  );
  await expect(childCells).toHaveCount(3);

  // -------------------------------------------------
  // 4. ancestor — Select parent, grandparent, etc.
  // -------------------------------------------------
  const ancestorTable: Locator = page.locator(
    "//td[normalize-space()='Germany']/ancestor::table"
  );
  await expect(ancestorTable).toHaveCount(1);
  await expect(ancestorTable).toHaveAttribute('id', 'customers');

  // -------------------------------------------------
  // 5. descendant — Select children and all deeper levels
  // -------------------------------------------------
  const descendantCells: Locator = page.locator(
    "//table[@class='ws-table-all']/descendant::td"
  );
  await expect(descendantCells).toHaveCount(18);

  // -------------------------------------------------
  // 6. following — Select all nodes after the current node
  // -------------------------------------------------
  const followingCell: Locator = page.locator(
    "//td[normalize-space()='Germany']/following::td[1]"
  );
  await expect(followingCell).toHaveCount(1);
  await expect(followingCell).toContainText('Centro comercial Moctezuma');

  // -------------------------------------------------
  // 7. following-sibling — Select next sibling only
  // -------------------------------------------------
  const followingSibling: Locator = page.locator(
    "//td[normalize-space()='Maria Anders']/following-sibling::td"
  );
  await expect(followingSibling).toHaveCount(1);
  await expect(followingSibling).toHaveText('Germany');

  // -------------------------------------------------
  // 8. preceding — Select all nodes before the current node
  // -------------------------------------------------
  const precedingCell: Locator = page.locator(
    "//td[normalize-space()='Germany']/preceding::td[1]"
  );
  await expect(precedingCell).toHaveCount(1);
  await expect(precedingCell).toHaveText('Maria Anders');

  // -------------------------------------------------
  // 9. preceding-sibling — Select previous sibling only
  // -------------------------------------------------
  const precedingSiblings: Locator = page.locator(
    "//td[normalize-space()='Germany']/preceding-sibling::td"
  );
  await expect(precedingSiblings).toHaveCount(2);

});
