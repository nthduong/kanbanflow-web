import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useTheme, useMediaQuery } from "@mui/material";
import { capitalizeFirstLetter } from "~/utils/formatters";
import BoardUserGroup from "~/pages/Boards/BoardBar/BoardUserGroup";

const MENU_STYLE = {
  color: "#fff",
  backgroundColor: "transparent",
  paddingX: "5px",
  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
  "&:hover": {
    backgroundColor: "",
  },
  cursor: "initial",
};

function BoardBar({ board }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === "light" ? "#87986a" : "#242424"),
        height: (theme) => theme.kanban.boardBarHeight,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px 0 5px",
        borderBottom: "2px solid",
        borderColor: (theme) => (theme.palette.mode === "light" ? "#87986a" : "#242424"),
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Chip clickable icon={<DashboardIcon />} label={board?.title} sx={MENU_STYLE} />
        <Chip
          clickable
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          sx={{ ...MENU_STYLE, display: { xs: "none", md: "flex" } }}
        />
        {/* <Chip
          clickable
          icon={<AddToDriveIcon />}
          label="Add To Google Driver"
          sx={{ ...MENU_STYLE, display: { xs: "none", md: "flex" } }}
        />
        <Chip
          clickable
          icon={<BoltIcon />}
          label="Automation"
          sx={{ ...MENU_STYLE, display: { xs: "none", md: "flex" } }}
        />
        <Chip
          clickable
          icon={<FilterAltIcon />}
          label="Filter"
          sx={{ ...MENU_STYLE, display: { xs: "none", md: "flex" } }}
        /> */}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          sx={{
            color: "#fff",
            borderColor: "#fff",
            "&:hover": { borderColor: "#fff" },
          }}
          variant="outlined"
          startIcon={<PersonAddIcon />}
        >
          Invite
        </Button>
        <BoardUserGroup />
      </Box>
    </Box>
  );
}

export default BoardBar;
