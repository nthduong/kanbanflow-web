import { BorderAll, BorderColor } from "@mui/icons-material";
import { colors } from "@mui/material";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = "60px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc( 100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const CARD_HEADER_HEIGHT = "60px";
const CARD_FOOTER_HEIGHT = "60px";
const BOARD_CONTENT_PADDING = "16px";

const theme = extendTheme({
  kanban: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    cardHeaderHeight: CARD_HEADER_HEIGHT,
    cardFooterHeight: CARD_FOOTER_HEIGHT,
    boardContentPadding: BOARD_CONTENT_PADDING,
  },

  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#718355",
        },
        text: {
          primary: "#000",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#fff",
        },
        text: {
          primary: "#fff",
        },
      },
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
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
    MuiFormControl: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down("sm")]: {
            "& .MuiInputBase-input": {
              fontSize: "16px",
            },
            "& .MuiFormLabel-root": {
              fontSize: "16px",
            },
          },
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": { fontSize: "0.875rem" },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "10px",
        },
        list: {
          borderRadius: "10px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            // color: theme.palette.primary.main,
            borderRadius: "10px",

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
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
