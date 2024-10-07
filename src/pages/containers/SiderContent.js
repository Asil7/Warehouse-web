import React, { useEffect, useState } from "react";
import { Menu, Typography } from "antd";
import { Link } from "react-router-dom";

const SiderContent = ({ selectedOption }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const savedItem = localStorage.getItem("SelectedSubMenu");
    if (savedItem) {
      setSelectedItem(savedItem);
    }
  }, []);

  const handleItemClick = (key) => {
    localStorage.setItem("SelectedSubMenu", key);
    setSelectedItem(key);
  };

  const subMenus = {
    Merchants: [{ key: "merchant-list", label: "Merchant List" }],
    Services: [
      { key: "service-list", label: "Service List" },
      { key: "category-list", label: "Category List" },
    ],
    Connects: [{ key: "connect-list", label: "Connect List" }],
    Providers: [{ key: "provider-list", label: "Provider List" }],
    Security: [{ key: "roles", label: "Roles" }],
    Users: [{ key: "users", label: <Link to="/user-list">User List</Link> }],
  };

  const createMenuItems = (items) =>
    items.map((item) => ({
      label: (
        <Link to={item.key} onClick={() => handleItemClick(item.key)}>
          {item.label}
        </Link>
      ),
      key: item.key,
    }));

  const contentItems = createMenuItems(subMenus[selectedOption] || []);

  return (
    <div>
      <Typography.Title level={5}>{selectedOption}</Typography.Title>
      <Menu
        mode="vertical"
        selectedKeys={[selectedItem]}
        items={contentItems}
        style={{ borderRight: 0 }}
      />
    </div>
  );
};

export default SiderContent;
