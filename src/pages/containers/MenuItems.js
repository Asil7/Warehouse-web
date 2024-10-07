import { Menu } from "antd";
import React from "react";

const buildMenuItems = () => {
  return [
    { label: "Merchants", key: "Merchants" },
    { label: "Services", key: "Services" },
    { label: "Connects", key: "Connects" },
    { label: "Providers", key: "Providers" },
    { label: "Security", key: "Security" },
    { label: "Users", key: "Users" },
    { label: "Reports", key: "Reports" },
    { label: "Receipts", key: "Receipts" },
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
