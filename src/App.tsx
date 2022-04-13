import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';
import { Provider } from 'jotai';
import { AppRoutes } from '@src/routes';
import { ErrorFallback } from '@src/common/components/ErrorFallback';
import { FirebaseRoot } from '@src/common/components/FirebaseRoot';
import { AppThemeProvider } from '@src/common/components/AppThemeProvider';
import { SentryRoot } from '@src/common/components/SentryRoot';
import { ReloadPrompt } from '@src/common/components/ReloadPrompt';
import { initializeI18n } from '@src/lib/i18n';

initializeI18n();

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
