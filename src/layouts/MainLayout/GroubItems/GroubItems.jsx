import React from "react";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_MENU_ITEM } from "../../../store/slices/customization/customization";
const GroubItems = ({ item }) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const customization = useSelector((state) => state.customization);
  return (
    <SubMenu label={item.title} icon={item.icon}>
      {item.children.map((item, i) => {
        return (
          <MenuItem
            active={(item.id === customization.id && location.pathname === item.path) || location.pathname === item.path}
            onClick={() => {
              dispatch(SET_MENU_ITEM(item.id));
            }}
            key={i}
            component={<Link to={item.path} />}
            icon={item.icon}
          >
            {item.title}
          </MenuItem>
        );
      })}
    </SubMenu>
  );
};

export default GroubItems;
