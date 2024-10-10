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
      { key: "permission-list", label: "Permissions" },
    ],
    Users: [{ key: "users", label: "User List" }],
    Organization: [{ key: "organization", label: "Organization" }],
  };

  const createMenuItems = (items) =>
    items.map((item) => ({
      label: (
        <Link
          to={item.key}
          onClick={() => handleItemClick(item.key)}
          className="textDecoration"
        >
          {item.label}
        </Link>
      ),
      key: item.key,
    }));

  const contentItems = createMenuItems(subMenus[selectedOption] || []);

  return (
    <div>
      <Typography.Title className="ms-3 mt-3" level={4}>
        {selectedOption}
      </Typography.Title>
      <Menu
        mode="vertical"
        selectedKeys={[selectedItem]}
        items={contentItems}
        className="ms-3"
        style={{ borderLeft: "solid gray 1px" }}
      />
    </div>
  );
};

export default SiderContent;
