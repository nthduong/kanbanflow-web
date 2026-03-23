import Box from "@mui/material/Box";

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#e9f5db" : "#393E46",
        height: (theme) =>
          `calc( 100vh - ${theme.kanban.appBarHeight} - ${theme.kanban.boardBarHeight})`,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      content
    </Box>
  );
}

export default BoardContent;
