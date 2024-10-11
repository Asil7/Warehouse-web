import React, { useState } from "react";
import { Layout } from "antd";
import MenuItems from "./MenuItems";
import SiderContent from "./SiderContent";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const TheLayout = () => {
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem("SelectedMenu") || "Users";
  });

  const handleNavbarClick = ({ key }) => {
    setSelectedOption(key);
    localStorage.setItem("SelectedMenu", key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <MenuItems
          handleNavbarClick={handleNavbarClick}
          selectedOption={selectedOption}
        />
      </Header>
      <Layout>
        <Sider width={220} style={{ background: "#fff" }}>
          <SiderContent selectedOption={selectedOption} />
        </Sider>
        <Layout style={{ padding: "24px", paddingRight: "4px" }}>
          <Content
            style={{
              overflowY: "auto",
              height: "calc(90vh - 64px)",
              paddingRight: "14px",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TheLayout;
