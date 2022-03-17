import { Box, Typography } from '@mui/material';

export function NotFound() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography variant="h3">Ooops, the requested URL was not found :(</Typography>
      </Box>
    </Box>
  );
}
