import { useEffect } from "react";
import { cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Container from "@mui/material/Container";

import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";

import { updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardInTheDifferentColumnAPI } from "~/apis";

import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";

// import { mockData } from "~/apis/mock-data";

function Board() {
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);
  const { boardId } = useParams();

  useEffect(() => {
    // const boardId = "69f6ca9d05498f694d2515d6";

    dispatch(fetchBoardDetailsAPI(boardId));
  }, [dispatch, boardId]);

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

  if (!board) {
    return <PageLoadingSpinner caption="Loading Board..." />;
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardInTheDifferentColumn={moveCardInTheDifferentColumn}
      />
    </Container>
  );
}

export default Board;
