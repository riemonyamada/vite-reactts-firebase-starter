import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useColorMode, useToggleColorMode } from '../hooks/useColorMode';

export function ThemeSwitch() {
  const { t } = useTranslation('common');

  const colorMode = useColorMode();
  const toggleColorMode = useToggleColorMode();

  const handleChange = () => {
    toggleColorMode();
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={colorMode === 'dark'} onChange={handleChange} />}
        label={t('layout.darkmode')}
      />
    </FormGroup>
  );
}
