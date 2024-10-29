// MenuItems.js
import { UserOutlined } from "@ant-design/icons";

export const getMenuItems = () => {
  return [
    {
      key: "orders",
      icon: <i className="bi bi-cart4"></i>,
      label: "Order",
      children: [
        {
          key: "order-list",
          label: "Order List",
        },
        {
          key: "orders",
          label: "Orders",
        },
      ],
    },
    {
      key: "warehouse",
      icon: <i className="bi bi-house-door-fill"></i>,
      label: "Warehouse",
      children: [
        {
          key: "warehouse-products",
          label: "Warehouse products",
        },
        {
          key: "received-products",
          label: "Received Products",
        },
        {
          key: "store",
          label: "Store",
        },
        {
          key: "products",
          label: "Products",
        },
      ],
    },
    {
      key: "expense",
      icon: <i className="bi bi-graph-down-arrow"></i>,
      label: "Expense",
    },
    {
      key: "companies",
      icon: <i className="bi bi-building-fill"></i>,
      label: "Company",
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "User",
      // children: [
      //   {
      //     key: "users",
      //     label: "Users",
      //   },
      // ],
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
