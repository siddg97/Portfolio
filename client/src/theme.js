import React from "react";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#FCA311",
    },
    secondary: {
      main: "#64ffda",
    },
    background: {
      default: "#14213D",
      paper: "#1E325C",
      input: "#0A111F",
    },
    custom: {
      location: "#d50000",
      date: "#06d6a0",
      entity: "#09a6f3",
      facebook: "#3b5998",
      linkedin: "#0e76a8",
      instagram: "#3f729b",
      github: "#333",
      tag: "#9d0208",
    },
  },
});

theme = responsiveFontSizes(theme);

const Themer = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Themer;
