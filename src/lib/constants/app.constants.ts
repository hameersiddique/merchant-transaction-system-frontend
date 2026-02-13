export const STORAGE_KEYS = {
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_TOKEN: 'access_token',
  MERCHANT: 'merchant_data',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const CURRENCIES = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'KWD', label: 'KWD - Kuwaiti Dinar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
] as const;

export const API_TIMEOUT = 30000; // 30 seconds

export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATETIME_FORMAT = 'MMM dd, yyyy hh:mm a';
