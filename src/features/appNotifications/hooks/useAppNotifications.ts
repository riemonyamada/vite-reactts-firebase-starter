import { useCallback } from 'react';

import { atom, useAtomValue, useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';

import type { SnackbarProps } from '@mui/material';

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

export const appNotificationOptionAtom = atom<Option | null>(null);
export const appNotificationsAtom = atom<AppNotification[]>([]);

type AppNotificationWithoutUid = Omit<AppNotification, 'uid'>;

export function useAddAppNotification() {
  const setNotifications = useSetAtom(appNotificationsAtom);
  const appNotificationMax = useAtomValue(appNotificationOptionAtom)?.max;

  return useCallback(
    ({ message, severity }: AppNotificationWithoutUid) => {
      setNotifications((previousNotifications) => {
        const newNotification: AppNotification = {
          uid: nanoid(),
          message,
          severity,
        };
        const updatedNotifications = [newNotification].concat(previousNotifications);
        if (appNotificationMax && updatedNotifications.length > appNotificationMax) {
          updatedNotifications.pop();
        }
        return updatedNotifications;
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [setNotifications, appNotificationMax],
  );
}

export function useResetAppNotifications() {
  const setNotifications = useSetAtom(appNotificationsAtom);

  return useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);
}
