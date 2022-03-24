import { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type {
  AppNotification as AppNotificationWithUid,
  Option,
} from '@src/common/components/StackedSnackbar';
import { StackedSnackbar } from '@src/common/components/StackedSnackbar';
import {
  atom, useAtom, useAtomValue, useSetAtom,
} from 'jotai';

const appNotificationOptionAtom = atom<Option | null>(null);
const appNotificationsAtom = atom<AppNotificationWithUid[]>([]);

export function useAppNotificationComponent(option: Option) {
  const [notifications, setNotifications] = useAtom(appNotificationsAtom);
  const setAppNotificationOption = useSetAtom(appNotificationOptionAtom);

  useEffect(() => {
    setAppNotificationOption(option);
  }, [option, setAppNotificationOption]);

  const handleClose = useCallback(
    (notification: AppNotificationWithUid) => {
      // eslint-disable-next-line max-len
      setNotifications((previousNotifications) => previousNotifications.filter(({ uid }) => uid !== notification.uid));
    },
    [setNotifications],
  );

  return useCallback(
    () => StackedSnackbar({ option, notifications, onClose: handleClose }),
    [option, notifications, handleClose],
  );
}

type AppNotification = Omit<AppNotificationWithUid, 'uid'>;

export function useAddAppNotification() {
  const setNotifications = useSetAtom(appNotificationsAtom);
  const appNotificationMax = useAtomValue(appNotificationOptionAtom)?.max;

  return useCallback(
    ({ message, severity }: AppNotification) => {
      setNotifications((previousNotifications) => {
        const newNotification: AppNotificationWithUid = {
          uid: uuidv4(),
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
