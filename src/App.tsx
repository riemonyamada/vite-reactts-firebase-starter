import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { init, ErrorBoundary } from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import useRoutingInstrumentation from 'react-router-v6-instrumentation';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@src/lib/theme';
import { Loading } from '@src/common/components/Loading';
import { AppRoutes } from '@src/routes';
import { ErrorFallback } from '@src/common/components/ErrorFallback';
import { useInitializeFirebase } from './lib/firebase';

function AppRoutesWithSentry() {
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

  return <AppRoutes />;
}

export function App() {
  useInitializeFirebase();

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={Loading()}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AppRoutesWithSentry />
          </BrowserRouter>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
