import React from "react";
import { Box, styled } from "@mui/material";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import Header from "./Header/Header";
import { Outlet } from "react-router";


const Main = styled("main")(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.palette.background.default,
    maxWidth : 'calc(100% - 20px)',
    transition: theme.transitions.create(
      "margin",
      open
        ? {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }
        : {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }
    ),
  })
);

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <DashboardSidebar />
      <Main
      >
        <Header />
        <Box sx={{ px: 2, pl: 5, pr: 2, py: 4 }}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};

export default MainLayout;
