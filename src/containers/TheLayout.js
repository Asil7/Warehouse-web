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
import { ConfigProvider, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { getMenuItems } from "./getMenuItems";

const { Content, Sider } = Layout;

const TheLayout = () => {
  const [customTheme, setCustomTheme] = useState([theme.defaultAlgorithm]);
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedForPhone, setCollapsedForPhone] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = getMenuItems();

  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: customTheme,
        token: {
          // fontFamily: "Advent Pro",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={isMobile ? collapsedForPhone : collapsed}
          collapsedWidth={isMobile ? 0 : 80}
          onCollapse={(value) => {
            if (isMobile) {
              setCollapsedForPhone(value);
            } else {
              setCollapsed(value);
            }
          }}
          trigger={!isMobile ? undefined : null}
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
          <Header
            isMobile={isMobile}
            setCustomTheme={setCustomTheme}
            colorBgContainer={colorBgContainer}
            collapsedForPhone={collapsedForPhone}
            setCollapsedForPhone={setCollapsedForPhone}
          />
          <Content style={{ margin: "16px 16px" }}>
            <div
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default TheLayout;
