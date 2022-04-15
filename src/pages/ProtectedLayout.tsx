import { Box, Paper, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '@src/common/components/AppHeader';

export function ProtectedLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden',
      }}
    >
      <AppHeader />

      <Toolbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'scroll',
          paddingBottom: 7,
        }}
      >
        <Outlet />
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
