import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { ProtectedLayout } from '@src/pages/ProtectedLayout';
import { lazyImport } from '@src/utils/lazyImport';

const Home = lazyImport(() => import('@src/pages/Home'), 'Home');
const Common = lazyImport(() => import('@src/pages/Common'), 'Common');
const NotFound = lazyImport(() => import('@src/pages/NotFound'), 'NotFound');

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
      { path: '/common', element: <Common /> },
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
