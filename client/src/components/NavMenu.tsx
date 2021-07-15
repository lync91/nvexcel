import React from "react";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons"

export default function NavMenu(props: any) {
  const onSelect = () => {

  }
  return (
    <Menu
            mode="inline"
            openKeys={props.openKeys}
            // onOpenChange={onOpenChange}
            onSelect={onSelect}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <MailOutlined />
                  <span>Khối lượng</span>
                </span>
              }
            >
              <Menu.ItemGroup key="tracuuThuVienMauKhoiLuong" title="Thao tác">
                <Menu.Item key="/TienLuong">Bảng tiên lượng</Menu.Item>
                <Menu.Item key="2">Thống kê thép bê tông</Menu.Item>
                <Menu.Item key="3">Thống kê thép thép hình</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="g2" title="Quản lý thư viện">
                <Menu.Item key="/TaoMauKhoiLuong">Mẫu khối lượng</Menu.Item>
                <Menu.Item key="6">Mẫu thống kê thép bê tông</Menu.Item>
                <Menu.Item key="8">Mẫu thống kê thép hình</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Dự toán">
              <Menu.Item key="TongHopChiPhi">Tổng hợp chi phí</Menu.Item>
              <Menu.Item key="MauBangTra">Mẫu bảng tra</Menu.Item>
              <Menu.Item key="11">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="12">Option 7</Menu.Item>
                <Menu.Item key="13">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" icon={<SettingOutlined />} title="Công cụ">
              <Menu.Item key="/pageFormat">Định dạng trang in</Menu.Item>
              <Menu.Item key="/pageFormatG8">Định dạng trang in G8</Menu.Item>
              <Menu.Item key="/charConvert">Chuyển mã tiếng Viết</Menu.Item>
              <Menu.Item key="/otherTools">Công cụ khác</Menu.Item>
            </SubMenu>
          </Menu>
  )
}