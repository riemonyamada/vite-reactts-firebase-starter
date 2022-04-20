import { PaletteOptions } from '@mui/material';
import type {} from '@mui/lab/themeAugmentation';

export const lightModePaletteOptions: PaletteOptions = {
  primary: {
    main: '#009CE5',
  },
  secondary: {
    main: '#555273',
  },
  background: {
    default: '#EFF5F8',
    paper: '#FFFFFF',
  },
  mode: 'light',
};

export const darkModePaletteOptions: PaletteOptions = {
  primary: {
    main: '#009CE5',
  },
  secondary: {
    main: '#555273',
  },
  background: {
    default: '#1D1E1F',
    paper: '#2E2F31',
  },
  mode: 'dark',
};
