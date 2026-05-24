import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

function PageLoadingSpinner({ caption }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  );
}

export default PageLoadingSpinner;
