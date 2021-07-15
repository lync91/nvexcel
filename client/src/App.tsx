import React, { Suspense, useState, useEffect } from "react";
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

import { MenuUnfoldOutlined } from "@ant-design/icons";
// import { AppContext } from "./contexts/AppContext";
// import socket from "./socket";
import { ws } from "./api/nvExcel";
import { DAU_VAO_OBJECT } from "./constants/values";
import NavMenu from "./components/NavMenu";

// import {
//   ApolloProvider,
//   ApolloClient,
//   InMemoryCache,
//   gql,
// } from "@apollo/client";

// import { ApolloProvider } from 'react-apollo';
// import { gql } from '@apollo/client';
// import client from "./apollo";

// const client = new ApolloClient({
//   uri: 'https://localhost:8083/graphql',
//   cache: new InMemoryCache()
// });
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

interface Size {
  width: number | undefined;
  height: number | undefined;
}

function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export interface AppState {
  isOpen: boolean;
  selectedKey: string;
  dismissPanel: (item: any) => void;
  collapsed: boolean;
  collapsedWidth: number;
  sideWith: string;
  openKeys: string[];
  selectedKeys: string[];
  tlExits: boolean;
  logs: any[];
  openLogs: boolean;
}

const defState = {
  isOpen: false,
  selectedKey: history.location.toString(),
  collapsed: true,
  collapsedWidth: 0,
  sideWith: "100%",
  openKeys: ["sub1"],
  selectedKeys: [""],
  tlExits: false,
  logs: [],
  openLogs: true,
};
const defLogs: any[] = [];

const App = () => {
  const [state, setStateValues] = useState(defState);
  const [visible, setvisible] = useState(false);
  const [nvlogs, setLogs] = useState(defLogs);
  const size: Size = useWindowSize();
  // async componentDidMount() {
  //   Hook(window.console, (log) => {
  //     setStateValues(({ logs }) => ({ logs: [...logs, Decode(log)] }));
  //   });
  // }
  useEffect(() => {
    Hook(window.console, (log) => {
      setLogs((curLog) => [...curLog, ...[Decode(log)]]);
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
  // const onOpenChange = (openKeys: string[]) => {
  //   const latestOpenKey = openKeys.find(
  //     (key) => state.openKeys.indexOf(key) === -1
  //   );
  //   console.log("latest", latestOpenKey);
  //   if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
  //     setStateValues({ ...state, ...{ openKeys: openKeys } });
  //   } else {
  //     setStateValues({
  //       ...state,
  //       ...{
  //         openKeys: latestOpenKey ? [latestOpenKey] : [],
  //       },
  //     });
  //   }
  // };
  // const onSelect = (data: any) => {
  //   history.push(data.key);
  //   setStateValues({ ...state, ...{ selectedKeys: data.selectedKeys } });
  //   setStateValues({ ...state, ...{ collapsed: !state.collapsed } });
  // };
  const toggle = (isVis: boolean | undefined = undefined) => {
    if (isVis === undefined) {
      setvisible(!visible);
    } else {
      setvisible(isVis);
    }
  };

  const { Header } = Layout;
  return (
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
            <Menu.Item key="2" onClick={() => console.log('OK')}>nav 2</Menu.Item>
            <Menu.Item key="3" onClick={() => console.log('OK1')}>nav 3</Menu.Item>
          </Menu>
        </div>
      </Header>
      <div
        style={{
          position: "relative",
          height: size.height ? size.height - 36 : "100%",
          overflow: "auto",
        }}
      >
        <div className="logs" style={{ backgroundColor: "#242424" }}>
          <Console logs={nvlogs} variant="dark" />
        </div>
        <div style={{display: "none"}}>
          <Router history={history}>
            <Suspense fallback="Đang tải">
              <section className="App-body">
                <Switch>
                  <Route exact={true} path="/" component={Home} />
                  <Route path="/?_host_Info:param" component={Home} />
                  <Route path="/charConvert" component={CharConvert} />
                  <Route path="/PageFormat" component={PageFormat} />
                  <Route path="/PageFormatG8" component={PageFormatG8} />
                  <Route path="/TaoMauKhoiLuong" component={TaoMauKhoiLuong} />
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
          width={200}
          style={{ position: "absolute" }}
          className="drawer-menu"
        >
          <NavMenu />
        </Drawer>
      </div>
    </div>
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
