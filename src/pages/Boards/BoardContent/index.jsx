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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";

const CARD_HEADER_HEIGHT = "60px";
const CARD_FOOTER_HEIGHT = "60px";
const BOARD_CONTENT_PADDING = "16px";

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
        padding: BOARD_CONTENT_PADDING,
        overflowX: "auto",
        overflowY: "hidden",
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
          height: "fit-content",
          mr: 2,
          maxHeight: (theme) =>
            `calc(${theme.kanban.boardContentHeight} - ${BOARD_CONTENT_PADDING} * 2)`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            height: CARD_HEADER_HEIGHT,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "500",
              cursor: "pointer",
              fontSize: "1.2rem",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "5px",
            margin: "0 5px",
            overflowY: "auto",
            maxHeight: (theme) =>
              `calc(${theme.kanban.boardContentHeight} - ${CARD_HEADER_HEIGHT} - ${CARD_FOOTER_HEIGHT} - ${BOARD_CONTENT_PADDING} * 2)`,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#656d4a" : "#999",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#434734" : "#888",
            },
          }}
        >
          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="https://images.pexels.com/photos/163872/italy-cala-gonone-air-sky-163872.jpeg"
              title="green iguana"
            />
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
            <CardActions
              sx={{
                padding: "0px 4px 8px 4px",
              }}
            >
              <Button size="small" startIcon={<GroupIcon />}>
                20
              </Button>
              <Button size="small" startIcon={<CommentIcon />}>
                15
              </Button>
              <Button size="small" startIcon={<AttachmentIcon />}>
                10
              </Button>
            </CardActions>
          </Card>

          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            height: CARD_FOOTER_HEIGHT,
          }}
        >
          <Button startIcon={<AddCardIcon />}>Add new card</Button>
          <Tooltip title="Drag to card">
            <DragHandleIcon
              sx={{
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Box>
      </Box>
      {/* card column 2*/}
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
          height: "fit-content",
          mr: 2,
          maxHeight: (theme) =>
            `calc(${theme.kanban.boardContentHeight} - ${BOARD_CONTENT_PADDING} * 2)`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            height: CARD_HEADER_HEIGHT,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "500",
              cursor: "pointer",
              fontSize: "1.2rem",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "5px",
            margin: "0 5px",
            overflowY: "auto",
            maxHeight: (theme) =>
              `calc(${theme.kanban.boardContentHeight} - ${CARD_HEADER_HEIGHT} - ${CARD_FOOTER_HEIGHT} - ${BOARD_CONTENT_PADDING} * 2)`,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#656d4a" : "#999",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#434734" : "#888",
            },
          }}
        >
          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="https://images.pexels.com/photos/163872/italy-cala-gonone-air-sky-163872.jpeg"
              title="green iguana"
            />
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
            <CardActions
              sx={{
                padding: "0px 4px 8px 4px",
              }}
            >
              <Button size="small" startIcon={<GroupIcon />}>
                20
              </Button>
              <Button size="small" startIcon={<CommentIcon />}>
                15
              </Button>
              <Button size="small" startIcon={<AttachmentIcon />}>
                10
              </Button>
            </CardActions>
          </Card>

          <Card
            sx={{
              borderRadius: "8px",
              flexShrink: "0",
            }}
          >
            <CardContent
              sx={{
                padding: 1.5,
                "&:last-child": {
                  padding: 1.5,
                },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            height: CARD_FOOTER_HEIGHT,
          }}
        >
          <Button startIcon={<AddCardIcon />}>Add new card</Button>
          <Tooltip title="Drag to card">
            <DragHandleIcon
              sx={{
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default BoardContent;
