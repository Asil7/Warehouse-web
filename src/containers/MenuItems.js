import { Menu } from "antd";
import React from "react";
import UserService from "../services/UserService";

const buildMenuItems = () => {
  const menuItems = [];

  if (UserService.hasPermission("VIEW_COMPANY_LIST")) {
    menuItems.push({ label: "Company", key: "Company" });
  }

  if (UserService.hasPermission("VIEW_USER_LIST")) {
    menuItems.push({ label: "User", key: "User" });
  }

  if (UserService.hasPermission("VIEW_ROLE_LIST" && "VIEW_PERMISSION_LIST")) {
    menuItems.push({ label: "Security", key: "Security" });
  }

  return menuItems;
};

const MenuItems = ({ handleNavbarClick, selectedOption }) => {
  const menuItems = buildMenuItems();

  return (
    <Menu
      items={menuItems}
      mode="horizontal"
      style={{ flex: 1, minWidth: 0 }}
      onClick={handleNavbarClick}
      selectedKeys={[selectedOption]}
    />
  );
};

export default MenuItems;
