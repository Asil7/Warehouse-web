// import React, { useState } from "react";
// import { Layout } from "antd";
// import MenuItems from "./MenuItems";
// import SiderContent from "./SiderContent";
// import { Outlet } from "react-router-dom";

// const { Header, Sider, Content } = Layout;

// const TheLayout = () => {
//   const [selectedOption, setSelectedOption] = useState(() => {
//     return localStorage.getItem("SelectedMenu") || "Users";
//   });

//   const handleNavbarClick = ({ key }) => {
//     setSelectedOption(key);
//     localStorage.setItem("SelectedMenu", key);
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           backgroundColor: "#fff",
//         }}
//       >
//         <MenuItems
//           handleNavbarClick={handleNavbarClick}
//           selectedOption={selectedOption}
//         />
//       </Header>
//       <Layout>
//         <Sider width={220} style={{ background: "#fff" }}>
//           <SiderContent selectedOption={selectedOption} />
//         </Sider>
//         <Layout style={{ padding: "24px", paddingRight: "4px" }}>
//           <Content
//             style={{
//               overflowY: "auto",
//               height: "calc(90vh - 64px)",
//               paddingRight: "14px",
//             }}
//           >
//             <Outlet />
//           </Content>
//         </Layout>
//       </Layout>
//     </Layout>
//   );
// };

// export default TheLayout;

import React, { useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Header from "../components/Header";

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const TheLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    getItem("Company", "companies", <i className="bi bi-building-fill"></i>),
    getItem("User", "user", <UserOutlined />, [getItem("Users", "users")]),
    getItem("Security", "security", <i className="bi bi-shield-lock"></i>, [
      getItem("Roles", "roles"),
      getItem("Permissions", "permissions"),
    ]),
  ];

  const onMenuClick = ({ key }) => {
    setSelectedKey(key);
    localStorage.setItem("selectedMenuKey", key);
    navigate(`/${key}`);
  };

  useEffect(() => {
    const savedKey = localStorage.getItem("selectedMenuKey") || "companies";
    setSelectedKey(savedKey);

    if (location.pathname === "/") {
      navigate(`/${savedKey}`);
    }
  }, [location.pathname, navigate]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div />
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Header colorBgContainer={colorBgContainer} />
        <Content style={{ margin: "16px 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TheLayout;
