import React, { useState } from "react";
import { Layout } from "antd";
import MenuItems from "./MenuItems";
import SiderContent from "./SiderContent";
import { Outlet } from "react-router-dom"; // Import Outlet

const { Header, Sider } = Layout;

const TheLayout = () => {
  const [selectedOption, setSelectedOption] = useState("Users");

  const handleNavbarClick = ({ key }) => {
    setSelectedOption(key);
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
        <Layout style={{ padding: "24px" }}>
          <Outlet /> {/* Render the child routes here */}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TheLayout;
