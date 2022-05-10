import { useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { languageOptions } from '@src/lib/i18n';

export function LanguageMenu() {
  const { i18n } = useTranslation('common');
  const resolvedLanguageOption = languageOptions.find(
    (option) => option.id === i18n.resolvedLanguage,
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLElement>,
    option: typeof languageOptions[number],
  ) => {
    setAnchorEl(null);
    void i18n.changeLanguage(option.id);
  };

  return (
    <>
      <Button
        id="language-button"
        onClick={handleClick}
        color="inherit"
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="listbox"
        aria-expanded={open ? 'true' : undefined}
      >
        {resolvedLanguageOption?.displayName}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
          role: 'listbox',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languageOptions.map((option) => (
          <MenuItem
            key={option.id}
            selected={option.id === resolvedLanguageOption?.id}
            onClick={(event) => handleMenuItemClick(event, option)}
          >
            {option.displayName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
