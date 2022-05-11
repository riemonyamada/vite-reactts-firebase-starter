import { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import { useAuthUser } from '@src/common/hooks/useAuthUser';
import { AppNotificationSnackbars } from '@src/features/appNotifications/components/AppNotificationSnackbars';
import { useResetAppNotifications } from '@src/features/appNotifications/hooks/useAppNotifications';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

function Loading() {
  return (
    <Box
      sx={{
        minHeight: ['100vh', '100dvh'],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

function RoutesWithAuth() {
  const authUser = useAuthUser();
  const resetAppNotifications = useResetAppNotifications();

  useEffect(() => {
    resetAppNotifications();
  }, [authUser, resetAppNotifications]);

  const routes = authUser ? protectedRoutes : publicRoutes;
  const element = useRoutes(routes);

  return element;
}

export function AppRoutes() {
  return (
    <Suspense fallback={Loading()}>
      <RoutesWithAuth />
      <AppNotificationSnackbars
        option={{
          stackDirection: 'bottom',
          max: 10,
          space: 10,
          snackbarOption: {
            open: true,
            autoHideDuration: 6000,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          },
        }}
      />
    </Suspense>
  );
}
