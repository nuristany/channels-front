import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  custom: {
    primaryAppBar: {
      height: 50,
    },
    primaryDraw: {
      width: 240,
      closed: 50,
    },
    secondaryDraw: {
      width: 240, // Adjust this width as needed
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: 50, 
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240, // Matches custom.primaryDraw.width
        },
      },
    },
  },
});

export default theme;
