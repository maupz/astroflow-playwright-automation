import { RFQ_SUCCESS_MESSAGE } from '@components/rfq-form.component';
import { rfqHappyPathCases } from '@data/rfq.cases';
import { expect, test } from '@fixtures/test.fixture';

test.describe('AstroFlow RFQ submission @ui @smoke', () => {
  for (const testCase of rfqHappyPathCases) {
    test(`${testCase.id} - ${testCase.title}`, async ({
      homePage,
      rfqPage,
    }) => {
      await test.step('Open AstroFlow and navigate using the top-right CTA', async () => {
        await homePage.goto();
        await homePage.openRequestQuote();
        await rfqPage.expectLoaded();
      });

      await test.step('Complete every RFQ field with valid test data', async () => {
        await rfqPage.form.fill(testCase.data);
        await rfqPage.form.expectOnlyServiceSelected(
          testCase.data.requirements.service,
        );
      });

      await test.step('Submit the request and verify the success alert', async () => {
        const successMessage =
          await rfqPage.form.submitAndCaptureSuccessAlert();

        expect(successMessage).toBe(RFQ_SUCCESS_MESSAGE);
        await rfqPage.form.expectReset();
      });
    });
  }
});
