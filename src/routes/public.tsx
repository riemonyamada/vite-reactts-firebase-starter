import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { SignIn } from '@src/pages/SignIn';

function NavigateToSignIn() {
  const originalPath = window.location.pathname + window.location.search;
  const searchParams = new URLSearchParams({ redirect: originalPath }).toString();

  return <Navigate to={`/signin/?${searchParams}`} />;
}

export const publicRoutes: RouteObject[] = [
  {
    path: '/signin/*',
    element: <SignIn />,
  },
  { path: '*', element: <NavigateToSignIn /> },
];
