import React, { useEffect, useState } from "react";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import Header from "./Header";
import { getMenuItems } from "./getMenuItems";

const { Content, Sider } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

const TheLayout = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  const initialTheme =
    savedTheme === "light" ? [defaultAlgorithm] : [darkAlgorithm];

  const [customTheme, setCustomTheme] = useState(initialTheme);
  const [them, setThem] = useState(savedTheme);
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
    const savedKey = localStorage.getItem("selectedMenuKey") || "orders";
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

  const getBreadcrumbItems = (pathname) => {
    const pathParts = pathname
      .split("/")
      .filter(Boolean)
      .filter((part) => {
        return part && !/^[\d]+$/.test(part);
      });

    return pathParts.map((part, index) => ({
      title: part.charAt(0).toUpperCase() + part.slice(1),
      path: `/${pathParts.slice(0, index + 1).join("/")}`,
    }));
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: customTheme,
        token: {
          fontFamily: "Sriracha",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={205}
          theme={them === "light" ? "dark" : "light"}
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
            theme={them === "light" ? "dark" : "light"}
            selectedKeys={[selectedKey]}
            mode="inline"
            items={items}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout>
          <Header
            setThem={setThem}
            them={them}
            isMobile={isMobile}
            colorBgContainer={colorBgContainer}
            collapsedForPhone={collapsedForPhone}
            setCollapsedForPhone={setCollapsedForPhone}
            setCustomTheme={setCustomTheme}
          />
          <Content className="custom-scrollbar content-scroll">
            <Breadcrumb className="mb-2">
              {getBreadcrumbItems(location.pathname).map((item, index) => (
                <Breadcrumb.Item key={index}>
                  <Link className="text-decoration-none" to={item.path}>
                    {item.title}
                  </Link>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
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
