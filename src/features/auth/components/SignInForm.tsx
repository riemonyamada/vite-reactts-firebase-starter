import { useEffect } from 'react';
import { TextField, Box, BoxProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAddAppNotification } from '@src/common/hooks/useAppNotifications';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSignIn } from '../hooks/useSignIn';

type Inputs = {
  email: string;
  password: string;
};

export function SignInForm(props: BoxProps) {
  const { t } = useTranslation('common');

  const { signIn, loading, error } = useSignIn();
  const addAppNotification = useAddAppNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    await signIn(email, password);
  };

  useEffect(() => {
    if (error && error.message) {
      addAppNotification({ message: error.message, severity: 'error' });
    }
  }, [error, addAppNotification]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box {...props}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register('email', {
            required: { value: true, message: t('auth.required') },
          })}
          helperText={errors.email?.message}
          error={!!errors.email}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: { value: true, message: t('auth.required') },
          })}
          helperText={errors.password?.message}
          error={!!errors.password}
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 3 }}
          loading={loading}
        >
          SignIn
        </LoadingButton>
      </Box>
    </Box>
  );
}