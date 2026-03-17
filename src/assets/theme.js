import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#5289ff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#fff",
        },
      },
    },
  },
  // ...other properties
});

export default theme;
