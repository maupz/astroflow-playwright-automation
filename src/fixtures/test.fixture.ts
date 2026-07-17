import { test as base, expect } from '@playwright/test';
import { HomePage } from '@pages/home.page';
import { RfqPage } from '@pages/rfq.page';

type UiFixtures = {
  homePage: HomePage;
  rfqPage: RfqPage;
};

export const test = base.extend<UiFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  rfqPage: async ({ page }, use) => {
    await use(new RfqPage(page));
  },
});

export { expect };
