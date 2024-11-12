// MenuItems.js
import { UserOutlined } from "@ant-design/icons";
import UserService from "../services/UserService";

export const getMenuItems = () => {
  return [
    {
      key: "order",
      icon: <i className="bi bi-cart4"></i>,
      label: "Order",
      children: [
        UserService.hasPermission("VIEW_ORDER_LIST") && {
          key: "order-list",
          label: "Order List",
        },
        UserService.hasPermission("VIEW_ORDER_LIST_BY_USER") && {
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
        UserService.hasPermission("VIEW_WAREHOUSE_PRODUCT_LIST") && {
          key: "warehouse-products",
          label: "Warehouse products",
        },
        UserService.hasPermission("VIEW_RECEIVED_PRODUCT_LIST") && {
          key: "received-products",
          label: "Received Products",
        },
        UserService.hasPermission("VIEW_STORE_PRODUCT_LIST") && {
          key: "store-history",
          label: "Store History",
        },
        UserService.hasPermission("VIEW_PRODUCT_LIST") && {
          key: "products",
          label: "Products",
        },
      ],
    },
    UserService.hasPermission("VIEW_STORE_PRODUCT_LIST") && {
      key: "store",
      icon: <i className="bi bi-shop"></i>,
      label: "Store",
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
        UserService.hasPermission("VIEW_ROLE_LIST") && {
          key: "roles",
          label: "Roles",
        },
        UserService.hasPermission("VIEW_PERMISSION_LIST") && {
          key: "permissions",
          label: "Permissions",
        },
      ],
    },
  ];
};
