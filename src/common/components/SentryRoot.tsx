import type { ReactElement } from 'react';
import { useEffect } from 'react';

import { initSentry } from '@src/lib/sentry';

type SentryRootProps = {
  children: ReactElement;
};

export function SentryRoot({ children }: SentryRootProps) {
  useEffect(() => {
    // https://github.com/getsentry/sentry-javascript/issues/4118
    initSentry();
  }, []);

  return children;
}
