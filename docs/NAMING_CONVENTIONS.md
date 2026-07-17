# Naming Conventions

| Artifact                 | Convention                            | Example                         |
| ------------------------ | ------------------------------------- | ------------------------------- |
| Directories              | kebab-case                            | `tests/rfq`                     |
| TypeScript files         | kebab-case with responsibility suffix | `rfq-form.component.ts`         |
| Page object classes      | PascalCase + `Page`                   | `HomePage`                      |
| Component object classes | PascalCase + `Component`              | `RfqFormComponent`              |
| Interfaces and types     | PascalCase                            | `RfqRequest`                    |
| Variables and methods    | camelCase, action-oriented            | `openRequestQuote()`            |
| Constants                | UPPER_SNAKE_CASE                      | `RFQ_SUCCESS_MESSAGE`           |
| Spec files               | feature or behavior + `.spec.ts`      | `request-quote.spec.ts`         |
| Test IDs                 | DOMAIN-LAYER-NUMBER                   | `RFQ-UI-001`                    |
| Git branches             | type/short-description                | `feat/astroflow-rfq-test`       |
| Commits                  | conventional commits                  | `test: automate RFQ happy path` |

## Method naming guidance

Prefer names that describe intent:

- `openRequestQuote`
- `selectOnlyService`
- `submitAndCaptureSuccessAlert`
- `expectOnlyServiceSelected`

Avoid vague names:

- `clickButton`
- `fillForm`
- `doTest`
- `test1`
- `helper`
