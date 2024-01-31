import React from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { menuitems } from "../../../menu_items";
import GroubItems from "../GroubItems/GroubItems";
import LogoSection from "../LogoSection/LogoSection";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SET_MENU_ITEM } from "../../../store/slices/customization/customization";
const DashboardSidebar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation()
  const customization = useSelector((state) => state.customization);
  return (
    <Sidebar
      collapsed={customization.opened}
      breakPoint="md"
      rootStyles={{
        borderRight: "none",
        height  :'100vh',
        position : 'sticky',
        top : '0',
        boxShadow: "1px 2px 12.600000381469727px 0px #0000001A",
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "white",
        },
      }}
    >
      {!customization.opened && <LogoSection />}

      <Menu
        menuItemStyles={{
          button: ({ active, level, isSubmenu, open }) => {
            return {
              backgroundColor: level === 1 && active ? "#0794EB1A" : "white",
              color:
                active | (isSubmenu && open)
                  ? theme.palette.primary.main
                  : "#232323CC",
              textTransform: "capitalize",
            };
          },
        }}
      >
        {menuitems.map((item, i) => {
          return item.type === "group" ? (
            <GroubItems key={i} item={item} />
          ) : (
            <MenuItem
              key={i}
              active={(item.id === customization.id && location.pathname === item.path) || location.pathname === item.path}
              onClick={() => {
                dispatch(SET_MENU_ITEM(item.id));
              }}
              icon={item.icon}
              component={<Link to={item.path} />}
            >
              {item.title}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default DashboardSidebar;
