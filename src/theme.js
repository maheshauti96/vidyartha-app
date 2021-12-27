import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// theme instance.
const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    }
  },
  overrides: {
    MuiButton: {
      contained: {
        minWidth: 'auto',
        lineHeight: 'normal',
        borderRadius: '0px',
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      }
    },
    MuiFilledInput: {
      root: {
        borderRadius: '0px !important',
      }
    },
    MuiAutocomplete: {
      paper: { borderRadius: '0px' },
    },
    MuiIconButton: {
      colorPrimary: {
        '&:hover': {
          backgroundColor: 'unset'
        }
      },
      root: {
        '&:hover': {
          backgroundColor: 'unset'
        }
      }
    },
    MuiPopover: {
      paper: {
        borderRadius: '0px',
        boxShadow: 'none',
        border: '0.5px solid rgba(0, 0, 0, 0.12)',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '0px',
        boxShadow: 'none',
        border: '0.5px solid rgba(0, 0, 0, 0.12)',
      }
    },
  },
  palette: {
    primary: {
      main: '#3355AD',
    },
    secondary: {
      main: '#3355AD',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FBFBFD',
    },
  },
});

export default theme;
