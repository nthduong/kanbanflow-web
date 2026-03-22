import { BorderAll, BorderColor } from "@mui/icons-material";
import { colors } from "@mui/material";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  kanban: {
    appBarHeight: "60px",
    boardBarHeight: "60px",
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

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: "0.875rem",
          };
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: "0.875rem",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            "&:hover": {
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
                borderWidth: "2px",
              },
            },
          };
        },
      },
    },
  },
});

export default theme;
