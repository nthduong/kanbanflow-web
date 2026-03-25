import { useState } from "react";
import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
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
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function AppBar() {
  const [inputSearch, setInputSearch] = useState("");

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
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#718355" : "#1c1c1c",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AppsIcon sx={{ color: "#fff" }} />
        <Typography
          variant="span"
          sx={{ fontSize: "14px", fontWeight: "500", color: "#fff" }}
        >
          Kanban Flow
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />
        </Box>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            color: "#fff",
            borderColor: "#fff",
            "&:hover": {
              borderColor: "#fff",
            },
          }}
        >
          Create
        </Button>
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
          type="text"
          size="small"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#fff" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                onClick={() => setInputSearch("")}
                sx={{
                  color: inputSearch ? "#fff" : "transparent",
                  cursor: inputSearch ? "pointer" : "text",
                }}
                fontSize={"small"}
              />
            ),
          }}
          sx={{
            display: { xs: "none", md: "flex" },
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
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge
            color="warning"
            variant="dot"
            sx={{ cursor: "pointer", color: "#fff" }}
          >
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
