import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Paper, useTheme } from '@mui/material';

import { AppHeader } from '@src/common/components/AppHeader';
import { Loading } from '@src/common/components/Loading';

export function ProtectedLayout() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: ['100vh', '100dvh'],
      }}
    >
      <AppHeader />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          flexShrink: 1,
          padding: 2,
          paddingTop: 9,
          [theme.breakpoints.up('sm')]: {
            paddingTop: 10,
          },
        }}
      >
        <Suspense fallback={Loading()}>
          <Outlet />
        </Suspense>
      </Box>

      <Paper
        elevation={1}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </Box>
  );
}
