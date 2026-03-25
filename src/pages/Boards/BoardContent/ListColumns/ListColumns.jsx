import Box from "@mui/material/Box";
import Column from "./Column/Column";

function ListColumns() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        paddingTop: "16px",
        paddingLeft: "16px",
      }}
    >
      <Column />
    </Box>
  );
}

export default ListColumns;
