import React from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { MenuOpen } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { TOGGLE_COLAPSED } from "../../../store/slices/customization/customization";
const Header = ({withoutSidebar}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        pl: 5,
        pr: 2,
        backgroundColor: theme.palette.common.white,
      }}
    >
      <IconButton
        onClick={() => {
          dispatch(TOGGLE_COLAPSED());
        }}
      >
        <MenuOpen />
      </IconButton>
    </Box>
  );
};

export default Header;
