import { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Loading } from '@src/common/components/Loading';
import { useAuthUser } from '@src/common/hooks/useAuth';
import { Common } from '@src/pages/Common';
import {
  useAppNotificationComponent,
  useResetAppNotifications,
} from '@src/common/hooks/useAppNotifications';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

function RoutesWithAuth() {
  const authUser = useAuthUser();
  const resetAppNotifications = useResetAppNotifications();

  useEffect(() => {
    resetAppNotifications();
  }, [authUser, resetAppNotifications]);

  const commonRoutes = [{ path: '/common', element: <Common /> }];
  const routes = authUser ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
}

export function AppRoutes() {
  const appNotificationComponent = useAppNotificationComponent({
    stackDirection: 'top',
    max: 10,
    space: 10,
    snackbarOption: {
      open: true,
      autoHideDuration: 6000,
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    },
  });

  return (
    <Suspense fallback={Loading()}>
      <RoutesWithAuth />
      {appNotificationComponent()}
    </Suspense>
  );
}
