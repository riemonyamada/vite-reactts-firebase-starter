import { useEffect } from 'react';
import { MenuItem, MenuItemProps } from '@mui/material';
import { useAddAppNotification } from '@src/common/hooks/useAppNotifications';
import { useSignOut } from '../hooks/useSignOut';

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
    signOut();
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MenuItem onClick={handleClick} disabled={loading} {...props} />;
}
