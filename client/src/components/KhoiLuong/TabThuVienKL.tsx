import { PlusOutlined } from "@ant-design/icons/lib/icons";
import { Button, List, Skeleton, Form, Select, FormInstance } from "antd";
import { LoaiCongTrinh } from "../../Graphql/khoiluong";
import { ws } from "../../api/nvExcel";
import React, { useState } from "react";
const formRef = React.createRef<FormInstance>();

const defState = {
  initLoading: true,
  lstMauKhoiLuong: []
}

function TabThuVienKL() {
  const [state, setState] = useState(defState);
  const { loading, error, data } = LoaiCongTrinh();
  function _onFinish(value: any) {

  }
  const _mcvClick = async (value: any) => {
    console.log(value);
    // ws.insertRange('A7:A10')
    const addr1 = await ws.getSelectedAddress();
    console.log(addr1);
    if (addr1.cell1.row! > 7) {
      // socket.emit('khoiluong/mau/get', value, async (mkl: any) => {
      // 	if (mkl) {
      // 		const data: any[][] = JSON.parse(mkl.data)
      // 		var addr = `A${addr1.cell1.row}:J${data.length + addr1.cell1.row! - 1}`;
      // 		await ws.insertRange(addr);
      // 		ws?.addValues(addr, data);
      // 	}
      // })
    }
  };
  return (
    <>
      <FormThuVien lstLoaiCongTrinh={data ? data.loaicongtrinhs : []} onFinish={() => _onFinish("")} />
      <List
        className="demo-loadmore-list"
        size="small"
        loading={state.initLoading}
        itemLayout="horizontal"
        bordered={true}
        dataSource={state.lstMauKhoiLuong}
        renderItem={(item: any) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta title={item.label} />
              <Button
                type="primary"
                shape="circle"
                size="small"
                onClick={(e) => _mcvClick(item.value)}
                icon={<PlusOutlined />}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
}

export default TabThuVienKL;

function FormThuVien({ onFinish, lstLoaiCongTrinh }: any) {
  return (
    <Form ref={formRef} onFinish={() => onFinish()}>
      <Form.Item label="Loại công trình" name="loaiCongTrinh">
        <Select
          showSearch
          options={lstLoaiCongTrinh}
          placeholder="Chọn loại công trình"
          optionFilterProp="children"
          // onSelect={(val: string) => _selectLoaiCongTrinh(val)}
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
