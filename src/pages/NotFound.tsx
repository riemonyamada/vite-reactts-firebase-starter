import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation('common');

  return (
    <Box
      sx={{
        minHeight: '100%',
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
        <Typography variant="h3">{t('notFound.message')}</Typography>
      </Box>
    </Box>
  );
}
