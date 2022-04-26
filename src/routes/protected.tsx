import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { Home } from '@src/pages/Home';
import { NotFound } from '@src/pages/NotFound';
import { ProtectedLayout } from '@src/pages/ProtectedLayout';

function NavigateToOriginalPath() {
  const originalPath = new URLSearchParams(window.location.search).get('redirect');
  const path = !originalPath || originalPath.startsWith('/signin') ? '/' : originalPath;
  return <Navigate to={path} />;
}

export const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signin/*',
        element: <NavigateToOriginalPath />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
