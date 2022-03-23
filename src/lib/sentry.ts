import { ReactElement, useEffect } from 'react';
import { init } from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import useRoutingInstrumentation from 'react-router-v6-instrumentation';

// Note: For the useRoutingInstrumentation hook to work, it must be called from a component
// that is nested inside your BrowserRouter(or MemoryRouter) component
export function useSentry() {
  // https://github.com/getsentry/sentry-javascript/issues/4118
  const routingInstrumentation = useRoutingInstrumentation();
  useEffect(() => {
    const browserTracing = new BrowserTracing({
      routingInstrumentation,
    });
    init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [browserTracing],
      release: `${import.meta.env.VITE_PROJECT_NAME}@${APP_VERSION}`,
      environment: import.meta.env.MODE,
      debug: import.meta.env.MODE === 'development',
    });
  }, [routingInstrumentation]);
}

type SentryRootProps = {
  children: ReactElement;
};

export function SentryRoot({ children }: SentryRootProps) {
  useSentry();
  return children;
}
