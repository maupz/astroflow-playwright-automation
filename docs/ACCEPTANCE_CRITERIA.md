# Acceptance Criteria — AstroFlow RFQ UI Automation

## Feature

Submit a valid request for quote from the AstroFlow home page.

## Primary scenario: RFQ-UI-001

### Given

- The AstroFlow home page is available.
- The desktop header is visible.
- The RFQ form page is available.
- Valid test data exists for every required field.

### When

1. The user opens `https://astroflow.wingflows.com/`.
2. The user selects the top-right **Request Quote** CTA.
3. The application navigates to `/rfq`.
4. The user completes:
   - First Name
   - Last Name
   - Email Address
   - Phone Number
   - Company Name
   - Industry
   - Exactly one Service Needed option
   - Timeline
   - Estimated Monthly Volume
   - Project Details
5. The user selects **Submit Request**.

### Then

- The RFQ page URL ends with `/rfq`.
- The RFQ page heading is visible.
- Every required input contains valid data before submission.
- Exactly one of the six service checkboxes is selected.
- A native browser alert is captured.
- The alert message is exactly:

  `Thank you for your request! We will contact you within 24 hours.`

- The alert is accepted.
- The form is reset after successful submission.

## Quality attributes

- No fixed sleeps such as `waitForTimeout`.
- Locators prioritize labels and roles.
- The test is isolated and repeatable.
- Test data is separated from page behavior.
- Failures retain screenshot, video, trace, and HTML report evidence.
- The same workflow can run against multiple typed datasets and browsers.

## Explicitly out of scope for the initial task

- Required-field negative validation.
- Invalid email and phone validation.
- Selecting more than one service as a negative scenario.
- Mobile navigation.
- Accessibility audit.
- Visual regression.
- API/backend persistence validation.
- Performance and security testing.
