import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock-data";
import { fetchBoarDetailsAPI } from "~/apis";
import { useEffect, useState } from "react";
import { createNewColumnAPI } from "~/apis";
import { createNewCardAPI } from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "69f6ca9d05498f694d2515d6";

    fetchBoarDetailsAPI(boardId).then((board) => {
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column).id];
        }
      });

      setBoard(board);
    });
  }, []);

  const createNewColumn = async (newColumnData) => {
    const createColumn = await createNewColumnAPI({ ...newColumnData, boardId: board._id });

    createColumn.cards = [generatePlaceholderCard(createColumn)];
    createColumn.cardOrderIds = [generatePlaceholderCard(createColumn).id];

    const newBoard = { ...board };
    newBoard.columns.push(createColumn);
    newBoard.columnOrderIds.push(createColumn._id);
    setBoard(newBoard);
  };

  const createNewCard = async (newCardData) => {
    const createCard = await createNewCardAPI({ ...newCardData, boardId: board._id });

    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find((column) => column._id === createCard.columnId);
    columnToUpdate.cards.push(createCard);
    columnToUpdate.cardOrderIds.push(createCard._id);
    setBoard(newBoard);
  };
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />
    </Container>
  );
}

export default Board;
