import Box from "@mui/material/Box";
import Column from "./Column/Column";
import { Button } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";

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

      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "200px",
          height: "fit-content",
          borderRadius: "10px",
          backgroundColor: "#646a5f5e",
        }}
      >
        <Button
          startIcon={<PostAddIcon />}
          sx={{
            color: "#fff",
            width: "100%",
            justifyContent: "start",
            pl: "12px",
            py: "8px",
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  );
}

export default ListColumns;
