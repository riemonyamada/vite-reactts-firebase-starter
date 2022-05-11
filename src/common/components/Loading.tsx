import { Box, CircularProgress } from '@mui/material';

export function Loading() {
  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
