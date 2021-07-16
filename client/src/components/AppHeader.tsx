import React, {  } from "react";

import { Layout, Menu } from "antd";
import { BugOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

interface propsType {
  toggle(): void;
  toggleLogs(): void
}

export function AppHeader({ toggle, toggleLogs }: propsType) {
  const { Header } = Layout;
  return (
    <Header className="header" style={{ padding: 0 }}>
          <div className="btn-menu" onClick={() => toggle()}>
            <MenuUnfoldOutlined />
          </div>
          <div>
            <Menu
              className="header-menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
            >
              {/* <Menu.Item key="1" onClick={() => onToggleMenu()}><MenuUnfoldOutlined /></Menu.Item> */}
              <Menu.Item key="2" onClick={() => console.log("OK")}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" onClick={() => console.log("OK1")}>
                nav 3
              </Menu.Item>
            </Menu>
          </div>
          <div className="btn-logs" onClick={toggleLogs}>
            <BugOutlined />
          </div>
        </Header>
  )
}