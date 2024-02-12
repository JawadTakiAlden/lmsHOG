import React from "react";
import { Box, styled } from "@mui/material";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import Header from "./Header/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        maxWidth : '100%'
      }}
    >
      <DashboardSidebar />
      <Box
        sx={{
          width : '100%'
        }}
      >
        <Header />
        <Box sx={{ px: 2, pl: 5, pr: 2, py: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
