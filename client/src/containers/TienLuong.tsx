import React, { useEffect, useState } from "react";
import {
  Select,
  Form,
  Input,
  Button,
  Tabs,
  AutoComplete,
  Empty,
  Table,
} from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";
import { useQuery, gql } from "@apollo/client";
import { ws, ee } from "../api/nvExcel";
import TabThuVienKL from "../components/KhoiLuong/TabThuVienKL";
// import { initBangTienLuong } from "../api/libKhoiLuong";
import {
  TIEN_LUONG_SHEET_NAME,
  KHU_VUC_NAME,
  DON_GIA_NAME,
} from "../constants/named";
import { tbBANGTONGHOPKHOILUONG } from "../constants/templates";
import { WORKSHEET_SELECTION_CHANGED } from "../constants/eventName";
// import socket from "../socket";
import { addressObj } from "../api/Eutils";
const formRef = React.createRef<FormInstance>();

// const EXCHANGE_RATES = gql`
//   query GetExchangeRates {
//     rates(currency: "USD") {
//       currency
//       rate
//     }
//   }
// `;

export interface AppProps {
  formRef: any;
}
export interface AppStates {
  wsExits: boolean;
  pageSize: string;
  orientation: string;
  autoInit: boolean;
  blackAndWhite: boolean;
  isSetFont: boolean;
  id: string | undefined;
  loaiCongTrinh: string | undefined;
  tenBophan: string | undefined;
  data: any[] | undefined;
  field: any;
  lstLoaiCongTrinh: any[];
  initLoading: boolean;
  loading: boolean;
  list: any[];
  lstMauKhoiLuong: any[];
  lstKV: any[];
  lstDM: any[];
  khuVuc: string;
  donGia: any[];
  congTac: any[];
  currentAddress: addressObj;
}

const defState = {
  wsExits: false,
  pageSize: "a3",
  orientation: "portrait",
  autoInit: false,
  blackAndWhite: true,
  isSetFont: false,
  id: undefined,
  loaiCongTrinh: undefined,
  tenBophan: undefined,
  field: {},
  lstLoaiCongTrinh: [],
  initLoading: true,
  loading: false,
  data: [],
  list: [],
  lstMauKhoiLuong: [],
  lstKV: [],
  lstDM: [],
  khuVuc: "HoChiMinh",
  donGia: [],
  congTac: [],
  currentAddress: new addressObj(""),
};

export interface orientationOptions {
  key: string;
  text: string;
  value: Excel.PageOrientation;
}
function TienLuong() {
  const [state, setState] = useState(defState);

  const prepair = async () => {
    ee.removeAllListeners();
    ee.on(
      `${WORKSHEET_SELECTION_CHANGED}_${ws?.projectInfo[TIEN_LUONG_SHEET_NAME]}`,
      async (address) => {
        setState({ ...state, ...{ currentAddress: new addressObj(address) } });
        const value = await ws.getValues(address);
        formRef.current?.setFieldsValue({ search: value });
      }
    );
    const name = await ws?.checkWsExits(TIEN_LUONG_SHEET_NAME);
    if (name) {
      await ws?.currentWs(TIEN_LUONG_SHEET_NAME);
      ws?.activate();
      setState({ ...state, ...{ wsExits: true } });
    } else {
      setState({ ...state, ...{ wsExits: false } });
    }
  };
  useEffect(() => {
    prepair();
    if (ws?.projectInfo[KHU_VUC_NAME]) {
      getDonGiaKhuVuc(ws.projectInfo[KHU_VUC_NAME]);
      setState({ ...state, ...{ khuVuc: ws.projectInfo[KHU_VUC_NAME] } });
    } else {
      getDonGiaKhuVuc(state.khuVuc);
    }
    if (ws?.projectInfo[DON_GIA_NAME]) {
      setState({ ...state, ...{ donGia: ws.projectInfo[DON_GIA_NAME] } });
    }
  }, []);
  const _taoBangmau = async () => {
    await ws?.newSheetfromObject(tbBANGTONGHOPKHOILUONG);
    const id = await ws?.currentWs(TIEN_LUONG_SHEET_NAME);
    await ws.updateProjectInfo(TIEN_LUONG_SHEET_NAME, id);
    await ws?.activate();
    // initBangTienLuong();
    console.log(ws);

    setState({ ...state, ...{ wsExits: true } });
    ws?.addValues("A6", [["HM"]]);
    ws?.addValues("A7", [["#"]]);
  };
  const _selectLoaiCongTrinh = (value: string) => {
    console.log(value);
    getMauKhoiLuong(value);
  };
  const getMauKhoiLuong = (kv: string) => {
    // socket.emit('khoiluong/mau/getlistMauKhoiLuong', kv, (data: any) => {
    // 	if (data) {
    // 		setState({ lstMauKhoiLuong: data, initLoading: false })
    // 	}
    // })
  };
  const _onFinish = async (values: any) => {
    ws.getPropeties();
  };

  const _searchDonGia = (text: string) => {
    // socket.emit('dutoan/dongia/search', state.khuVuc, state.donGia, text, (data: any[]) => {
    // 	console.log(data);
    // 	setState({ congTac: data })
    // })
    return;
  };
  const _selectKhuvuc = async (value: any) => {
    await ws.updateProjectInfo(KHU_VUC_NAME, value);
    ws.getProjectInfo();
    getDonGiaKhuVuc(value);
  };

  const getDonGiaKhuVuc = (kv: string) => {
    // socket.emit('dutoan/dongia/getdm', kv, async (data: any) => {
    // 	setState({ lstDM: data });
    // 	formRef.current?.setFieldsValue({ khuVuc: ws?.projectInfo[DON_GIA_NAME] ? ws?.projectInfo[DON_GIA_NAME] : state.donGia })
    // })
  };

  const _selectDinhMuc = async (value: any) => {
    const values: any = formRef.current!.getFieldsValue();
    ws.updateProjectInfo(DON_GIA_NAME, values ? values.donGia : "");
    console.log("OK");
  };

  const _frmTraDinhMucChange = (values: any) => {
    console.log(values);
    if (values.donGia) ws.updateProjectInfo(DON_GIA_NAME, values.donGia);
  };

  const _dmClick = (value: string) => {
    ws.addValues(`C${state.currentAddress.cell1.row}`, [[value]]);
  };

  const { TabPane } = Tabs;
  const { Search } = Input;
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

  return (
    <section>
      <div hidden={state.wsExits} style={{ margin: "auto" }}>
        <Empty
          style={{
            paddingTop: 60,
            paddingBottom: 60,
          }}
          image="assets/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={<span>Chưa có Sheet Mẫu khối lượng</span>}
        >
          <Button type="primary" onClick={_taoBangmau}>
            Khởi tạo
          </Button>
        </Empty>
      </div>
      <Tabs hidden={!state.wsExits} defaultActiveKey="1">
        <TabPane tab="Menu" key="1">
          <Home />
          <Form ref={formRef} onFinish={_onFinish}>
            <Form.Item label="Loại công trình" name="loaiCongTrinh">
              <AutoComplete />
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
        </TabPane>
        <TabPane tab="Thư viện" key="2">
          <TabThuVienKL />
        </TabPane>
        <TabPane tab="Tra định mức" key="3">
          <Form
            ref={formRef}
            onFinish={_onFinish}
            onValuesChange={(values) => _frmTraDinhMucChange(values)}
          >
            <Form.Item
              label="Khu vực"
              name="khuVuc"
              initialValue={state.khuVuc}
            >
              <Select
                showSearch
                options={state.lstKV}
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
              initialValue={state.donGia}
            >
              <Select
                showSearch
                mode="multiple"
                options={state.lstDM}
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
            dataSource={state.congTac}
          />
        </TabPane>
      </Tabs>
    </section>
  );
}

const EXCHANGE_RATES = gql`
  query {
    hello
  }
`;

function Home() {
  // const { loading, error, data } = useQuery(EXCHANGE_RATES, {
  // 	pollInterval: 0,
  // });

  // return (
  // 	<div>
  // 		<h2>{JSON.stringify('data')}</h2>
  // 	</div>
  // );
  const { loading } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading ...</p>;
  return <h1>Hello!</h1>;
}

export default TienLuong;
