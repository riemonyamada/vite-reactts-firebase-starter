import { useRegisterSW } from 'virtual:pwa-register/react';
import { Alert, Button, Snackbar } from '@mui/material';

export function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({});

  const handleClose = (event: React.SyntheticEvent | Event, reason: string) => {
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
        action={(
          <>
            <Button color="inherit" size="small" onClick={() => updateServiceWorker(true)}>
              Update
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={(e) => {
                handleClose(e, 'clickClose');
              }}
            >
              Close
            </Button>
          </>
        )}
      >
        A new version is coming!
      </Alert>
    </Snackbar>
  );
}
