import { Alert, Snackbar } from '@mui/material';

import type { AppNotification, Option } from '../hooks/useAppNotifications';

type AppSnackBarProps = {
  refCallback: (ref: HTMLInputElement | null) => void;
  translateY: number;
  option: Option;
  notification: AppNotification;
  notificationIndex: number;
  handleClose: (
    event: React.SyntheticEvent | Event,
    reason: string,
    notification: AppNotification,
  ) => void;
};

export function AppNotificationSnackbar({
  refCallback,
  translateY,
  notification,
  notificationIndex,
  option,
  handleClose,
}: AppSnackBarProps) {
  return (
    <Snackbar
      open
      ref={refCallback}
      sx={{
        transform: `translateY(${(() => {
          const sign = option.stackDirection === 'top' ? -1 : 1;
          return sign * translateY;
        })()}px)`,
        zIndex: `${(() => {
          let base = 1500;
          if (option.zIndexBase !== undefined) {
            base = option.zIndexBase;
          }
          return base + notificationIndex;
        })()}`,
        transition: `${(() => {
          if (notificationIndex === 0) {
            return 'all 0s';
          }
          return 'all 1s';
        })()}`,
        left: 'auto',
      }}
      onClose={(event, reason) => handleClose(event, reason, notification)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...option.snackbarOption}
    >
      <Alert
        severity={notification.severity}
        onClose={(event) => handleClose(event, 'clickClose', notification)}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
