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
          main: "#86a9f4",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#3e473e",
        },
      },
    },
  },
});

export default theme;
