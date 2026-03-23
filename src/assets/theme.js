import { BorderAll, BorderColor } from "@mui/icons-material";
import { colors } from "@mui/material";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = "60px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc( 100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;

const theme = extendTheme({
  kanban: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
  },

  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: {
    //       main: "#86a9f4",
    //     },
    //   },
    // },
    // dark: {
    //   palette: {
    //     primary: {
    //       main: "#3e473e",
    //     },
    //   },
    // },
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
            // color: theme.palette.primary.main,
            fontSize: "0.875rem",
          };
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            // color: theme.palette.primary.main,
            fontSize: "0.875rem",
            ".MuiOutlinedInput-notchedOutline": {
              // borderColor: theme.palette.primary.main,
            },
            "&:hover": {
              ".MuiOutlinedInput-notchedOutline": {
                // borderColor: theme.palette.primary.main,
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
