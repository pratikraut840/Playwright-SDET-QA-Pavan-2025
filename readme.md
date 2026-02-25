<p align="center">
  <img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright" width="120"/>
</p>

<h1 align="center">🎭 Playwright SDET QA Automation Framework</h1>

<p align="center">
  <strong>A comprehensive end-to-end test automation framework built with Playwright & TypeScript</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-1.58+-2EAD33?style=for-the-badge&logo=playwright" alt="Playwright"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js" alt="Node.js"/>
  <img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge" alt="License"/>
</p>

---

## 📖 Overview

This repository contains a **production-ready Playwright automation framework** designed for SDET and QA engineers. It demonstrates real-world test automation scenarios covering locators, element interactions, dropdowns, dynamic content, web tables, datepickers, and more—following industry best practices and clean code principles.

Perfect for learning, portfolio showcase, or as a reference implementation for your own automation projects.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **🪝 Locator Strategies** | Built-in locators, XPath, CSS, and XPath axes |
| **🎯 Element Interactions** | Text inputs, radio buttons, checkboxes, buttons |
| **📋 Dropdown Handling** | Static, dynamic/auto-suggest, and Bootstrap dropdowns |
| **📊 Web Tables** | Static tables, dynamic tables, pagination |
| **📅 Datepicker Automation** | jQuery and Bootstrap datepicker handling |
| **🔄 Parallel Execution** | Fully parallel test runs for faster feedback |
| **📸 Trace on Retry** | Automatic traces captured for failed tests |
| **🛡️ TypeScript** | Full type safety and better developer experience |

---

## 🗂️ Project Structure

```
playwright-sdet-qa-pavan-2025/
├── tests/
│   ├── Day1_myFirstTest.spec.ts          # Basic test & page title validation
│   ├── Day2_playwrightLocators.spec.ts   # Built-in locators (getByRole, getByLabel, etc.)
│   ├── Day3_xpathLocators.spec.ts        # XPath locator strategies
│   ├── Day4_xpathAxes.spec.ts            # XPath axes (ancestor, descendant, etc.)
│   ├── Day5_cssLocator.spec.ts           # CSS selector strategies
│   ├── Day6_htmlElements.spec.ts         # Inputs, radios, checkboxes
│   ├── Day7_staticDropdownHandling.spec.ts # Single & multi-select dropdowns
│   ├── Day8_dynamicDropdownHandling.spec.ts # Auto-suggest & Bootstrap dropdowns
│   ├── Day9_webTables.spec.ts            # Static web table operations
│   ├── Day9_methodComparison.spec.ts     # Method comparison utilities
│   ├── Day10_dynamicWebTable.spec.ts     # Dynamic table handling
│   ├── Day10_paginationTable.spec.ts     # Paginated table automation
│   ├── Day11_JQueryDatepicker.spec.ts    # jQuery datepicker automation
│   └── Day12_BootstrapDatepicker.spec.ts # Bootstrap datepicker automation
├── playwright.config.ts                 # Playwright configuration
├── package.json
└── README.md
```

---

## 🧪 Applications Under Test

The framework validates real-world applications to simulate production scenarios:

| Application | URL | Test Coverage |
|-------------|-----|---------------|
| **OrangeHRM Demo** | [opensource-demo.orangehrmlive.com](https://opensource-demo.orangehrmlive.com) | Login, navigation, Bootstrap dropdowns |
| **Automation Practice** | [testautomationpractice.blogspot.com](https://testautomationpractice.blogspot.com) | Forms, tables, datepickers, dropdowns |
| **Flipkart** | [flipkart.com](https://www.flipkart.com) | Dynamic/auto-suggest dropdown handling |
| **Testing Mavens** | [testingmavens.com](https://www.testingmavens.com) | Locator identification |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/playwright-sdet-qa-pavan-2025.git
cd playwright-sdet-qa-pavan-2025

# Install dependencies
npm install

# Install Playwright browsers (if not already installed)
npx playwright install
```

### Running Tests

```bash
# Run all tests in headed mode (see browser)
npx playwright test

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run tests in headed mode with browser visible
npx playwright test --headed

# Run a specific test file
npx playwright test tests/Day6_htmlElements.spec.ts

# Run tests and generate HTML report
npx playwright test --reporter=html
npx playwright show-report
```

---

## ⚙️ Configuration Highlights

| Setting | Value | Purpose |
|---------|-------|---------|
| `timeout` | 60s | Per-test timeout |
| `fullyParallel` | true | Maximum parallelization |
| `retries` | 2 (CI) / 0 (local) | Resilience in CI pipelines |
| `trace` | on-first-retry | Debug failed tests with trace viewer |
| `reporter` | html | Detailed HTML test reports |

---

## 📚 What You'll Learn

- **Locator Best Practices** — When to use `getByRole`, `getByLabel`, XPath, or CSS
- **Element State Validation** — Visibility, enablement, checked state
- **Async Handling** — Proper use of `await` and Playwright's auto-waiting
- **Dynamic Content** — Handling auto-suggest dropdowns and dynamic tables
- **Calendar/Date Selection** — Generic patterns for jQuery and Bootstrap datepickers
- **Table Automation** — Row/column iteration, pagination, data extraction

---

## 🛠️ Tech Stack

- **[Playwright](https://playwright.dev)** — Microsoft's reliable end-to-end testing framework
- **[TypeScript](https://www.typescriptlang.org)** — Type-safe test authoring
- **[Node.js](https://nodejs.org)** — Runtime environment

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments

Built as part of the **Playwright SDET QA Pavan 2025** learning series.  
Feel free to ⭐ star this repo and share with fellow QA engineers!

---

<p align="center">
  <strong>Happy Testing! 🎭</strong>
</p>
