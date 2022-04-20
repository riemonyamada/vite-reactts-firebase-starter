import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
  Theme,
  AppBarProps,
  DrawerProps,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import HideSourceIcon from '@mui/icons-material/HideSource';
import { CSSObject } from '@emotion/react';
import { AccountMenu } from '@src/common/components/AccountMenue';

const upperNavs = [{ label: 'Home', to: '/', icon: <HomeIcon /> }];

const lowerNavs = [{ label: 'NotFound', to: '/not-found', icon: <HideSourceIcon /> }];

const drawerWidth = 240;

interface MyAppBarProps extends AppBarProps {
  open: boolean | undefined;
}

function MyAppBar({ open, ...props }: MyAppBarProps) {
  const theme = useTheme();
  return (
    <AppBar
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
    />
  );
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

function MyAppDrawer({ open, ...props }: DrawerProps) {
  const theme = useTheme();
  return (
    <Drawer
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        }),
      }}
    />
  );
}

export function AppHeader() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MyAppBar position="fixed" elevation={1} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            @riemonyamada
          </Typography>

          <AccountMenu />
        </Toolbar>
      </MyAppBar>
      <MyAppDrawer variant="permanent" open={open}>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...(theme.mixins.toolbar as CSSObject),
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {upperNavs.map(({ label, to, icon }) => (
            <ListItemButton
              key={label}
              component={RouterLink}
              to={to}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {lowerNavs.map(({ label, to, icon }) => (
            <ListItemButton
              key={label}
              component={RouterLink}
              to={to}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
      </MyAppDrawer>
    </>
  );
}
