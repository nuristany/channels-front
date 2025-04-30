import React, { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AccountButton from "../components/primaryAppBar/AccountButton";

const PrimaryAppBar = () => {
  const theme = useTheme();
  const [sideMenu, setSideMenu] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = useCallback(() => {
    setSideMenu((prev) => !prev);
  }, []);

  return (
    <AppBar
      sx={{
        zIndex: theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
       
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.custom.primaryAppBar.height,
          minHeight: theme.custom.primaryAppBar.height,
        }}
      >
        {isSmallScreen && (
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              color="black"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer}></Drawer>
        <Link to="/" style={{ textDecoration: "none", listStyle: "none" }}>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            ChatApp
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }}></Box>
        <AccountButton />
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
