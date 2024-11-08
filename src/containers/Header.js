import React, { useEffect, useState, useCallback } from "react";
import {
  Layout,
  Row,
  Col,
  Avatar,
  Button,
  Typography,
  Dropdown,
  theme,
  Segmented,
  Image,
} from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import logoImage from "../img/children.png";

const { darkAlgorithm, defaultAlgorithm } = theme;
const { Header: AntHeader } = Layout;

const Header = ({
  setCollapsedForPhone,
  collapsedForPhone,
  setCustomTheme,
  isMobile,
  setThem,
  them,
}) => {
  const { Text } = Typography;
  const { token } = theme.useToken();
  const colorBgLayout = token?.colorBgLayout;
  const username = UserService.getSubject();

  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleThemeChange = useCallback(
    (value) => {
      setSelectedTheme(value);
      if (value === "light") {
        setCustomTheme([defaultAlgorithm]);
        setThem("light");
        localStorage.setItem("theme", "light");
      } else {
        setCustomTheme([darkAlgorithm]);
        setThem("dark");
        localStorage.setItem("theme", "dark");
      }
    },
    [setCustomTheme, setThem]
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setSelectedTheme(savedTheme);
    handleThemeChange(savedTheme);
  }, [handleThemeChange]);

  const profile = [
    {
      key: "0",
      disabled: true,
      style: { backgroundColor: colorBgLayout },
      label: (
        <div>
          <Text className="fs-6">
            <strong>{username}</strong>
          </Text>
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
    <AntHeader
      style={{ backgroundColor: them === "dark" ? "#141414" : "#ffffff" }}
    >
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
                className="me-1"
                style={{
                  marginLeft: collapsedForPhone ? "0px" : "200px",
                  transition: "margin-left 0.2s ease",
                }}
              />
            )}
            <Image src={logoImage} alt="Logo" width={40} />
          </Row>
        </Col>

        {collapsedForPhone && (
          <Col>
            <Segmented
              className="me-4"
              options={[
                {
                  value: "light",
                  icon: <i className="bi bi-sun-fill text-warning"></i>,
                  title: "light",
                },
                { value: "dark", icon: <MoonOutlined />, title: "dark" },
              ]}
              onChange={handleThemeChange}
              value={selectedTheme}
            />
            <Dropdown
              menu={{
                items: profile,
              }}
              trigger={["click"]}
              placement="bottomRight"
              overlayStyle={{ minWidth: "140px" }}
            >
              <Avatar
                className="bg-primary"
                size="16"
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Col>
        )}
      </Row>
    </AntHeader>
  );
};

export default Header;
