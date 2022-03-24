import { ReactElement } from 'react';
import { useSentry } from '@src/lib/sentry';

type SentryRootProps = {
  children: ReactElement;
};

export function SentryRoot({ children }: SentryRootProps) {
  useSentry();
  return children;
}
