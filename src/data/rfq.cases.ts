import { buildRfqRequest } from '@data/rfq-request.builder';

export const rfqHappyPathCases = [
  {
    id: 'RFQ-UI-001',
    title: 'submit a complete quote request selecting exactly one service',
    data: buildRfqRequest(),
  },

  /*
   * Add more data-driven variants by duplicating this object.
   * The same test workflow will run once per case.
   *
   * {
   *   id: 'RFQ-UI-002',
   *   title: 'submit a healthcare transportation request',
   *   data: buildRfqRequest({
   *     company: { industry: 'Healthcare & Pharmaceuticals' },
   *     requirements: {
   *       service: 'Transportation & Distribution',
   *       timeline: 'Immediate (Within 1 month)',
   *       estimatedMonthlyVolume: '2,500 temperature-controlled units',
   *     },
   *   }),
   * },
   */
] as const;
