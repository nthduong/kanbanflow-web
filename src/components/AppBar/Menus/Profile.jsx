import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useConfirm } from "material-ui-confirm";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { logoutUserAPI, selectCurrentUser } from "~/redux/user/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const confirmLogout = useConfirm();
  const handleLogout = async () => {
    await confirmLogout({
      title: "Logout of your account?",
      confirmationText: "Logout",
      confirmationButtonProps: { color: "error", variant: "outlined" },
    });

    dispatch(logoutUserAPI());
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: "0" }}
          aria-controls={open ? "basic-button-profile" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 30, height: 30, fontSize: "14px" }} src={currentUser?.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-recent"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-profile",
        }}
      >
        <Link to={"/settings/account"} style={{ color: "inherit" }}>
          <MenuItem onClick={handleClose}>
            <Avatar sx={{ width: 30, height: 30, marginRight: "8px" }} src={currentUser?.avatar} /> Profile
          </MenuItem>
        </Link>
        {/* <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 30, height: 30, marginRight: "8px" }} /> My account
        </MenuItem> */}
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default Profile;
