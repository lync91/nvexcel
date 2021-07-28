import React, { useEffect, useState } from "react";
import { Button, Tabs, Empty } from "antd";
import { FormInstance } from "antd/lib/form";
import { ws, ee } from "../api/nvExcel";
import TabThuVienKL from "../components/KhoiLuong/TabThuVienKL";
import {
  TIEN_LUONG_SHEET_NAME,
  KHU_VUC_NAME,
  DON_GIA_NAME,
} from "../constants/named";
import { tbBANGTONGHOPKHOILUONG } from "../constants/templates";
import { WORKSHEET_SELECTION_CHANGED } from "../constants/eventName";
import { addressObj } from "../api/Eutils";
import TabTraDinhMuc from "../components/KhoiLuong/TabTraDinhMuc";
import TabTaoMauKhoiLuong from "../components/KhoiLuong/TabTaoMauKhoiLuong";
const formRef = React.createRef<FormInstance>();

const defState = {
  wsExits: false,
  khuVuc: "HoChiMinh",
};
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
    console.log(name);
    
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
    setState({ ...state, ...{ wsExits: true } });
    ws?.addValues("A7", [["HM"]]);
    ws?.addValues("A8", [["#"]]);
  };

  const getDonGiaKhuVuc = (kv: string) => {
    // socket.emit('dutoan/dongia/getdm', kv, async (data: any) => {
    // 	setState({ lstDM: data });
    // 	formRef.current?.setFieldsValue({ khuVuc: ws?.projectInfo[DON_GIA_NAME] ? ws?.projectInfo[DON_GIA_NAME] : state.donGia })
    // })
  };

  const { TabPane } = Tabs;

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
        {/* <TabPane tab="Menu" key="1">
          <TabTaoMauKhoiLuong />
        </TabPane> */}
        <TabPane tab="Thư viện" key="2">
          <TabThuVienKL />
        </TabPane>
        <TabPane tab="Tra định mức" key="3">
          <TabTraDinhMuc />
        </TabPane>
      </Tabs>
    </section>
  );
}

export default TienLuong;
