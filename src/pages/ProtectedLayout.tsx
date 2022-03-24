import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  AppBar, Box, Toolbar, Typography,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAuthUser, useSignOut } from '@src/common/hooks/useAuth';
import { useAddAppNotification } from '@src/common/hooks/useAppNotifications';

export function ProtectedLayout() {
  const authUser = useAuthUser();
  const { signOut, loading, error } = useSignOut();
  const addAppNotification = useAddAppNotification();

  useEffect(() => {
    if (error && error.message) {
      addAppNotification({ message: error.message, severity: 'error' });
    }
  }, [error, addAppNotification]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {authUser?.email ?? 'empty user'}
            </Typography>
            <LoadingButton color="inherit" onClick={signOut} loading={loading} variant="outlined">
              SignOut
            </LoadingButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}
