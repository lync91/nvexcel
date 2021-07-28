import React, { Suspense, useState, useEffect, useRef } from "react";
import {
  Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import history from "./history";
import "antd/dist/antd.css";
import "./App.css";
import { Layout, Button, Empty, Drawer } from "antd";
import { Hook, Console, Decode } from "console-feed";
import { ws } from "./api/nvExcel";
import { DAU_VAO_OBJECT } from "./constants/values";
import NavMenu from "./components/NavMenu";
import { useWindowSize, Size } from "./windowSize";

import { ApolloProvider } from "@apollo/client";
import { AppHeader } from "./components/AppHeader";
import client from "./apollo";
const CharConvert = React.lazy(() => import("./containers/CharConvert"));
const PageFormat = React.lazy(() => import("./containers/PageFormat"));
const PageFormatG8 = React.lazy(() => import("./containers/PageFormatG8"));
const TaoMauKhoiLuong = React.lazy(
  () => import("./containers/TaoMauKhoiLuong")
);
const TienLuong = React.lazy(() => import("./containers/TienLuong"));
const TongHopChiPhi = React.lazy(() => import("./containers/TongHopChiPhi"));
const MauBangTra = React.lazy(() => import("./containers/MauBangTra"));
const otherTools = React.lazy(() => import("./containers/otherTools"));

const defState = {
  isOpen: false,
  selectedKey: history.location.toString(),
  collapsed: true,
  collapsedWidth: 0,
  tlExits: false,
  logs: [],
  openLogs: true,
};
const defLogs: any[] = [];

const App = () => {
  const [state, setStateValues] = useState(defState);
  const [visible, setvisible] = useState(false);
  const [nvlogs, setLogs] = useState(defLogs);
  const [showLogs, setShowLogs] = useState(true);
  const size: Size = useWindowSize();
  const el = useRef(null);
  useEffect(() => {
    Hook(window.console, (log) => {
      setLogs((curLog) => [...curLog, ...[Decode(log)]]);
      const kref: any = el.current;
      kref.scrollIntoView({ block: "end", behavior: "smooth" });
    });
    _prepair()
  }, []);

  async function _prepair() {
    const info = await ws.getPropeties();
    console.log('info', info);
  }
  const onClose = () => {
    setvisible(false);
  };
  const _khoiTaoDauVao = async () => {
    await ws.delete(DAU_VAO_OBJECT.name).then(async (x: any) => {
      await ws.newSheetfromObject(DAU_VAO_OBJECT);
      setStateValues({ ...state, ...{ tlExits: true } });
    });
  };
  const toggle = (isVis: boolean | undefined = undefined) => {
    if (isVis === undefined) {
      setvisible(!visible);
    } else {
      setvisible(isVis);
    }
  };

  const toggleLogs = () => {
    setShowLogs(!showLogs);
    setTimeout(() => {
      const kref: any = el.current;
      kref.scrollIntoView({ block: "end" });
    }, 200);
  };
  const _onMenuSelected = () => {
    setvisible(false);
  };

  const { Header } = Layout;
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div hidden={!state.tlExits} style={{ margin: "auto" }}>
          <Empty
            style={{
              paddingTop: 60,
              paddingBottom: 60,
            }}
            image="assets/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                Hmm~! File dự toán chưa có bảng đầu vào. Hãy Khởi Tạo để bắt đầu
                lập dự toán
              </span>
            }
          >
            <Button type="primary" onClick={_khoiTaoDauVao}>
              Khởi tạo
            </Button>
          </Empty>
        </div>
        <AppHeader toggle={toggle} toggleLogs={toggleLogs} />
        <div
          style={{
            position: "relative",
            height: size.height ? size.height - 36 - (showLogs ? 250 : 0) : "100%",
            overflow: "auto",
          }}
        >
          <div>
            <Router history={history}>
              <Suspense fallback="Đang tải">
                <section className="App-body">
                  <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/?_host_Info:param" component={Home} />
                    <Route path="/charConvert" component={CharConvert} />
                    <Route path="/PageFormat" component={PageFormat} />
                    <Route path="/PageFormatG8" component={PageFormatG8} />
                    <Route
                      path="/TaoMauKhoiLuong"
                      component={TaoMauKhoiLuong}
                    />
                    <Route path="/TienLuong" component={TienLuong} />
                    <Route path="/TongHopChiPhi" component={TongHopChiPhi} />
                    <Route path="/MauBangTra" component={MauBangTra} />
                    <Route path="/otherTools" component={otherTools} />
                  </Switch>
                </section>
              </Suspense>
            </Router>
          </div>
          <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
            getContainer={false}
            width="100%"
            style={{ position: "absolute" }}
            className="drawer-menu"
          >
            <NavMenu onSelected={_onMenuSelected} />
          </Drawer>
        </div>
        <div
          hidden={!showLogs}
          style={{
            position: "relative",
            height: 250,
            overflow: "auto",
          }}
        >
          <div
            className="logs"
            style={{ backgroundColor: "#242424" }}
          >
            <Console logs={nvlogs} variant="dark" />
            <div id={"el"} ref={el} />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default App;

