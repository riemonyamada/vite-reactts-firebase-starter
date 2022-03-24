import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';
import { Provider } from 'jotai';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@src/lib/theme';
import { AppRoutes } from '@src/routes';
import { ErrorFallback } from '@src/common/components/ErrorFallback';
import { FirebaseRoot } from '@src/common/components/FirebaseRoot';
import { SentryRoot } from '@src/common/components/SentryRoot';
import { ReloadPrompt } from '@src/common/components/ReloadPrompt';

export function App() {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Provider>
        <FirebaseRoot>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <SentryRoot>
                <AppRoutes />
              </SentryRoot>
            </BrowserRouter>
            <ReloadPrompt />
          </ThemeProvider>
        </FirebaseRoot>
      </Provider>
    </ErrorBoundary>
  );
}
