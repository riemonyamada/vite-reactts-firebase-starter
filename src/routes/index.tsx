import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Loading } from '@src/common/components/Loading';
import { useAuthUser } from '@src/common/hooks/useAuth';
import { Common } from '@src/pages/Common';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

function RoutesWithAuth() {
  const authUser = useAuthUser();

  const commonRoutes = [{ path: '/common', element: <Common /> }];
  const routes = authUser ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
}

export function AppRoutes() {
  return (
    <Suspense fallback={Loading()}>
      <RoutesWithAuth />
    </Suspense>
  );
}
