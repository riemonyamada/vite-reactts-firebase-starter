import { useEffect } from 'react';
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';

import { init, reactRouterV6Instrumentation } from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// Note: For the useRoutingInstrumentation hook to work, it must be called from a component
// that is nested inside your BrowserRouter(or MemoryRouter) component
export function initSentry() {
  init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        ),
      }),
    ],
    tracesSampleRate: 1.0,
    release: `${import.meta.env.VITE_SENTRY_PROJECT}@${APP_VERSION}`,
    environment: import.meta.env.MODE,
  });
}
