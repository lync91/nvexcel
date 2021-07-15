import { Select, Form, Input, Button, Checkbox } from "antd"
import React from "react";
// import { useQuery, gql } from "@apollo/client";
// import TextArea from "antd/lib/input/TextArea";
import { FormInstance } from 'antd/lib/form';

const formRef = React.createRef<FormInstance>();

// const GET_LOAI_CONG_TRINH = gql`
// query {
//     maukhoiluongs {
//         id
//         tenBoPhan
//         loaiCongTrinh
//       }
// }`
const FormLoaiCongTrinh = () => {
    return (
        <Form ref={formRef} onFinish={() => { }}>
            <Form.Item label='Loại công trình' name='loaiCongTrinh'>
                <Select
                    showSearch
                    options={[]}
                    placeholder="Chọn loại công trình"
                    optionFilterProp="children"
                    onSelect={(val: string) => { }}
                    filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                </Select>
            </Form.Item>
            <Form.Item label='Tên bộ phận' name='id' >
                <Select
                    showSearch
                    options={[]}
                    placeholder="Chọn mẫu khối lượng"
                    optionFilterProp="children"
                    onSelect={(val: string, ops) => { }}
                    filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                </Select>
            </Form.Item>
            <Form.Item name="isRename">
                <Checkbox onChange={(e) => { }}>Sửa tên mẫu khối lượng</Checkbox>
            </Form.Item>
            <Form.Item name="tenBoPhan">
                <Input disabled={true} placeholder="Tên bộ phận" checked={true} />
            </Form.Item>
            <Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
                <Button type="primary" htmlType="submit">
                    Lưu
										</Button>
            </Form.Item>
        </Form>
    )
}

export default FormLoaiCongTrinh;