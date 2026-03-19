import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  kanban: {
    appBarHeight: "60px",
    boardBarHeight: "70px",
  },

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
          main: "#151715",
        },
      },
    },
  },
  // ...other properties
});

export default theme;
