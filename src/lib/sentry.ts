import { init } from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { ReactRouterInstrumentation } from '@sentry/react/dist/types';

// Note: For the useRoutingInstrumentation hook to work, it must be called from a component
// that is nested inside your BrowserRouter(or MemoryRouter) component
export function initSentry(routingInstrumentation: ReactRouterInstrumentation) {
  const browserTracing = new BrowserTracing({
    routingInstrumentation,
  });
  init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [browserTracing],
    release: `${import.meta.env.VITE_SENTRY_PROJECT}@${APP_VERSION}`,
    environment: import.meta.env.MODE,
  });
}
