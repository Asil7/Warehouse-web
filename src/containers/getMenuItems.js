// MenuItems.js
import { UserOutlined } from "@ant-design/icons";
import UserService from "../services/UserService";

export const getMenuItems = () => {
  return [
    UserService.hasPermission("VIEW_ORDER_LIST") && {
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
    UserService.hasPermission("VIEW_WAREHOUSE_PRODUCT_LIST") && {
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
    UserService.hasPermission("VIEW_EXPENSE_LIST") && {
      key: "expense",
      icon: <i className="bi bi-graph-down-arrow"></i>,
      label: "Expense",
    },
    UserService.hasPermission("VIEW_COMPANY_LIST") && {
      key: "companies",
      icon: <i className="bi bi-building-fill"></i>,
      label: "Company",
    },
    UserService.hasPermission("VIEW_USER_LIST") && {
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
    UserService.hasPermission("VIEW_ROLE_LIST") && {
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
