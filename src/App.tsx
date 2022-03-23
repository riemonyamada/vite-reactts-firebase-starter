import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@src/lib/theme';
import { Loading } from '@src/common/components/Loading';
import { AppRoutes } from '@src/routes';
import { ErrorFallback } from '@src/common/components/ErrorFallback';
import { useInitializeFirebase } from './lib/firebase';
import { useSentry } from './lib/sentry';

function AppRoutesWithLibs() {
  useSentry();
  useInitializeFirebase();

  return <AppRoutes />;
}

export function App() {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={Loading()}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AppRoutesWithLibs />
          </BrowserRouter>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
