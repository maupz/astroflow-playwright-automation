# Test Strategy

## Goal

Automate the highest-value RFQ happy path while demonstrating a framework that can grow beyond a single interview exercise.

## Architecture decision

Use a pragmatic layered model:

1. **Test specification**
   - Expresses business intent and assertions.
   - Contains no low-level selectors.

2. **Page Objects**
   - `HomePage` models home-page navigation.
   - `RfqPage` models the RFQ route and composes the form component.

3. **Component Object**
   - `RfqFormComponent` owns form locators and interactions.
   - This prevents the RFQ page class from becoming a large god object.

4. **Custom fixtures**
   - Provide ready-to-use page objects through Playwright dependency injection.

5. **Typed data builder**
   - Stores valid defaults.
   - Supports small nested overrides.
   - Restricts service selection to one typed value.

This is Page Object Model plus Component Objects, fixtures, and a Data Builder. BDD/Cucumber is intentionally excluded because one small flow does not justify the additional abstraction and maintenance cost.

## Locator policy

Priority order:

1. `getByRole`
2. `getByLabel`
3. `getByText`
4. Stable application-owned `data-testid`
5. CSS only when the UI does not provide a unique semantic locator

The top-right RFQ CTA is a documented exception. The header contains two links with the same accessible name, so the current implementation scopes to `header` and selects the last exact match. The recommended product improvement is a unique accessible name or stable test id.

## Synchronization

- Use Playwright auto-waiting.
- Assert page state after navigation.
- Register the dialog listener before clicking submit.
- Never use arbitrary sleeps.

## Data strategy

- Keep business-readable option labels in typed unions.
- Store a valid default request in one builder.
- Add cases by overriding only the fields relevant to the scenario.
- Avoid hardcoding test data inside page objects or spec files.
- Use synthetic data and reserved domains such as `example.com`.

## Cross-browser strategy

- Chromium is the fastest interview demonstration.
- Firefox and WebKit are configured for regression coverage.
- Desktop projects are used because the requested CTA is the desktop top-right button.
- Mobile navigation should be a separate scenario because the desktop CTA is hidden at smaller breakpoints.

## Evidence and diagnostics

- HTML report for execution summary.
- Screenshot only on failure.
- Video retained on failure.
- Trace retained on failure.
- JUnit report in CI.

## CI strategy

- Run type checking before tests.
- Run on pushes, pull requests, and manual dispatch.
- Use one worker in CI to reduce noise against an external shared site.
- Upload reports and test results even when tests fail.

## Flakiness prevention

- Semantic locators instead of fragile DOM chains.
- No fixed timeouts.
- Assertions on navigation and page readiness.
- Test data and UI behavior separated.
- Retries enabled only in CI and used as diagnostic support, not as a substitute for fixing flaky tests.
