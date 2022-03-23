import { Navigate, RouteObject } from 'react-router-dom';
import { ProtectedLayout } from '@src/pages/ProtectedLayout';
import { Home } from '@src/pages/Home';
import { NotFound } from '@src/pages/NotFound';

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
