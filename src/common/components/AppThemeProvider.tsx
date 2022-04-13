import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { lightModePaletteOptions, darkModePaletteOptions } from '@src/lib/theme';
import { Global } from '@emotion/react';
import { useColorMode } from '../hooks/useColorMode';

type AppThemeProviderProps = {
  children: ReactNode;
};

const defaultTheme = createTheme();

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const colorMode = useColorMode();
  const palette = colorMode === 'light' ? lightModePaletteOptions : darkModePaletteOptions;

  const theme = createTheme({
    typography: {
      fontFamily: ['"Noto Sans JP"', 'sans-serif'].join(','),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '::-webkit-scrollbar': {
            width: 5,
            height: 5,
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#9e9e9e',
            borderRadius: 2.5,
          },
          '::-webkit-scrollbar-corner': {
            backgroundColor: 'inherit',
          },
          [defaultTheme.breakpoints.up('md')]: {
            '::-webkit-scrollbar': {
              width: 10,
              height: 10,
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: '#9e9e9e',
              borderRadius: 5,
            },
          },
        },
      },
    },
    palette,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global
        styles={{
          html: {
            height: '100%',
          },
          body: {
            height: '100%',
          },
          '#root': {
            height: '100%',
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
