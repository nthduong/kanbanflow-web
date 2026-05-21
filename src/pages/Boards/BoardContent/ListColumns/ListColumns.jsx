import Box from "@mui/material/Box";
import Column from "./Column/Column";
import { Button } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { createNewColumnAPI } from "~/apis";
import { updateCurrentActiveBoard, selectCurrentActiveBoard } from "~/redux/activeBoard/activeBoardSlice";
import { useDispatch, useSelector } from "react-redux";
import { generatePlaceholderCard } from "~/utils/formatters";
import { cloneDeep } from "lodash";

function ListColumns({ columns, createNewCard, deleteColumnDetails }) {
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm);

  const [newColumnTitle, setNewColumnTitle] = useState("");

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error("Please enter column title");
      return;
    }

    const newColumnData = {
      title: newColumnTitle,
    };

    const createColumn = await createNewColumnAPI({ ...newColumnData, boardId: board._id });

    createColumn.cards = [generatePlaceholderCard(createColumn)];
    createColumn.cardOrderIds = [generatePlaceholderCard(createColumn).id];

    const newBoard = cloneDeep(board);
    newBoard.columns.push(createColumn);
    newBoard.columnOrderIds.push(createColumn._id);
    dispatch(updateCurrentActiveBoard(newBoard));

    setNewColumnTitle("");
    toggleOpenNewColumnForm();
  };
  return (
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
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
        {columns?.map((column) => (
          <Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumnDetails={deleteColumnDetails}
          />
        ))}
        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              height: "fit-content",
              borderRadius: "10px",
              backgroundColor: "#646a5f5e",
              marginRight: 2,
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
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              borderRadius: "10px",
              bgcolor: "#646a5f5e",
              p: 1.5,
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              marginRight: 2,
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              autoFocus
              sx={{
                "& label": { color: "#fff" },
                "& label.Mui-focused": { color: "#fff" },
                "& input": { color: "#fff" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="success"
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                  "&:hover": { bgcolor: (theme) => theme.palette.success.main },
                }}
              >
                Add new column
              </Button>
              <CloseIcon
                onClick={() => toggleOpenNewColumnForm()}
                sx={{
                  color: "#fff",
                  cursor: "pointer",
                }}
                fontSize={"small"}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}

export default ListColumns;
