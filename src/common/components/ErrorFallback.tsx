import { Box, Button, Typography } from '@mui/material';

export function ErrorFallback() {
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
        <Typography variant="h3">Ooops, something went wrong :(</Typography>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          size="large"
          onClick={() => window.location.assign(window.location.origin)}
        >
          Refresh
        </Button>
      </Box>
    </Box>
  );
}
