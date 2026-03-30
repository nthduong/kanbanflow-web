import Box from "@mui/material/Box";
import Card from "./Card/Card";

function ListCards({ cards }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "5px",
        margin: "0 5px",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(${theme.kanban.boardContentHeight} - ${theme.kanban.cardHeaderHeight} - ${theme.kanban.cardFooterHeight} - ${theme.kanban.boardContentPadding} * 2 - 15px)`,
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#656d4a" : "#999",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#434734" : "#888",
        },
      }}
    >
      {cards?.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </Box>
  );
}

export default ListCards;
