import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock-data";
import { fetchBoarDetailsAPI } from "~/apis";
import { useEffect, useState } from "react";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "69f6ca9d05498f694d2515d6";

    fetchBoarDetailsAPI(boardId).then((board) => {
      setBoard(board);
    });
  }, []);
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  );
}

export default Board;
