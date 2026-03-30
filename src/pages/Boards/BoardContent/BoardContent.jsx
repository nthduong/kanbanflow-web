import ListColumns from "./ListColumns/ListColumns";
import Box from "@mui/material/Box";

function BoardContent({ board }) {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#e9f5db" : "#242424",
        height: (theme) => theme.kanban.boardContentHeight,
        width: "100%",
        display: "flex",
      }}
    >
      <ListColumns columns={board.columns} />
    </Box>
  );
}

export default BoardContent;
