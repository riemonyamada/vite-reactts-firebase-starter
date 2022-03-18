import { RouteObject, useRoutes } from 'react-router-dom';
import { NotFound } from '@src/pages/NotFound';
import { Home } from '@src/pages/Home';

export function AppRoutes() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Home />,
    },
    { path: '*', element: <NotFound /> },
  ];

  const element = useRoutes([...routes]);

  return element;
}
