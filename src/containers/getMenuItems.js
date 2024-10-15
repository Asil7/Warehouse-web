// MenuItems.js
import { UserOutlined } from "@ant-design/icons";

export const getMenuItems = () => {
  return [
    {
      key: "span",
      icon: <i className="bi bi-graph-down-arrow"></i>,
      label: "Span",
    },
    {
      key: "products",
      icon: <i className="bi bi-basket2"></i>,
      label: "Product",
    },
    {
      key: "companies",
      icon: <i className="bi bi-building-fill"></i>,
      label: "Company",
    },
    {
      key: "user",
      icon: <UserOutlined />,
      label: "User",
      children: [
        {
          key: "users",
          label: "Users",
        },
      ],
    },
    {
      key: "security",
      icon: <i className="bi bi-shield-lock"></i>,
      label: "Security",
      children: [
        {
          key: "roles",
          label: "Roles",
        },
        {
          key: "permissions",
          label: "Permissions",
        },
      ],
    },
  ];
};
