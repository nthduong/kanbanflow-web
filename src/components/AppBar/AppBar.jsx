import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import AppsIcon from "@mui/icons-material/Apps";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";

import AutoCompleteSearchBoard from "~/components/AppBar/SearchBoards/AutoCompleteSearchBoard";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import Profile from "~/components/AppBar/Menus/Profile";
import WorkSpaces from "~/components/AppBar/Menus/Workspaces";
import Recent from "~/components/AppBar/Menus/Recent";
import Starred from "~/components/AppBar/Menus/Starred";
import Templates from "~/components/AppBar/Menus/Templates";

function AppBar() {
  return (
    <Box
      sx={{
        height: (theme) => theme.kanban.appBarHeight,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
        gap: 2,
        backgroundColor: (theme) => (theme.palette.mode === "light" ? "#718355" : "#1c1c1c"),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Link to="/boards">
          <AppsIcon sx={{ color: "#fff", verticalAlign: "middle" }} />
        </Link>
        <Link to="/boards">
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ViewKanbanIcon sx={{ color: "#fff" }} />
            <Typography variant="span" sx={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>
              Kanban Flow
            </Typography>
          </Box>
        </Link>

        {/* <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />
        </Box> */}
        {/* <Button
          variant="outlined"
          startIcon={<LibraryAddIcon />}
          sx={{
            color: "#fff",
            borderColor: "transparent",
            "&:hover": {
              borderColor: "transparent",
            },
          }}
        >
          Create
        </Button> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AutoCompleteSearchBoard />
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: "pointer", color: "#fff" }}>
            <NotificationsIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="help">
          <HelpIcon sx={{ cursor: "pointer", color: "#fff" }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
}

export default AppBar;
