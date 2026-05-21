import Box from "@mui/material/Box";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Card from "./Card/Card";

function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map((c) => c._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "0px 5px",
          margin: "0 5px",
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: (theme) =>
            `calc(${theme.kanban.boardContentHeight} - ${theme.kanban.cardHeaderHeight} - ${theme.kanban.cardFooterHeight} - ${theme.kanban.boardContentPadding} * 2 - 15px)`,
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: (theme) => (theme.palette.mode === "light" ? "#656d4a" : "#999"),
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: (theme) => (theme.palette.mode === "light" ? "#434734" : "#888"),
          },
        }}
      >
        {cards?.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  );
}

export default ListCards;
