import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { PublicLayout } from '@src/pages/PublicLayout';
import { lazyImport } from '@src/utils/lazyImport';

const SignIn = lazyImport(() => import('@src/pages/SignIn'), 'SignIn');
const Common = lazyImport(() => import('@src/pages/Common'), 'Common');

function NavigateToSignIn() {
  const originalPath = window.location.pathname + window.location.search;
  const searchParams = new URLSearchParams({ redirect: originalPath }).toString();

  return <Navigate to={`/signin/?${searchParams}`} />;
}

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/signin/*',
        element: <SignIn />,
      },
      { path: '/common', element: <Common /> },
      { path: '*', element: <NavigateToSignIn /> },
    ],
  },
];
