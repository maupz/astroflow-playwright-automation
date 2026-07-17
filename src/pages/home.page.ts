import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly topRightRequestQuoteLink: Locator;

  constructor(private readonly page: Page) {
    /*
     * The header contains two links named "Request Quote":
     * one navigation item and one separate top-right CTA.
     * The CTA is the last matching link inside the header in the current DOM.
     *
     * In a product team, the preferred long-term improvement would be a unique
     * accessible name or a stable test id owned by the application.
     */
    this.topRightRequestQuoteLink = page
      .locator('header')
      .getByRole('link', { name: 'Request Quote', exact: true })
      .last();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.topRightRequestQuoteLink).toBeVisible();
  }

  async openRequestQuote(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/\/rfq\/?$/),
      this.topRightRequestQuoteLink.click(),
    ]);
  }
}
