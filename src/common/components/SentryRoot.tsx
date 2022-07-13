import type { ReactElement } from 'react';
import { useEffect } from 'react';
// import { Routes } from 'react-router-dom';

// import { withSentryReactRouterV6Routing } from '@sentry/react';

import { initSentry } from '@src/lib/sentry';

type SentryRootProps = {
  children: ReactElement;
};

// TODO: now can't use with useRoutes
// https://github.com/getsentry/sentry-javascript/issues/5338
// https://github.com/getsentry/sentry-javascript/issues/4118#issuecomment-1160930728
// https://github.com/getsentry/sentry-javascript/pull/5042#issuecomment-1160642403

// const SentryRoutes = withSentryReactRouterV6Routing(Routes);

export function SentryRoot({ children }: SentryRootProps) {
  useEffect(() => {
    initSentry();
  }, []);

  return children;
}
