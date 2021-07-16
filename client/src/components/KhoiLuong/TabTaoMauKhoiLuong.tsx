import React, {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import { AutoComplete, Button, Form, FormInstance, Input } from "antd";
import { LoaiCongTrinh } from "../../Graphql/khoiluong";
const formRef = React.createRef<FormInstance>();

export default function TabTaoMauKhoiLuong() {
  const { loading, error, data } = LoaiCongTrinh();
  const [options, setOptions] = useState<{ value: string }[]>([]); 
  useEffect(() => {
    // console.log(data ? data.loaicongtrinhs : ''); 
    setOptions(data ? data.loaicongtrinhs : [])
  }, [])
  function _onFinish(values: any) {
    
  }

  const onSearch = (searchText: string) => {
    
  };
  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };
  return (
    <>
      <Form ref={formRef}>
            <Form.Item label="Loại công trình" name="loaiCongTrinh">
              <AutoComplete
                options={data ? data.loaicongtrinhs : []}
                onSelect={onSelect}
                onSearch={onSearch}
               />
            </Form.Item>
            <Form.Item label="Tên bộ phận" name="tenBoPhan">
              <Input />
            </Form.Item>
            <Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
              <Button type="primary" htmlType="submit" onClick={_onFinish}>
                Lưu
              </Button>
            </Form.Item>
          </Form>
    </>
  )
}