import React, { useContext, useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const AccountButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {logoutUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    handleClose();
    navigate("/login")
  }

  return (
    <Box>
      <IconButton edge="end" onClick={handleOpen} sx={{color:"text.primary"}}>
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default AccountButton;
