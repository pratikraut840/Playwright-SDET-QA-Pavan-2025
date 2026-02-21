
==============================================================
# ===================== # Folder Structure detailed ===================
==============================================================

playwright-sample-project/                        # Root project directory
│
├── src/                                          # All automation source code (UI + API + DB + Framework)
│
│   ├── advantage/                                # UI Automation Layer (Page Object Model based)
│   │
│   │   ├── constants/                            # UI-related constants (URLs, selectors, static mappings)
│   │   │   └── app.constants.ts                  # Application-level constant values
│   │   │
│   │   ├── pages/                                # Page Object Models (locators + reusable page methods)
│   │   │   ├── base.page.ts                      # Common reusable UI actions (click, fill, wait, navigation)
│   │   │   ├── login.page.ts                     # Login page elements & methods
│   │   │   └── dashboard.page.ts                 # Dashboard page elements & methods
│   │   │
│   │   └── steps/                                # Business workflow layer (high-level reusable actions)
│   │       ├── login.steps.ts                    # Login business flow scenarios
│   │       └── user.steps.ts                     # User-related workflow actions
│   │
│   ├── API/                                      # REST API Automation Layer
│   │
│   │   ├── constants/                            # API endpoints, headers, status codes
│   │   │   └── rest.constants.ts                 # REST API constant definitions
│   │   │
│   │   └── steps/                                # API service wrapper classes
│   │       ├── base.api.ts                       # Generic HTTP methods (GET, POST, PUT, DELETE)
│   │       ├── user.api.ts                       # User-related API services
│   │       └── auth.api.ts                       # Authentication API services
│   │
│   ├── database/                                 # Database interaction layer
│   │
│   │   ├── constants/                            # DB queries, table names, schema mappings
│   │   │   └── db.constants.ts                   # Database constant definitions
│   │   │
│   │   └── steps/                                # Database utility classes
│   │       ├── base.db.ts                        # Common DB connection & execution methods
│   │       └── user.db.ts                        # User-specific database queries
│   │
│   ├── framework/                                # Core reusable framework utilities
│   │   ├── logger.ts                             # Centralized logging utility
│   │   ├── flakyReporter.ts                      # Custom flaky test tracking
│   │   ├── customExpect.ts                       # Extended Playwright assertions
│   │   ├── custom.fixture.ts                     # Custom Playwright fixtures
│   │   ├── wait.utils.ts                         # Smart wait helper utilities
│   │   ├── file.utils.ts                         # File handling utilities
│   │   ├── date.utils.ts                         # Date & time helper utilities
│   │   └── env.config.ts                         # Environment configuration loader
│   │
│   └── resources/                                # Static resources & external test data
│       ├── API/                                  # JSON payloads for API automation
│       │   ├── user.payload.json                 # User API payload template
│       │   └── auth.payload.json                 # Authentication payload template
│       │
│       ├── data/                                 # Environment-specific test data
│       │   ├── qa/                               # QA environment test data
│       │   │   ├── users.json                    # QA user dataset
│       │   │   └── orders.json                   # QA order dataset
│       │   │
│       │   └── stage/                            # Stage environment test data
│       │       ├── users.json                    # Stage user dataset
│       │       └── orders.json                   # Stage order dataset
│       │
│       └── pdf/                                  # PDF files used for validation/comparison
│
│
├── tests/                                        # Test specification files (.spec.ts only)
│   ├── ui/                                       # UI test scenarios
│   │   ├── login.ui.spec.ts                      # Login UI test cases
│   │   └── dashboard.ui.spec.ts                  # Dashboard UI test cases
│   │
│   ├── api/                                      # API test scenarios
│   │   ├── user.api.spec.ts                      # User API test cases
│   │   └── auth.api.spec.ts                      # Authentication API test cases
│   │
│   ├── integration/                              # Cross-layer integration tests (UI + API + DB)
│   │   ├── user-registration.integration.spec.ts # End-to-end user registration flow
│   │   └── order-placement.integration.spec.ts   # End-to-end order placement flow
│   │
│   └── smoke/                                    # High-priority smoke test suite
│       └── smoke-auth.spec.ts                    # Basic authentication smoke test
│
│
├── test-results/                                 # Auto-generated execution artifacts
│   ├── downloads/                                # Files downloaded during test execution
│   ├── failure/                                  # Failure screenshots, traces, videos
│   ├── logs/                                     # Execution logs
│   ├── pdf/                                      # PDF comparison results
│   ├── report/                                   # Allure or custom reports
│   └── results/                                  # Playwright HTML report output
│
│
├── .env                                          # Default environment variables
├── .env.qa                                       # QA environment configuration
├── .env.stage                                    # Stage environment configuration
│
├── .eslintignore                                 # ESLint ignore rules
├── .eslintrc.json                                # ESLint configuration
├── .gitignore                                    # Git ignored files
│
├── package.json                                  # Project dependencies & scripts
├── package-lock.json                             # Dependency lock file
│
├── playwright.config.ts                          # Playwright configuration (projects, retries, reporters)
└── azure-pipelines.yml                           # CI/CD pipeline configuration



# 🎭 Playwright Enterprise Sample Project

A scalable, layered, enterprise-grade Playwright automation framework supporting:

- ✅ UI Automation (POM based)
- ✅ REST API Automation
- ✅ Database Validation
- ✅ Integration Testing
- ✅ Environment-based configuration
- ✅ CI/CD Ready

---

## 📁 Project Structure


src/ → Source code (UI + API + DB + Framework)
tests/ → Test specifications
test-results/ → Execution artifacts
.env files → Environment configuration
playwright.config.ts → Playwright configuration


---

## 🏗 Architecture Overview

The framework follows a strict layered architecture:


Spec Layer (tests/)
↓
Steps Layer (Business Logic)
↓
Page / API / DB Layer
↓
Framework Utilities
↓
Resources (Test Data / Payloads)


---

## 🧩 Layers Explained

### 1️⃣ UI Layer (`src/advantage`)
- Page Object Model implementation
- Business workflows separated into steps
- Reusable and maintainable UI components

### 2️⃣ API Layer (`src/API`)
- REST service wrappers
- Centralized endpoint constants
- Payload-driven automation

### 3️⃣ Database Layer (`src/database`)
- Reusable DB utilities
- Query validations
- Backend verification support

### 4️⃣ Framework Layer (`src/framework`)
- Logging
- Custom fixtures
- Extended assertions
- Utilities
- Environment configuration

### 5️⃣ Resources (`src/resources`)
- API payloads
- Environment test data
- PDF validation files

---

## 🚀 Running Tests

### Run all tests
```bash
npx playwright test
Run UI tests
npx playwright test tests/ui
Run API tests
npx playwright test tests/api
Run smoke suite
npx playwright test tests/smoke
🌍 Environment Execution
ENV=qa npx playwright test
ENV=stage npx playwright test

Environment config handled via:

.env.qa
.env.stage
env.config.ts
📊 Reporting

Generated under:

test-results/

Includes:

HTML Report

Logs

Failure screenshots

Traces

Downloads

🏗 CI/CD

Integrated via:

azure-pipelines.yml

Supports:

Parallel execution

Retry strategy

Artifact publishing

Failure reporting

💎 Key Design Principles

Separation of concerns

Layered architecture

Reusability

Environment-driven testing

Scalability

Maintainability

Enterprise CI-ready