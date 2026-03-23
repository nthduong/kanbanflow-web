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

const CARD_HEADER_HEIGHT = "60px";
const CARD_FOOTER_HEIGHT = "60px";

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#e9f5db" : "#242424",
        height: (theme) => theme.kanban.boardContentHeight,
        width: "100%",
        display: "flex",
        padding: 2,
      }}
    >
      {/* card column */}
      <Box
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#AEB784" : "#1c1c1c",
          color: "#fff",
          borderRadius: "10px",
          mr: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            height: CARD_HEADER_HEIGHT,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "500",
              cursor: "pointer",
            }}
          >
            Title Column
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
        <Box sx={{}}>List card</Box>
        <Box sx={{}}>Footer</Box>
      </Box>
    </Box>
  );
}

export default BoardContent;
