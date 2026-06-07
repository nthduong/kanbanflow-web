import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Tooltip from "@mui/material/Tooltip";
import { useConfirm } from "material-ui-confirm";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import InventoryIcon from "@mui/icons-material/Inventory";

import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { updateCurrentActiveBoard, selectCurrentActiveBoard } from "~/redux/activeBoard/activeBoardSlice";

import { createNewCardAPI, deleteColumnDetailsAPI } from "~/apis";

import ListCards from "~/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards";

function Column({ column }) {
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column },
  });

  const { setNodeRef: setDroppableNodeRef, isOver: isOverColumn } = useDroppable({
    id: `column-drop-${column._id}`,
    data: {
      type: "COLUMN_DROP_ZONE",
      columnId: column._id,
    },
  });

  const dndkitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    height: "100%",
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const orderedCards = column.cards;

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

  const [newCardTitle, setNewCardTitle] = useState("");

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error("Please enter card title");
      return;
    }

    const newCardData = {
      title: newCardTitle,
      columnId: column._id,
    };

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

    setNewCardTitle("");
    toggleOpenNewCardForm();
  };
  const confirmDeleteColumn = useConfirm();
  const handleDeleteColumn = async () => {
    try {
      await confirmDeleteColumn({
        title: "Delete column?",
        description: "This action will permanently delete your Column and its Cards! Are you sure?",
        confirmationText: "Delete",
        confirmationButtonProps: { color: "error", variant: "outlined" },
      });

      const newBoard = { ...board };
      newBoard.columns = newBoard.columns.filter((c) => c._id !== column._id);
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter((id) => id !== column._id);

      dispatch(updateCurrentActiveBoard(newBoard));

      const deleteColumn = await deleteColumnDetailsAPI(column._id);
      if (deleteColumn?.deleteResult) {
        toast.success(deleteColumn?.deleteResult);
      }
    } catch (err) {
      () => {};
    }
  };
  return (
    <div ref={setNodeRef} style={dndkitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: (theme) => (theme.palette.mode === "light" ? "#87986a" : "#1c1c1c"),
          color: "#fff",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
          borderRadius: "10px",
          height: "fit-content",
          mr: 2,
          maxHeight: (theme) =>
            `calc(${theme.kanban.boardContentHeight} - ${theme.kanban.boardContentPadding} * 2 - 15px)`,
        }}
      >
        {/* Card Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            height: (theme) => theme.kanban.cardHeaderHeight,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "500",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {column?.title}
          </Typography>

          <KeyboardArrowDownIcon
            style={{
              color: "#fff",
              cursor: "pointer",
            }}
            id="basic-button-workspaces"
            aria-controls={open ? "basic-menu-workspaces" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          ></KeyboardArrowDownIcon>
          <Menu
            id="basic-menu-workspaces"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button-workspaces",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                toggleOpenNewCardForm();
              }}
            >
              <ListItemIcon>
                <AddCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem> */}
            {/* <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem> */}
            {/* <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem> */}
            <Divider />
            <MenuItem
              onClick={() => {
                handleClose();
                handleDeleteColumn();
              }}
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <InventoryIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem> */}
          </Menu>
        </Box>

        {/* Card Content */}
        <Box ref={setDroppableNodeRef}>
          <ListCards cards={orderedCards} />
        </Box>

        {/* Card Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            height: (theme) => theme.kanban.cardFooterHeight,
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm} sx={{ color: "#fff" }}>
                Add new card
              </Button>
              <Tooltip title="Drag to card">
                <DragHandleIcon
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Enter Card title..."
                type="text"
                size="small"
                variant="outlined"
                value={newCardTitle}
                data-no-dnd={true}
                onChange={(e) => setNewCardTitle(e.target.value)}
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
                  className="interceptor-loading"
                  onClick={addNewCard}
                  variant="contained"
                  color="success"
                  data-no-dnd={true}
                  sx={{
                    boxShadow: "none",
                    border: "0.5px solid",
                    borderColor: (theme) => theme.palette.success.main,
                    "&:hover": { bgcolor: (theme) => theme.palette.success.main },
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  data-no-dnd={true}
                  onClick={() => toggleOpenNewCardForm()}
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
      </Box>
    </div>
  );
}

export default Column;
