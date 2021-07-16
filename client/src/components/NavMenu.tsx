import React, { useState } from "react";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import history from "../history";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

interface popsType {
  onSelected(): void
}

export default function NavMenu(props: popsType) {
  // const onSelect = () => {};
  // openKeys: ["sub1"],
  // selectedKeys: [""],
  const [ openKeys, setOpenKeys ] = useState(["sub1"]);
  const { onSelected } = props;
  const onOpenChange = (keys: any[]) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onSelect = (data: any) => {
    history.push(data.key);
    onSelected();
    // setStateValues({ ...state, ...{ selectedKeys: data.selectedKeys } });
    // setStateValues({ ...state, ...{ collapsed: !state.collapsed } });
  };
  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
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
  );
}
