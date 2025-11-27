# ControlUp Automation Tests

A focused test automation framework implementing exactly **2 UI tests** and **3 API tests** using Playwright with TypeScript and Page Object Model pattern.

## Project Structure

```
controlup-automation-tests/
├── data/                           # Test data files
│   ├── users.data.ts              # User credentials and error messages  
│   └── api.data.ts                # API endpoints and test data
├── pages/                         # Page Object Model classes
│   ├── base.page.ts               # Base page with common functionality
│   ├── login.page.ts              # Login page object
│   └── inventory.page.ts          # Inventory page object
├── tests/                         # Test specifications
│   ├── ui.spec.ts                 # 2 UI tests (login & inventory)
│   └── api.spec.ts                # 3 API tests (airport data)
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## Setup and Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd control-up-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run test:install
   ```

## Available Scripts

### Test Execution Scripts

```bash
# Run all tests (2 UI + 3 API)
npm test

# Run UI tests only (@ui-tests tag)
npm run test:ui

# Run API tests only (@api-tests tag)  
npm run test:api

# Run tests by browser
npm run test:firefox        # Firefox only
npm run test:edge          # Edge only  
npm run test:webkit        # Safari/WebKit only

# Show test reports
npm run test:report
```

## Test Reports

After test execution, reports are generated in `playwright-report/index.html`

View HTML report:
```bash
npm run test:report
```

## Test Implementation

### UI Tests (2 scenarios)
- **Scenario 1**: Login and verify 6 inventory items
- **Scenario 2**: Login and add item to cart (verify badge = 1)

### API Tests (3 scenarios)  
- **Scenario 1**: Verify airport count (30 airports)
- **Scenario 2**: Verify specific airports exist
- **Scenario 3**: Calculate distance between airports (KIX ↔ NRT)

## Test Data Management

Test data is centralized in the `data/` directory with **NO HARDCODING**:

### User Data (`data/users.data.ts`)
```typescript
export const TestUsers = {
  STANDARD_USER: {
    username: 'standard_user',
    password: 'secret_sauce',
    description: 'Standard user with full access'
  }
} as const;
```

### API Data (`data/api.data.ts`)
```typescript
export const ApiEndpoints = {
  AIRPORTS: 'https://airportgap.com/api/airports',
  DISTANCE: 'https://airportgap.com/api/airports/distance'
} as const;
```

## Page Object Model

Each page is represented as a class extending `BasePage`:

```typescript
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, '/');
  }
  
  async login(username: string, password: string): Promise<void> {
    // Implementation with proper locators
  }
}
```

## Browser Support

The framework runs tests on multiple browsers:
- **Chromium** (Chrome/Edge engine)
- **Firefox** 
- **WebKit** (Safari engine)
- **Edge** (Chromium-based)

All tests run in **fullscreen mode** for realistic testing conditions.

This project is licensed under the MIT License.