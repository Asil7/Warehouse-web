import { Menu } from "antd";
import React from "react";
// import UserService from "../services/UserService";

const buildMenuItems = () => {
  return [
    { label: "Users", key: "Users" },
    { label: "Security", key: "Security" },
  ];
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
