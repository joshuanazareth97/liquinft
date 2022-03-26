import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: "#85FFC7" },
    secondary: { main: "#26547C" },
    warning: { main: "#902D41" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          display: "flex",
          fontWeight: "bold",
          justifyContent: "center",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "1.5rem",
          justifyContent: "center",
        },
      },
    },
  },
});
