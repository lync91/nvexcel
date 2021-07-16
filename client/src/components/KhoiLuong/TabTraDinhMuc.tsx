import { Form, FormInstance, Select, Table } from "antd";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";

const formRef = React.createRef<FormInstance>();

const columns: any[] = [
  {
    title: "Mã hiệu",
    dataIndex: "MHDG",
    key: "MHDG",
    render: (text: any) => <>{text}</>,
  },
  {
    title: "Tên công tác",
    dataIndex: "TCV",
    key: "TCV",
    render: (text: any) => <>{text}</>,
  },
  {
    title: "Đơn vị",
    dataIndex: "DVT",
    key: "DVT",
    render: (text: any) => <>{text}</>,
  },
];

export default function TabTraDinhMuc() {
  const [lstKV, setLstKV] = useState([]);
  const [lstDM, setLstDM] = useState([]);
  const [khuVuc, setKhuVuc] = useState();
  const [donGia, setDonGia] = useState();
  const [congTac, setCongTac] = useState();
  function _onFinish() {
  
  }
  function _selectKhuvuc(value: any) {
    
  }
  function _frmTraDinhMucChange(values: any) {
    
  }
  function _selectDinhMuc(value: any) {
    
  }
  function _searchDonGia(value: any) {
    
  }
  function _dmClick(value: any) {
    
  }
  return (
    <>
    <Form
            ref={formRef}
            onFinish={_onFinish}
            onValuesChange={(values) => _frmTraDinhMucChange(values)}
          >
            <Form.Item
              label="Khu vực"
              name="khuVuc"
              initialValue={khuVuc}
            >
              <Select
                showSearch
                options={lstKV}
                placeholder="Chọn khu vực"
                optionFilterProp="children"
                onSelect={(val: string) => _selectKhuvuc(val)}
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              ></Select>
            </Form.Item>
            <Form.Item
              label="Đơn giá"
              name="donGia"
              initialValue={donGia}
            >
              <Select
                showSearch
                mode="multiple"
                options={lstDM}
                placeholder="Chọn đơn giá"
                optionFilterProp="children"
                onSelect={(val: string) => _selectDinhMuc(val)}
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              ></Select>
            </Form.Item>
            <Form.Item label="Tìm kiếm" name="search">
              <Search
                placeholder="Tìm kiếm mã hiệu, công tác"
                onSearch={(value) => _searchDonGia(value)}
                enterButton
              />
            </Form.Item>
          </Form>
          <Table
            onRow={(record: any, rowIndex) => {
              return {
                onClick: (event) => {
                  _dmClick(record.MHDM);
                }, // click row
              };
            }}
            columns={columns}
            dataSource={congTac}
          />
    </>
  )
}