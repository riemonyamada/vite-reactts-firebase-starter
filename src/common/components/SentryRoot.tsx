import { ReactElement, useEffect } from 'react';
import { initSentry } from '@src/lib/sentry';
import useRoutingInstrumentation from 'react-router-v6-instrumentation';

type SentryRootProps = {
  children: ReactElement;
};

export function SentryRoot({ children }: SentryRootProps) {
  // https://github.com/getsentry/sentry-javascript/issues/4118
  const routingInstrumentation = useRoutingInstrumentation();

  useEffect(() => {
    initSentry(routingInstrumentation);
  }, [routingInstrumentation]);

  return children;
}
