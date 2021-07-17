import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { AutoComplete, Button, Form, FormInstance, Input } from "antd";
import { LoaiCongTrinh } from "../../Graphql/khoiluong";

const CREATE_MAU_KHOI_LUONG = gql`
  mutation Mutation($createMauKhoiLuongRecord: CreateOneMauKhoiLuongInput!) {
    createMauKhoiLuong(record: $createMauKhoiLuongRecord) {
      record {
        tenBoPhan
        loaiCongTrinh
        data
        _id
      }
    }
  }
`;

const formRef = React.createRef<FormInstance>();

export default function TabTaoMauKhoiLuong() {
  const { loading, error, data } = LoaiCongTrinh();
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [addMauKhoiLuong, resmkl] = useMutation(CREATE_MAU_KHOI_LUONG);
  useEffect(() => {
    setOptions(data ? data.loaicongtrinhs : []);
  }, []);
  function _onFinish(values: any) {
    console.log({ ...values, ...{ data: [["Hello"]] } });
    addMauKhoiLuong({
      variables: {
        createMauKhoiLuongRecord: { ...values, ...{ data: JSON.stringify([["Hello"]]) } },
      },
    });
    formRef.current?.setFieldsValue({
      tenBoPhan: "",
      loaiCongTrinh: ""
    })
  }

  const onSearch = (searchText: string) => {};
  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };
  return (
    <>
      <Form ref={formRef} onFinish={(e: any) => _onFinish(e)}>
        <Form.Item label="Loại công trình" name="loaiCongTrinh">
          <AutoComplete
            options={data ? data.lstLoaicongtrinh : []}
            onSelect={onSelect}
            onSearch={onSearch}
          />
        </Form.Item>
        <Form.Item label="Tên bộ phận" name="tenBoPhan">
          <Input />
        </Form.Item>
        <Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
