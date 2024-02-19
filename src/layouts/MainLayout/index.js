import React, { useEffect } from "react";
import { AppBar, Box, IconButton, Menu, Toolbar, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router";
import { drawerWidth } from "../../constant";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { direction} = useSelector((state) => state.customization);
  const theme = useTheme()

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: direction === 'ltr' ? { md: `${drawerWidth}px` } : 0,
          mr : direction === 'ltr' ? 0 : { md: `${drawerWidth}px` },
        }}
        color="inherit"
        variant="elevation"
      >
        <Toolbar >
          <Header handleDrawerToggle={handleDrawerToggle} />
        </Toolbar>
      </AppBar>
      <DashboardSidebar handleDrawerTransitionEnd={handleDrawerTransitionEnd} handleDrawerClose={handleDrawerClose} mobileOpen={mobileOpen} />
      <Box
        component="main"
        sx={{ flexGrow: 1, py: 6 , px : 3, maxWidth : "100%", width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
          <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
