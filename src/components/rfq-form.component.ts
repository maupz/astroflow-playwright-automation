import { expect, type Locator, type Page } from '@playwright/test';
import {
  SERVICE_OPTIONS,
  type RfqRequest,
  type Service,
} from '@models/rfq-request';

export const RFQ_SUCCESS_MESSAGE =
  'Thank you for your request! We will contact you within 24 hours.';

export class RfqFormComponent {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly companyNameInput: Locator;
  readonly industrySelect: Locator;
  readonly timelineSelect: Locator;
  readonly estimatedMonthlyVolumeInput: Locator;
  readonly projectDetailsTextarea: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.getByLabel(/^First Name/);
    this.lastNameInput = page.getByLabel(/^Last Name/);
    this.emailInput = page.getByLabel(/^Email Address/);
    this.phoneInput = page.getByLabel(/^Phone Number/);
    this.companyNameInput = page.getByLabel(/^Company Name/);
    this.industrySelect = page.getByLabel(/^Industry/);
    this.timelineSelect = page.getByLabel(/^Timeline/);
    this.estimatedMonthlyVolumeInput = page.getByLabel(
      /^Estimated Monthly Volume/,
    );
    this.projectDetailsTextarea = page.getByLabel(/^Project Details/);
    this.submitButton = page.getByRole('button', {
      name: 'Submit Request',
      exact: true,
    });
  }

  serviceCheckbox(service: Service): Locator {
    return this.page.getByRole('checkbox', { name: service, exact: true });
  }

  async fill(request: RfqRequest): Promise<void> {
    await this.firstNameInput.fill(request.contact.firstName);
    await this.lastNameInput.fill(request.contact.lastName);
    await this.emailInput.fill(request.contact.email);
    await this.phoneInput.fill(request.contact.phone);

    await this.companyNameInput.fill(request.company.companyName);
    await this.industrySelect.selectOption({ label: request.company.industry });

    await this.selectOnlyService(request.requirements.service);
    await this.timelineSelect.selectOption({
      label: request.requirements.timeline,
    });
    await this.estimatedMonthlyVolumeInput.fill(
      request.requirements.estimatedMonthlyVolume,
    );
    await this.projectDetailsTextarea.fill(request.requirements.projectDetails);
  }

  async selectOnlyService(selectedService: Service): Promise<void> {
    for (const service of SERVICE_OPTIONS) {
      const checkbox = this.serviceCheckbox(service);
      const isSelected = await checkbox.isChecked();

      if (service === selectedService && !isSelected) {
        await checkbox.click();
      }

      if (service !== selectedService && isSelected) {
        await checkbox.click();
      }
    }
  }

  async expectOnlyServiceSelected(selectedService: Service): Promise<void> {
    for (const service of SERVICE_OPTIONS) {
      const checkbox = this.serviceCheckbox(service);

      if (service === selectedService) {
        await expect(checkbox).toBeChecked();
      } else {
        await expect(checkbox).not.toBeChecked();
      }
    }
  }

  async submitAndCaptureSuccessAlert(): Promise<string> {
    const messagePromise = new Promise<string>((resolve, reject) => {
      this.page.once('dialog', async (dialog) => {
        try {
          const message = dialog.message();
          await dialog.accept();
          resolve(message);
        } catch (error) {
          reject(error);
        }
      });
    });

    await this.submitButton.click();
    return messagePromise;
  }

  async expectReset(): Promise<void> {
    await expect(this.firstNameInput).toHaveValue('');
    await expect(this.lastNameInput).toHaveValue('');
    await expect(this.emailInput).toHaveValue('');
    await expect(this.phoneInput).toHaveValue('');
    await expect(this.companyNameInput).toHaveValue('');
    await expect(this.industrySelect).toHaveValue('');
    await expect(this.timelineSelect).toHaveValue('');
    await expect(this.estimatedMonthlyVolumeInput).toHaveValue('');
    await expect(this.projectDetailsTextarea).toHaveValue('');

    for (const service of SERVICE_OPTIONS) {
      await expect(this.serviceCheckbox(service)).not.toBeChecked();
    }
  }
}
