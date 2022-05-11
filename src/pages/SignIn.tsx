import { Box, Typography, Container } from '@mui/material';

import { SignInForm } from '@src/features/auth/components/SignInForm';

export function SignIn() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ fontSize: 80 }}>🐳</Box>

        <Typography component="h1" variant="subtitle2" sx={{ color: 'primary.main' }}>
          @riemonyamada
        </Typography>

        <SignInForm />
      </Box>
    </Container>
  );
}
