import React from "react";
import { Layout, Row, Col, Avatar } from "antd";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = ({ colorBgContainer }) => {
  return (
    <AntHeader style={{ backgroundColor: colorBgContainer }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Row align="middle">
            <MenuUnfoldOutlined
              style={{ fontSize: "24px", marginRight: "16px" }}
            />
            <div className="logo" style={{ fontSize: "24px" }}>
              MyLogo
            </div>
          </Row>
        </Col>

        <Col>
          <Avatar size="large" icon={<UserOutlined />} />
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
