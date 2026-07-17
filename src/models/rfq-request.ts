export const INDUSTRY_OPTIONS = [
  'E-Commerce & Retail',
  'Healthcare & Pharmaceuticals',
  'Automotive & Manufacturing',
  'Technology & Electronics',
  'Consumer Goods',
  'Food & Beverage',
  'Other',
] as const;

export const SERVICE_OPTIONS = [
  'Warehousing & Storage',
  'Manufacturing Services',
  'Transportation & Distribution',
  'Supply Chain Management',
  'Value-Added Services',
  'Technology Integration',
] as const;

export const TIMELINE_OPTIONS = [
  'Immediate (Within 1 month)',
  '1-3 months',
  '3-6 months',
  '6+ months',
  'Flexible',
] as const;

export type Industry = (typeof INDUSTRY_OPTIONS)[number];
export type Service = (typeof SERVICE_OPTIONS)[number];
export type Timeline = (typeof TIMELINE_OPTIONS)[number];

export interface ContactInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CompanyInformation {
  companyName: string;
  industry: Industry;
}

export interface ServiceRequirements {
  /**
   * A single value intentionally models the business rule required by this exercise:
   * exactly one service must be selected, even though the UI uses checkboxes.
   */
  service: Service;
  timeline: Timeline;
  estimatedMonthlyVolume: string;
  projectDetails: string;
}

export interface RfqRequest {
  contact: ContactInformation;
  company: CompanyInformation;
  requirements: ServiceRequirements;
}

export type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends object ? DeepPartial<T[Key]> : T[Key];
};
