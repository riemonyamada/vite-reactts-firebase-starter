import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@src/lib/theme';
import { AppRoutes } from '@src/routes';
import { ErrorFallback } from '@src/common/components/ErrorFallback';
import { FirebaseRoot } from '@src/common/components/FirebaseRoot';
import { SentryRoot } from '@src/common/components/SentryRoot';

export function App() {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <FirebaseRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <SentryRoot>
              <AppRoutes />
            </SentryRoot>
          </BrowserRouter>
        </ThemeProvider>
      </FirebaseRoot>
    </ErrorBoundary>
  );
}
