import React from "react";
import { Box, useTheme, IconButton, Select, MenuItem } from "@mui/material";
import { MenuOpen } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { SET_DIRECTION } from "../../../store/slices/customization/customization";
import { useTranslation } from "react-i18next";
const Header = ({handleDrawerToggle}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {i18n} = useTranslation()
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
        sx={{
          display : { md : 'none'}
        }}
        onClick={() => handleDrawerToggle()}
      >
        <MenuOpen />
      </IconButton>
      <Select
        value={i18n.language}
        onChange={(e) => {
          i18n.changeLanguage(e.target.value)
          const dir = e.target.value === 'en' ? 'ltr' : 'rtl'
          dispatch(SET_DIRECTION(dir))
          document.dir = dir
        }}
      >
        <MenuItem value={'ar'}>{i18n.language === 'en' ? "Ar" : "عربي"}</MenuItem>
        <MenuItem value={'en'}>En</MenuItem>
      </Select>
    </Box>
  );
};

export default Header;
