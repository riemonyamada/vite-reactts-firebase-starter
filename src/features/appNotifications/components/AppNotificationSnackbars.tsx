import { useEffect } from 'react';

import { useAtom, atom, useAtomValue, useSetAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { appNotificationOptionAtom, appNotificationsAtom } from '../hooks/useAppNotifications';

import { AppNotificationSnackbar } from './AppNotificationSnackbar';

import type { AppNotification, Option } from '../hooks/useAppNotifications';

const snackbarHeightAtomFamily = atomFamily((_index: number) => atom(0));

const snackbarTranslateYBaseAtomFamily = atomFamily((_index: number) => atom(0));
function createTranslateYAtom(index: number, translateY: number) {
  const translateYAtom = atom(
    (get) => get(snackbarTranslateYBaseAtomFamily(index)),
    (_get, set, value: number) => {
      set(snackbarTranslateYBaseAtomFamily(index), value);
    },
  );
  translateYAtom.onMount = (setAtom) => {
    setAtom(translateY);
  };
  return translateYAtom;
}

const zeroAtom = atom(0);
const snackbarTranslateYWrapperAtomFamily = atomFamily((index: number) => {
  const translateYAtom = atom((get) => {
    const option = get(appNotificationOptionAtom);
    const translateY = get(snackbarTranslateYBaseAtomFamily(index - 1));
    const height = get(snackbarHeightAtomFamily(index - 1));
    return option && height
      ? createTranslateYAtom(index, translateY + height + (option.space || 0))
      : zeroAtom;
  });
  return translateYAtom;
});

type AppNotificationSnackbarWithStateProps = Omit<
  Parameters<typeof AppNotificationSnackbar>[0],
  'refCallback' | 'translateY'
>;

function AppNotificationSnackbarWithState({
  notification,
  notificationIndex,
  option,
  handleClose,
}: AppNotificationSnackbarWithStateProps) {
  const translateY = useAtomValue(
    useAtomValue(snackbarTranslateYWrapperAtomFamily(notificationIndex)),
  );
  const setHeight = useSetAtom(snackbarHeightAtomFamily(notificationIndex));

  return (
    <AppNotificationSnackbar
      refCallback={(ref: HTMLInputElement | null) => {
        if (ref && ref.clientHeight > 0) {
          setHeight(ref.clientHeight);
        }
      }}
      translateY={translateY}
      notification={notification}
      notificationIndex={notificationIndex}
      option={option}
      handleClose={handleClose}
    />
  );
}

type AppNotificationSnackbarsProps = {
  option: Option;
};

export function AppNotificationSnackbars({ option }: AppNotificationSnackbarsProps) {
  const [notifications, setNotifications] = useAtom(appNotificationsAtom);
  const setAppNotificationOption = useSetAtom(appNotificationOptionAtom);

  useEffect(() => {
    setAppNotificationOption(option);
  }, [option, setAppNotificationOption]);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason: string,
    notification: AppNotification,
  ) => {
    if (reason === 'clickaway' || reason === 'escapeKeyDown') {
      return;
    }
    setNotifications((previousNotifications) =>
      previousNotifications.filter(({ uid }) => uid !== notification.uid),
    );
  };

  return (
    <>
      {notifications.map((notification, notificationIndex) => (
        <AppNotificationSnackbarWithState
          key={notification.uid}
          notification={notification}
          notificationIndex={notificationIndex}
          option={option}
          handleClose={handleClose}
        />
      ))}
    </>
  );
}
