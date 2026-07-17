# AstroFlow RFQ — Playwright + TypeScript Automation

A maintainable, data-driven UI automation framework for the AstroFlow Request for Quote workflow.

## Objective

Automate this end-to-end flow:

1. Open `https://astroflow.wingflows.com/`.
2. Select the top-right **Request Quote** CTA.
3. Verify navigation to `/rfq`.
4. Complete every RFQ field.
5. Select exactly one service.
6. Submit the form.
7. Capture and assert:

   `Thank you for your request! We will contact you within 24 hours.`

8. Verify the form reset.

## Technology

- Playwright Test 1.61
- TypeScript strict mode
- Node.js 22+
- Page Object Model
- Component Object Model
- Custom fixtures
- Typed Data Builder
- GitHub Actions

## Architecture

```text
tests
  └── Business flow and final assertions
src/pages
  └── Page-level navigation and readiness
src/components
  └── Reusable RFQ form behavior
src/fixtures
  └── Dependency injection for page objects
src/models
  └── Typed business data and allowed options
src/data
  └── Valid defaults, overrides, and scenario cases
docs
  └── Acceptance criteria, strategy, naming, interview guide
```

The design is intentionally pragmatic. It is more maintainable than a single monolithic spec, but avoids unnecessary layers such as Cucumber step definitions or generic abstractions that do not yet add value.

## Project tree

```text
.
├── .github/workflows/playwright.yml
├── .vscode/extensions.json
├── docs
│   ├── ACCEPTANCE_CRITERIA.md
│   ├── INTERVIEW_GUIDE.md
│   ├── NAMING_CONVENTIONS.md
│   └── TEST_STRATEGY.md
├── src
│   ├── components/rfq-form.component.ts
│   ├── data
│   │   ├── rfq-request.builder.ts
│   │   └── rfq.cases.ts
│   ├── fixtures/test.fixture.ts
│   ├── models/rfq-request.ts
│   └── pages
│       ├── home.page.ts
│       └── rfq.page.ts
├── tests/rfq/request-quote.spec.ts
├── .env.example
├── .gitignore
├── .prettierrc.json
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Prerequisites

Use a Playwright-supported Node.js release. Node.js 22 is recommended for this project.

```bash
node --version
npm --version
```

## Installation

```bash
git clone https://github.com/maupz/astroflow-playwright-automation.git
cd astroflow-playwright-automation
npm install
npx playwright install
npm run format
```

`npm install` generates `package-lock.json`. Commit that lockfile before pushing so GitHub Actions can use `npm ci`.

## Environment

```bash
cp .env.example .env
```

Default:

```env
BASE_URL=https://astroflow.wingflows.com
```

## Execution

### Recommended interview run

```bash
npm run test:headed
```

### Fast Chromium run

```bash
npm run test:rfq
```

### Playwright UI Mode

```bash
npm run test:ui
```

### Debug with Inspector

```bash
npm run test:debug
```

### Full desktop browser matrix

```bash
npm run test:all-browsers
```

### Open the HTML report

```bash
npm run report
```

## Test data

The framework has two levels:

- `rfq-request.builder.ts`: one valid default object.
- `rfq.cases.ts`: scenario-specific overrides.

Example:

```ts
{
  id: 'RFQ-UI-002',
  title: 'submit a healthcare transportation request',
  data: buildRfqRequest({
    company: {
      industry: 'Healthcare & Pharmaceuticals',
    },
    requirements: {
      service: 'Transportation & Distribution',
      timeline: 'Immediate (Within 1 month)',
    },
  }),
}
```

The same spec automatically runs once per case. No UI steps need to be copied.

## Why the service model contains one value

The application renders six checkboxes, so the UI technically allows multiple services. The interview requirement says only one must be selected. The TypeScript model therefore exposes:

```ts
service: Service;
```

instead of:

```ts
services: Service[];
```

That design prevents invalid multi-service test data at compile time.

## Locator strategy

The project prioritizes user-facing locators:

- `getByRole`
- `getByLabel`
- exact visible names
- stable test ids when available

No XPath and no long DOM chains are used.

### Documented selector compromise

The desktop header contains two links with the exact name **Request Quote**: a normal navigation item and the top-right CTA. The current locator scopes to the header and selects the last exact match. In a product team, request a unique accessible name or stable `data-testid` for the CTA.

## Waiting and flakiness prevention

- Playwright auto-waiting.
- URL and heading assertions after navigation.
- Dialog listener registered before submission.
- No `waitForTimeout`.
- No arbitrary sleeps.
- Retries only in CI.
- Failure evidence retained automatically.

## Evidence generated

- HTML report
- Screenshot on failure
- Video on failure
- Trace on failure
- JUnit XML in CI

## GitHub Actions

The workflow runs on:

- Push to `main`
- Pull request to `main`
- Manual execution

It performs:

1. `npm ci`
2. Browser/dependency installation
3. Type checking
4. Formatting validation
5. Cross-browser tests
6. Artifact upload

## Recommended next scenarios

1. Required fields left empty.
2. Invalid email.
3. Each industry option.
4. Each timeline option.
5. Each service option.
6. Attempt multiple service selection and clarify expected business behavior.
7. Direct navigation to `/rfq`.
8. Mobile navigation through the menu.
9. Accessibility checks.
10. Visual regression for the form.
11. Backend/API verification when a real submission endpoint exists.

## Interview presentation

See [`docs/INTERVIEW_GUIDE.md`](docs/INTERVIEW_GUIDE.md).
