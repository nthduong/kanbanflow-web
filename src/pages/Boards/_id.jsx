import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock-data";
import {
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI,
  createNewCardAPI,
  updateColumnDetailsAPI,
  moveCardInTheDifferentColumnAPI,
} from "~/apis";
import { useEffect, useState } from "react";
import { createNewColumnAPI } from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";
import { mapOrder } from "~/utils/sort";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "69f6ca9d05498f694d2515d6";

    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column).id];
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
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

    if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
      columnToUpdate.cards = [createCard];
      columnToUpdate.cardOrderIds = [createCard._id];
    } else {
      columnToUpdate.cards.push(createCard);
      columnToUpdate.cardOrderIds.push(createCard._id);
    }

    setBoard(newBoard);
  };

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds });
  };

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardsIds, oldColumnId) => {
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find((column) => column._id === oldColumnId);
    columnToUpdate.cards = dndOrderedCards;
    columnToUpdate.cardOrderIds = dndOrderedCardsIds;
    setBoard(newBoard);

    updateColumnDetailsAPI(oldColumnId, { cardOrderIds: dndOrderedCardsIds });
  };

  const moveCardInTheDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    let prevCardOrderIds = dndOrderedColumns.find((column) => column._id === prevColumnId)?.cardOrderIds;

    if (prevCardOrderIds[0].includes("placeholder-card")) {
      prevCardOrderIds = [];
    }

    moveCardInTheDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((column) => column._id === nextColumnId)?.cardOrderIds,
    });
  };

  if (!board) {
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
        loading...
      </Box>
    );
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardInTheDifferentColumn={moveCardInTheDifferentColumn}
      />
    </Container>
  );
}

export default Board;
