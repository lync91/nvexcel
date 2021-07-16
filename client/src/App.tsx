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
import { Layout, Menu, Button, Empty, Drawer } from "antd";
import { Hook, Console, Decode } from "console-feed";

import { BugOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import { AppContext } from "./contexts/AppContext";
// import socket from "./socket";
import { ws } from "./api/nvExcel";
import { DAU_VAO_OBJECT } from "./constants/values";
import NavMenu from "./components/NavMenu";
import { useWindowSize, Size } from "./windowSize";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

// import { ApolloProvider } from 'react-apollo';
// import { gql } from '@apollo/client';
// import client from "./apollo";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});
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
  const [showLogs, setShowLogs] = useState(false);
  const size: Size = useWindowSize();
  const el = useRef(null);
  useEffect(() => {
    Hook(window.console, (log) => {
      setLogs((curLog) => [...curLog, ...[Decode(log)]]);
      const kref: any = el.current;
      kref.scrollIntoView({ block: "end", behavior: "smooth" });
    });
  }, []);
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
        <Header className="header" style={{ padding: 0 }}>
          <div className="btn-menu" onClick={() => toggle()}>
            <MenuUnfoldOutlined />
          </div>
          <div>
            <Menu
              className="header-menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
            >
              {/* <Menu.Item key="1" onClick={() => onToggleMenu()}><MenuUnfoldOutlined /></Menu.Item> */}
              <Menu.Item key="2" onClick={() => console.log("OK")}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" onClick={() => console.log("OK1")}>
                nav 3
              </Menu.Item>
            </Menu>
          </div>
          <div className="btn-logs" onClick={toggleLogs}>
            <BugOutlined />
          </div>
        </Header>
        <div
          style={{
            position: "relative",
            height: size.height ? size.height - 36 : "100%",
            overflow: "auto",
          }}
        >
          <div
            className="logs"
            hidden={!showLogs}
            style={{ backgroundColor: "#242424" }}
          >
            <Console logs={nvlogs} variant="dark" />
            <div id={"el"} ref={el} />
          </div>
          <div hidden={showLogs}>
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
