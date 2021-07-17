import { PlusOutlined } from "@ant-design/icons/lib/icons";
import { Button, List, Skeleton, Form, Select, FormInstance } from "antd";
import { LoaiCongTrinh, BoPhanCongTrinh } from "../../Graphql/khoiluong";
import { ws } from "../../api/nvExcel";
import React, { useState } from "react";
import SelectBoPhanCongTrinh from "./SelectBoPhanCongTrinh";
const formRef = React.createRef<FormInstance>();

const defState = {
  initLoading: true,
  lstMauKhoiLuong: [],
};

function TabThuVienKL() {
  const [state, setState] = useState(defState);
  const [ selectedLct, setSelectedLct ] = useState('')
  const { loading, error, data } = LoaiCongTrinh();
  function _onFinish(value: any) {}
  // const _mcvClick = async (value: any) => {
  //   console.log(value);
  //   // ws.insertRange('A7:A10')
  //   const addr1 = await ws.getSelectedAddress();
  //   console.log(addr1);
  //   if (addr1.cell1.row! > 7) {
  //   }
  // };
  function onSelect(value: string) {
    setSelectedLct(value)
  }
  return (
    <>
      <FormThuVien
        lstLoaiCongTrinh={data ? data.lstLoaicongtrinh : []}
        onFinish={() => _onFinish("")}
        onSelect={onSelect}
      />
      <SelectBoPhanCongTrinh loaiCongTrinh={selectedLct} />
    </>
  );
}

export default TabThuVienKL;

function FormThuVien({ onFinish, lstLoaiCongTrinh, onSelect }: any) {
  return (
    <Form ref={formRef} onFinish={() => onFinish()}>
      <Form.Item label="Loại công trình" name="loaiCongTrinh">
        <Select
          showSearch
          options={lstLoaiCongTrinh}
          placeholder="Chọn loại công trình"
          optionFilterProp="children"
          onSelect={(val: string) => onSelect(val)}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        ></Select>
      </Form.Item>
      {/* <Form.Item label='Tên bộ phận' name='tenBoPhan' >
		<Input />
	</Form.Item> */}
    </Form>
  );
}
