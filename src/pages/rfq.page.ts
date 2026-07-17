import { expect, type Page } from '@playwright/test';
import { RfqFormComponent } from '@components/rfq-form.component';

export class RfqPage {
  readonly form: RfqFormComponent;

  constructor(private readonly page: Page) {
    this.form = new RfqFormComponent(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/rfq\/?$/);
    await expect(
      this.page.getByRole('heading', {
        level: 1,
        name: /Request a Quote/i,
      }),
    ).toBeVisible();
    await expect(this.form.submitButton).toBeVisible();
  }
}
