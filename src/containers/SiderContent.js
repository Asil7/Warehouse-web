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
    Security: [
      { key: "roles", label: "Roles" },
      { key: "permissions", label: "Permissions" },
    ],
    Users: [{ key: "users", label: "User List" }],
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
