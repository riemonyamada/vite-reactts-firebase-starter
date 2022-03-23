/// <reference types="vite/client" />

declare const APP_VERSION: string;
interface ImportMetaEnv {
  readonly VITE_PROJECT_NAME: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_FB_API_KEY: string;
  readonly VITE_FB_PROJECT_ID: string;
  readonly VITE_FB_APP_ID: string;
  readonly VITE_FB_MESSAGING_SENDER_ID: string;
  readonly VITE_FB_MEASUREMENT_ID: string;
  readonly VITE_FB_APPCHECK_DEBUG_TOKEN: string;
  readonly VITE_FB_RECAPTCHA_SITE_KEY: string;
}

interface Window {
  FIREBASE_APPCHECK_DEBUG_TOKEN?: string | boolean;
}
