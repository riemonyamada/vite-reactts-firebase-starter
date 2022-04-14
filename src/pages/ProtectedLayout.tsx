import {
  AppBar, Box, Paper, Toolbar, Typography,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AccountMenu } from '@src/common/components/AccountMenue';

export function ProtectedLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <AppBar position="fixed" elevation={1}>
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
            @riemonyamada
          </Typography>

          <AccountMenu />
        </Toolbar>
      </AppBar>

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
