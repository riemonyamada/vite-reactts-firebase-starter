import React from 'react';

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazyImport<
  T extends React.ComponentType,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K) {
  return React.lazy(() => factory().then((module) => ({ default: module[name] })));
}
