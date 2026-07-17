# Interview Presentation Guide

## Suggested five-minute demonstration

1. Open `README.md` and state the test objective.
2. Show the folder tree and explain:
   - Spec = business flow
   - Pages/components = UI behavior
   - Builder/cases = test data
   - Fixture = dependency injection
3. Run:
   ```bash
   npm run test:headed
   ```
4. Open the report:
   ```bash
   npm run report
   ```
5. Change one value in `src/data/rfq.cases.ts` and rerun.
6. Show the GitHub Actions workflow.

## Key design points to explain

- Playwright + TypeScript provides browser automation, assertions, isolation, tracing, and strong typing in one ecosystem.
- Page Object Model alone can become large; a Component Object keeps the RFQ form cohesive.
- The data model allows exactly one service, matching the interview requirement even though the UI uses checkboxes.
- Accessible locators make tests more resilient and improve alignment with real user behavior.
- The alert listener is registered before submission to avoid a race condition.
- CI retries are diagnostic; local retries remain zero so failures are visible.
- The framework captures trace, screenshot, video, HTML, and JUnit evidence.
- Multiple cases require adding data, not duplicating UI steps.

## Strong observations about the application

- The top-right CTA and a navigation link have the same accessible name.
- The service choices are checkboxes and technically allow multiple selections.
- The exercise requires only one selection, so the framework enforces that rule.
- The success confirmation is a native JavaScript alert, not an HTML modal.
- The current application resets the form after accepting the alert.
- A mobile test requires a different navigation path because the desktop CTA is hidden below the large breakpoint.

## Likely follow-up questions

### Why not Cucumber?

For one small flow, Cucumber adds feature files, step definitions, and mapping overhead without improving maintainability. It becomes appropriate when business stakeholders actively review Gherkin or when a mature BDD process exists.

### Why not place all code in one spec?

That would be faster initially but hard to reuse, review, and extend. The current split demonstrates maintainability while staying small.

### Why use labels instead of CSS selectors?

Labels and roles represent how users and assistive technologies identify controls. They are less coupled to implementation details such as Tailwind classes or nested divs.

### How would this scale?

Add new page/component objects, shared fixtures, environment configuration, API setup, authenticated storage state, tagged suites, sharding, and parallel CI jobs only when the suite size justifies them.
