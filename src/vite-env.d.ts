/// <reference types="vite/client" />

declare const APP_VERSION: string;
interface ImportMetaEnv {
  readonly VITE_PROJECT_NAME: string;
  readonly VITE_SENTRY_DSN: string;
}
