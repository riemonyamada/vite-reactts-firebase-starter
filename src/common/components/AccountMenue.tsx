import { useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ThemeSwitch } from '@src/common/components/ThemeSwitch';
import { useAuthUser } from '@src/common/hooks/useAuthUser';
import { SignOutMenuItem } from '@src/features/auth/components/SignOutMenuItem';

export function AccountMenu() {
  const { t } = useTranslation('auth');

  const authUser = useAuthUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.main' }}>
          <PersonIcon />
        </Avatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>{authUser?.email ?? 'empty user'}</MenuItem>
        <Divider />
        <SignOutMenuItem sx={{ width: 200 }}>{t('accountMenu.signOut')}</SignOutMenuItem>
        <MenuItem>
          <ThemeSwitch />
        </MenuItem>
      </Menu>
    </>
  );
}
