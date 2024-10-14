import React from "react";
import {
  Layout,
  Row,
  Col,
  Avatar,
  Button,
  Typography,
  Dropdown,
  theme,
} from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";

const { Header: AntHeader } = Layout;

const Header = ({
  colorBgContainer,
  setCollapsedForPhone,
  collapsedForPhone,
  isMobile,
}) => {
  const { Text } = Typography;
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const username = UserService.getSubject();

  const profile = [
    {
      key: "0",
      disabled: true,
      style: { backgroundColor: colorBgLayout },
      label: (
        <div>
          <Text className="fs-6">{username}</Text>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: (
        <Link
          rel="noopener noreferrer"
          className="text-decoration-none"
          to={"/profile"}
        >
          <UserOutlined className="text-primary" /> My profile
        </Link>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div rel="noopener noreferrer" onClick={() => UserService.doLogout()}>
          <LogoutOutlined className="text-danger" /> Logout
        </div>
      ),
    },
  ];

  return (
    <AntHeader style={{ backgroundColor: colorBgContainer }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Row align="middle">
            {isMobile && (
              <Button
                type="text"
                icon={
                  collapsedForPhone ? (
                    <MenuUnfoldOutlined style={{ fontSize: "24px" }} />
                  ) : (
                    <MenuFoldOutlined style={{ fontSize: "24px" }} />
                  )
                }
                onClick={() => setCollapsedForPhone(!collapsedForPhone)}
                className="me-3"
              />
            )}
            <div className="logo" style={{ fontSize: "24px" }}>
              MyLogo
            </div>
          </Row>
        </Col>

        <Col>
          <Dropdown
            menu={{
              items: profile,
            }}
            trigger={["click"]}
            placement="bottomRight"
            overlayStyle={{ minWidth: "140px" }}
          >
            <Avatar className="bg-primary" size="16" icon={<UserOutlined />} />
          </Dropdown>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
