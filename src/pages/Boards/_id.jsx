import { useEffect } from "react";
import { cloneDeep } from "lodash";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";

import {
  updateBoardDetailsAPI,
  createNewCardAPI,
  updateColumnDetailsAPI,
  moveCardInTheDifferentColumnAPI,
  deleteColumnDetailsAPI,
} from "~/apis";

import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
// import { mockData } from "~/apis/mock-data";


function Board() {
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);

  useEffect(() => {
    const boardId = "69f6ca9d05498f694d2515d6";

    dispatch(fetchBoardDetailsAPI(boardId));
  }, [dispatch]);

  const createNewCard = async (newCardData) => {
    const createCard = await createNewCardAPI({ ...newCardData, boardId: board._id });

    const newBoard = cloneDeep(board);
    const columnToUpdate = newBoard.columns.find((column) => column._id === createCard.columnId);

    if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
      columnToUpdate.cards = [createCard];
      columnToUpdate.cardOrderIds = [createCard._id];
    } else {
      columnToUpdate.cards.push(createCard);
      columnToUpdate.cardOrderIds.push(createCard._id);
    }

    dispatch(updateCurrentActiveBoard(newBoard));
  };

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;

    dispatch(updateCurrentActiveBoard(newBoard));

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds });
  };

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardsIds, oldColumnId) => {
    const newBoard = cloneDeep(board);
    const columnToUpdate = newBoard.columns.find((column) => column._id === oldColumnId);
    columnToUpdate.cards = dndOrderedCards;
    columnToUpdate.cardOrderIds = dndOrderedCardsIds;

    dispatch(updateCurrentActiveBoard(newBoard));

    updateColumnDetailsAPI(oldColumnId, { cardOrderIds: dndOrderedCardsIds });
  };

  const moveCardInTheDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;

    dispatch(updateCurrentActiveBoard(newBoard));

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

  const deleteColumnDetails = async (columnId) => {
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.filter((column) => column._id !== columnId);
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter((id) => id !== columnId);

    dispatch(updateCurrentActiveBoard(newBoard));

    const deleteColumn = await deleteColumnDetailsAPI(columnId);
    if (deleteColumn?.deleteResult) {
      toast.success(deleteColumn?.deleteResult);
    }
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

        // createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        deleteColumnDetails={deleteColumnDetails}

        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardInTheDifferentColumn={moveCardInTheDifferentColumn}
      />
    </Container>
  );
}

export default Board;
