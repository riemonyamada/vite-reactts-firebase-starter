import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@sentry/react';
import { Provider } from 'jotai';

import { AppThemeProvider } from '@src/common/components/AppThemeProvider';
import { ErrorFallback } from '@src/common/components/ErrorFallback';
import { FirebaseRoot } from '@src/common/components/FirebaseRoot';
import { ReloadPrompt } from '@src/common/components/ReloadPrompt';
import { SentryRoot } from '@src/common/components/SentryRoot';
import { initializeI18n } from '@src/lib/i18n';
import { AppRoutes } from '@src/routes';

// This init is a async function. Hooks to use i18n manage it by suspense.
void initializeI18n();

export function App() {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Provider>
        <FirebaseRoot>
          <AppThemeProvider>
            <BrowserRouter>
              <SentryRoot>
                <AppRoutes />
              </SentryRoot>
            </BrowserRouter>
            <ReloadPrompt />
          </AppThemeProvider>
        </FirebaseRoot>
      </Provider>
    </ErrorBoundary>
  );
}
