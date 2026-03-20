import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import WorkSpaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import Profile from "./Menus/Profile";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";

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
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AppsIcon sx={{ color: "primary.main" }} />
        <Typography
          variant="span"
          sx={{ fontSize: "14px", fontWeight: "500", color: "primary.main" }}
        >
          Kanban Flow
        </Typography>
        <WorkSpaces />
        <Recent />
        <Starred />
        <Templates />
        <Button variant="outlined">Create</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          id="standard-search"
          label="Search..."
          type="search"
          size="small"
          sx={{ color: "primary.main" }}
        />
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge
            color="secondary"
            variant="dot"
            sx={{ cursor: "pointer", color: "primary.main" }}
          >
            <NotificationsIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="help">
          <HelpIcon sx={{ cursor: "pointer", color: "primary.main" }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
}

export default AppBar;
