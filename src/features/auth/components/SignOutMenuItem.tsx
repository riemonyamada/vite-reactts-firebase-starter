import { useEffect } from 'react';

import { MenuItem } from '@mui/material';

import { useAddAppNotification } from '@src/features/appNotifications/hooks/useAppNotifications';

import { useSignOut } from '../hooks/useSignOut';

import type { MenuItemProps } from '@mui/material';

type SignOutMenuItemProps = Omit<MenuItemProps, 'onClick'>;

export function SignOutMenuItem(props: SignOutMenuItemProps) {
  const { signOut, loading, error } = useSignOut();
  const addAppNotification = useAddAppNotification();

  useEffect(() => {
    if (error && error.message) {
      addAppNotification({ message: error.message, severity: 'error' });
    }
  }, [error, addAppNotification]);

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    void signOut();
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MenuItem onClick={handleClick} disabled={loading} {...props} />;
}
