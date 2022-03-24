import { Alert, Snackbar, SnackbarProps } from '@mui/material';
import { useState } from 'react';

export type AppNotification = {
  uid: string;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
};

export type Option = {
  // stackDirection: string. One of "top" or "bottom".
  // If "top" is assigned, then the notification will stack upwards.
  // If "bottom" is assigned, they will stack downwards.
  stackDirection?: 'bottom' | 'top';
  // max: integer. The max number of notifications that are displayed in a group.
  // The oldest notification will be removed if the max nr of notifications is reached.
  max: number;
  // zIndexBase: int. The minimum z-index. Helps to put Snackbars on top of modals.
  zIndexBase?: number;
  // space: number. The distance in pixels from the previous notification
  space?: number;
  snackbarOption: SnackbarProps;
};

type StackedSnackbarProps = {
  option: Option;
  notifications: AppNotification[];
  onClose: (notification: AppNotification) => void;
};

export function StackedSnackbar({ option, notifications, onClose }: StackedSnackbarProps) {
  const [snackbarHeights, setSnackbarHeights] = useState<Map<string, number>>(new Map());

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason: string,
    notification: AppNotification,
  ) => {
    if (reason === 'clickaway' || reason === 'escapeKeyDown') {
      return;
    }
    onClose(notification);
  };

  return (
    <>
      {notifications.map((notification, notificationIndex) => (
        <Snackbar
          open
          key={notification.uid}
          ref={(ref: HTMLInputElement | null) => {
            if (!snackbarHeights.has(notification.uid) && ref && ref.clientHeight > 0) {
              // eslint-disable-next-line max-len
              setSnackbarHeights((previousSnackbarHeights) => new Map(previousSnackbarHeights).set(notification.uid, ref.clientHeight));
            }
          }}
          sx={{
            transform: `translateY(${(() => {
              const sign = option.stackDirection === 'top' ? -1 : 1;
              const shift = notifications
                .filter((notificationInLoop, indexInLoop) => {
                  const snackbarHeight = snackbarHeights.get(notificationInLoop.uid);
                  return snackbarHeight && indexInLoop < notificationIndex;
                })
                .reduce((acc, notificationInLoop) => {
                  const snackbarHeight = snackbarHeights.get(notificationInLoop.uid);
                  const diff = snackbarHeight ?? 0;
                  return acc + diff + (option.space || 0);
                }, 0) || 0;

              return sign * shift;
            })()}px)`,
            zIndex: `${(() => {
              let base = 9999;
              if (option.zIndexBase !== undefined) {
                base = option.zIndexBase;
              }
              return base + snackbarHeights.size - notificationIndex;
            })()}`,
            transition: `${(() => {
              if (notificationIndex === 0) {
                return 'all 0s';
              }
              return 'all 1s';
            })()}`,
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
      ))}
    </>
  );
}
