import { Alert, Button, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function ReloadPrompt() {
  const { t } = useTranslation('common');

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({});

  const handleClose = (_event: React.SyntheticEvent | Event, reason: string) => {
    if (reason === 'clickaway' || reason === 'escapeKeyDown') {
      return;
    }
    setNeedRefresh(false);
  };

  return (
    <Snackbar
      open={needRefresh}
      autoHideDuration={null}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Alert
        severity="info"
        action={
          <>
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                void updateServiceWorker(true);
              }}
            >
              {t('reloadPrompt.update')}
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={(e) => {
                handleClose(e, 'clickClose');
              }}
            >
              {t('reloadPrompt.close')}
            </Button>
          </>
        }
      >
        {t('reloadPrompt.message')}
      </Alert>
    </Snackbar>
  );
}
