export type Locale = (typeof locales)[number];

export const locales = ["en", "tk", "ru"];
export const defaultLocale: Locale = process.env.API_URL === 'https://kamilussat.com.tm' ? "tk" : 'en';

