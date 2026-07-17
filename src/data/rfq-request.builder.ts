import type { DeepPartial, RfqRequest } from '@models/rfq-request';

const defaultRfqRequest: RfqRequest = {
  contact: {
    firstName: 'Automation',
    lastName: 'Candidate',
    email: 'automation.candidate+astroflow@example.com',
    phone: '+1 202 555 0147',
  },
  company: {
    companyName: 'Quality Engineering Portfolio',
    industry: 'Technology & Electronics',
  },
  requirements: {
    service: 'Warehousing & Storage',
    timeline: '1-3 months',
    estimatedMonthlyVolume: '10,000 units',
    projectDetails:
      'Automated UI test request for a scalable warehousing solution, inventory visibility, and distribution support.',
  },
};

export function buildRfqRequest(
  overrides: DeepPartial<RfqRequest> = {},
): RfqRequest {
  return {
    contact: {
      ...defaultRfqRequest.contact,
      ...overrides.contact,
    },
    company: {
      ...defaultRfqRequest.company,
      ...overrides.company,
    },
    requirements: {
      ...defaultRfqRequest.requirements,
      ...overrides.requirements,
    },
  };
}
