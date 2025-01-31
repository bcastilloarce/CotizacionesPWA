import { createTheme } from '@mui/material/styles';
import { Constants } from './utils/constants';

const theme = createTheme({
  palette: {
    primary: {
      main: Constants.App.Colors.primary,
    },
    secondary: {
      main: Constants.App.Colors.secondary,
    },
    background: {
      default: Constants.App.Colors.background,
    },
    text: {
      primary: Constants.App.Colors.text,
    },
  },
  shape: {
    borderRadius: Constants.App.UI.cornerRadius,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: Constants.App.UI.buttonHeight,
        },
      },
    },
  },
});

export default theme;
