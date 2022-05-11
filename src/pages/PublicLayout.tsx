import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { Loading } from '@src/common/components/Loading';

export function PublicLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: ['100vh', '100dvh'],
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          flexShrink: 1,
          padding: 2,
        }}
      >
        <Suspense fallback={Loading()}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
}
