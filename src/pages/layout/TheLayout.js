import React, { useState } from "react";
import { Layout } from "antd";
import MenuItems from "../containers/MenuItems";
import SiderContent from "../containers/SiderContent";

const { Header, Sider, Content } = Layout;

const TheLayout = () => {
  const [selectedOption, setSelectedOption] = useState("Merchants");

  const handleNavbarClick = ({ key }) => {
    setSelectedOption(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#001529",
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
          <Content style={{ background: "#fff", margin: 0, minHeight: 280 }}>
            {`Selected main menu: ${selectedOption}`}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TheLayout;
