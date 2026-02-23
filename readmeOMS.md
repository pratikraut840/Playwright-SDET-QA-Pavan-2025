<!-- Playwright Order Management Framework – Project Structure -->
project-root/
│
├── src/
│   │
│   ├── constants/
│   │   ├── selectors/                  # Common & reusable selectors
│   │   ├── global.ts                   # UI labels/constants
│   │   └── resources.ts                # API endpoint constants
│   │
│   ├── helpers/
│   │   ├── browsers/
│   │   │   └── browserSetup.ts         # Browser initialization logic
│   │   │
│   │   ├── config/
│   │   │   └── cucumber.js             # Cucumber configuration
│   │   │
│   │   ├── env/
│   │   │   ├── .env
│   │   │   ├── .env.test1
│   │   │   ├── .env.test2
│   │   │   ├── env.ts                  # Environment configs (URL, credentials, API endpoints)
│   │   │   └── getEnv.ts               # getEnv() utility function
│   │   │
│   │   ├── reports/
│   │   │   └── report.ts               # Generate multiple cucumber reports
│   │   │
│   │   ├── setupLogin/
│   │   │   └── auth/
│   │   │       └── user.json           # Stored authentication cookies/session
│   │   │
│   │   └── hooks/
│   │       ├── hooks.ts                # before, beforeAll, after, afterAll
│   │       └── orderManagerWorld.ts    # Custom world (object creation setup)
│   │
│   ├── pages/                          # All POM pages
│   │
│   ├── steps/                          # Step definitions (Gherkin bindings)
│   │
│   ├── tests/
│   │   ├── data/
│   │   │   ├── apiData/
│   │   │   │   ├── customers.ts
│   │   │   │   └── orders.ts           # API payload data
│   │   │   │
│   │   │   ├── automationRules.ts
│   │   │   ├── customers.ts
│   │   │   ├── inventoryData.ts
│   │   │   ├── orders.ts
│   │   │   ├── productData.ts
│   │   │   └── purchaseOrder.ts        # UI page test data
│   │   │
│   │   └── features/                   # Cucumber feature files
│   │       ├── order.feature
│   │       ├── quoting.feature
│   │       ├── settings.feature
│   │       ├── automationRules.feature
│   │       ├── customers.feature
│   │       ├── inventory.feature
│   │       ├── product.feature
│   │       └── supplier.feature
│   │
│   ├── types/                          # All TypeScript interfaces/types
│   │   ├── automationRules.types.ts
│   │   ├── automationReservation.types.ts
│   │   ├── common.types.ts
│   │   └── customers.types.ts
│   │
│   └── utils/
│       │
│       ├── api/
│       │   └── apiMethods.ts           # Common API methods (GET, POST, PUT)
│       │
│       ├── assertions/
│       │   ├── fieldAssertion.ts       # Custom assertions
│       │   └── historyAssertion.ts     # Custom assertions
│       │
│       ├── auth/
│       │   └── token.ts                # Get token from local storage
│       │
│       ├── azureManualTestcaseLink/
│       │   ├── scripts/
│       │   │   ├── azureApiWrapper.ts
│       │   │   ├── azureTestRunGen.ts
│       │   │   ├── mergeTestCaseStatus.ts
│       │   │   └── testCaseStatusHandler.ts
│       │   │
│       │   └── testStatus/
│       │       └── testcaseStatus_worker.json      # Stores automation test results & updates manual test cases in Azure
│       │       
│       │
│       ├── common/
│       │   ├── generateExpectedHistory.ts      # utility func to create & run data in same format
│       │   └── random.ts                       # generateRandomNum(), generateRandomStr()
│       │
│       ├── date/
│       │   └── format.ts               # Date utilities
│       │                                 # getCurrentFormattedDate()
│       │                                 # parseDateByRegion()
│       │                                 # verifyDates()
│       │                                 # generateDateByRegion()
│       │
│       ├── locator/
│       │   └── wrapperLocator.ts       # Locator wrapper utility
│       │
│       └── logger/
│           ├── failureLogger.ts        # writeFailureLog()
│           └── logger.ts               # enableDebugFileLogging()
│
├── test-results/
│   ├── cucumber-report.json
│   └── cucumber-html-report/           # Customized HTML reports
│
├── convert-cucumber-to-junit.js        # Converts Cucumber JSON → JUnit XML
│
├── package.json                        # Project dependencies & scripts
├── package-lock.json                   # Auto-generated lock file
├── tsconfig.json                       # TypeScript configuration
└── README.md


<!-- Framework Architecture Overview -->

                          ┌──────────────────────────┐
                          │      Feature Files       │
                          │     (Cucumber - BDD)     │
                          └────────────┬─────────────┘
                                       │
                                       ▼
                          ┌──────────────────────────┐
                          │     Step Definitions     │
                          │   (Glue Code Layer)      │
                          └────────────┬─────────────┘
                                       │
                                       ▼
                          ┌──────────────────────────┐
                          │      Page Objects (POM)  │
                          │  Encapsulated UI Actions │
                          └────────────┬─────────────┘
                                       │
             ┌─────────────────────────┼─────────────────────────┐
             ▼                         ▼                         ▼
   ┌─────────────────┐     ┌──────────────────┐       ┌──────────────────┐
   │  API Utilities  │     │  Custom Assertions│       │  Wrapper Locators│
   │ (GET/POST/PUT)  │     │  Field/History   │       │  Reusable Layer  │
   └─────────────────┘     └──────────────────┘       └──────────────────┘
             │                         │                         │
             └───────────────┬─────────┴───────────────┬─────────┘
                             ▼                         ▼
                   ┌──────────────────┐      ┌──────────────────┐
                   │  Common Utilities │      │  Environment     │
                   │  Date, Random,    │      │  Config (.env)   │
                   │  Logger, Helpers  │      │  getEnv()        │
                   └──────────┬───────┘      └──────────┬───────┘
                              │                         │
                              ▼                         ▼
                      ┌────────────────────────────────────────┐
                      │        Playwright Browser Layer        │
                      │        Hooks & Custom World            │
                      └────────────────────────────────────────┘
                                      │
                                      ▼
                      ┌────────────────────────────────────────┐
                      │        Reporting Layer                 │
                      │  Cucumber JSON → HTML → JUnit XML     │
                      │  Azure DevOps Integration              │
                      └────────────────────────────────────────┘


<!-- Playwright Order Management Automation Framework -->

This framework is built using:
    Playwright (UI + API automation)
    Cucumber (BDD implementation)
    TypeScript
    POM (Page Object Model)
    Azure DevOps Integration
    Custom Reporting (HTML + JSON + JUnit)

<!-- Architecture Design -->
BDD Layer → Feature files (Gherkin)
Step Definition Layer → Glue between feature & logic
Page Object Layer → Encapsulated UI actions
Utility Layer → API, Assertions, Date, Logger, Random
Environment Layer → Multi-environment support
Reporting Layer → Custom report generation
Azure Integration → Sync automation results to manual test cases

<!-- Environment Configuration -->
helpers/env/
   ├── .env
   ├── .env.test1
   ├── .env.test2
   ├── env.ts
   └── getEnv.ts

<!-- Framework Explanation (Interview-Ready Version) -->
How I Designed the Framework
I designed a scalable Playwright automation framework using Cucumber with a clear separation of concerns.

It follows this layered architecture:
Feature Layer (BDD)
    Business-readable Gherkin scenarios.
Step Definition Layer
    Acts as glue between feature files and application logic.
Page Object Model Layer
    All UI interactions are encapsulated inside reusable page classes to maintain clean abstraction.
Utility Layer
    API wrapper for GET/POST/PUT
    Custom assertions for field & history validation
    Date utilities (region-based handling)
    Random data generation
    Logger for failure tracking
Environment Layer
    Supports multiple environments using .env files
    Centralized getEnv() for config management
Custom Hooks & World
    Implemented Cucumber hooks (before, after)
    Created custom world for object injection & test context sharing
Reporting Layer
    Cucumber JSON → HTML
    Converted to JUnit XML for CI/CD
    Integrated with Azure DevOps to update manual test cases


Why This Framework Is Strong
    Highly modular & maintainable
    Easy to scale for new modules
    Clear separation of concerns
    API + UI combined support
    Custom assertion system (not dependent only on Playwright expect)
    Environment-independent execution
    Enterprise-level reporting