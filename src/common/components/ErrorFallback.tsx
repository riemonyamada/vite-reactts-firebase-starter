import { css } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// use div instead of box: https://github.com/mui/material-ui/issues/31835
export function ErrorFallback() {
  const { t } = useTranslation('common');

  return (
    <div
      css={css({
        minHeight: ['100vh', '100dvh'],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <div
        css={css({
          textAlign: 'center',
        })}
      >
        <Typography variant="h3">{t('errorFallback.message')}</Typography>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          size="large"
          onClick={() => window.location.assign(window.location.origin)}
        >
          {t('errorFallback.refresh')}
        </Button>
      </div>
    </div>
  );
}
