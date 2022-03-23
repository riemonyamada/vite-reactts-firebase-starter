import { css } from '@emotion/react';
import { Button, Typography } from '@mui/material';

// use div instead of box: https://github.com/mui/material-ui/issues/31835
export function ErrorFallback() {
  return (
    <div
      css={css({
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <div
        css={css({
          textAlign: 'center',
        })}
      >
        <Typography variant="h3">Ooops, something went wrong :(</Typography>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          size="large"
          onClick={() => window.location.assign(window.location.origin)}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}
