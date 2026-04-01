import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Tooltip from "@mui/material/Tooltip";
import ListCards from "./ListCards/ListCards";
import { mapOrder } from "~/utils/sort";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Column({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column._id,
      data: { ...column },
    });

  const dndkitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
  return (
    <Box
      ref={setNodeRef}
      style={dndkitColumnStyle}
      {...attributes}
      {...listeners}
      sx={{
        minWidth: "300px",
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#AEB784" : "#1c1c1c",
        color: "#fff",
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AddCardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add new card</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Remove this column</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <InventoryIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Archive this column</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {/* Card Content */}
      <ListCards cards={orderedCards} />

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
        <Button startIcon={<AddCardIcon />} sx={{ color: "#fff" }}>
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
    </Box>
  );
}

export default Column;
