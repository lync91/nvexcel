import { Form, AutoComplete, Input, Button, message } from "antd";
import React from "react"
import { FormInstance } from 'antd/lib/form';
import { useMutation, gql } from "@apollo/client";
import { ws } from "../api/nvExcel";

const CREATE_MKL = gql`
mutation CreateMauKhoiLuong($loaiCongTrinh: String!, $tenBoPhan: String!, $data: String!) {
  createMauKhoiLuong(input: {loaiCongTrinh: $loaiCongTrinh, tenBoPhan: $tenBoPhan, data: $data}) {
    id
  }
}
`;

const formRef = React.createRef<FormInstance>();

const _getValues = async () => {
  await ws?.getActive();
  const lastRow = await ws.getLastRow();
  const val = await ws?.getFomulas(`A7:J${lastRow.cell1.row}`);
  return JSON.stringify(val);
}
const _onCompleted = () => {
  message.success('Tạo mẫu khối lượng');
}


const FormTaoMau = ({ onFinish }: any) => {
  const [createMauKhoiLuong, {data}] = useMutation(CREATE_MKL, {onCompleted: _onCompleted});
  return (
    <Form ref={formRef} onFinish={async (values: any) => {
      const res = await _getValues();
      values.data = res;
      console.log(data);
      createMauKhoiLuong({ variables: values});
      
      // createMauKhoiLuong({ variables: { type: input.value } })
    }}>
      <Form.Item label='Loại công trình' name='loaiCongTrinh'>
        <AutoComplete />
      </Form.Item>
      <Form.Item label='Tên bộ phận' name='tenBoPhan' >
        <Input />
      </Form.Item>
      <Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
        <Button type="primary" htmlType="submit">
          Lưu
  		</Button>
      </Form.Item>
    </Form>
  );
}

export default FormTaoMau;