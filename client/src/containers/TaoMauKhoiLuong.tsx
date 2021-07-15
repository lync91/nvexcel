import React, { Component } from "react";
import { Tabs } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ws } from "../api/nvExcel";
import NoSheet from "../components/NoSheet";
import FormTaoMau from "../components/FormTaoMau";
// import { initBangKhoiLuong } from "../api/libKhoiLuong";
import FormLoaiCongTrinh from "../components/KhoiLuong/FormLoaiCongTrinh";
import {
	MAU_KHOI_LUONG_NAME
} from "../constants/named";
import { tbBANGTONGHOPKHOILUONG } from "../constants/templates";
// import { MAU_KHOI_LUONG, TONG_HOP_KHOI_LUONG_HEADER, KHOI_LUONG_DEFAULT_VALUES } from "../constants/values";
// import socket from "../socket";
// import MauKhoiLuongContext from "../contexts/MauKhoiLuongContext";

// const formRef = React.createRef<FormInstance>();

export interface AppProps {
	formRef: any
}
export interface AppStates {
	wsExits: boolean;
	selectedTabKey: string;
	autoInit: boolean;
	blackAndWhite: boolean;
	isSetFont: boolean;
	id: string | undefined;
	loaiCongTrinh: string | undefined;
	tenBophan: string | undefined;
	data: string | undefined;
	field: any;
	lstLoaiCongTrinh: any[];
	lstMauKhoiLuong: any[];
	isRename: boolean;
}



export interface orientationOptions {
	key: string,
	text: string,
	value: Excel.PageOrientation
}
export class TaoMauKhoiLuong extends Component<AppProps, AppStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			wsExits: false,
			selectedTabKey: 'create',
			autoInit: false,
			blackAndWhite: true,
			isSetFont: false,
			id: undefined,
			loaiCongTrinh: undefined,
			tenBophan: undefined,
			data: undefined,
			field: {},
			lstLoaiCongTrinh: [],
			lstMauKhoiLuong: [],
			isRename: false
		}
	}

	formRef = React.createRef<FormInstance>();

	async prepair() {
		const name = await ws?.checkWsExits(MAU_KHOI_LUONG_NAME);
		name ? this.setState({ wsExits: true }) : this.setState({ wsExits: false });
		if (name) {
			console.log(name);
			await ws?.currentWs(MAU_KHOI_LUONG_NAME)
			ws?.activate()
		}
	}

	componentDidMount() {
		this.prepair()
		// socket.emit('khoiluong/mau/getLoaiCongTrinh', (data: any) => this.setState({ lstLoaiCongTrinh: data }))
	}
	_taoBangmau = async () => {
		this.setState({ wsExits: true })
		tbBANGTONGHOPKHOILUONG.name = MAU_KHOI_LUONG_NAME
		await ws?.newSheetfromObject(tbBANGTONGHOPKHOILUONG);
		const id = await ws?.currentWs(MAU_KHOI_LUONG_NAME);
		await ws.updateProjectInfo(MAU_KHOI_LUONG_NAME, id);
		await ws?.activate();
		ws?.addValues('A6', [['HM']])
		ws?.addValues('A7', [['#']])
		console.log(this.state);

	}
	_onFinish = async (values: any) => {
		await ws?.getActive();
		const lastRow = await ws.getLastRow();
		const val = await ws?.getFomulas(`A7:J${lastRow.cell1.row}`);
		const data = {
			tenBoPhan: values.tenBoPhan,
			data: JSON.stringify(val),
			loaiCongTrinh: values.loaiCongTrinh,
			id: ''
		}
		if (this.state.selectedTabKey === 'create') {
		} else {
			data.id = values.id
		}
	}
	_selectLoaiCongTrinh(value: string) {
	}
	async _selectMauKhoiLuong(value: string) {
		const lastRow = await ws.getLastRow();
		ws.clearValues(`A6:J${lastRow.cell1.row}`);
	}

	render() {
		const { TabPane } = Tabs;
		const { wsExits } = this.state;
		if (!wsExits) {
			return <NoSheet message="Chưa có Sheet Mẫu khối lượng" onClick={() => this._taoBangmau()} />
		}
		return (
			<section>
				<Tabs
					hidden={!this.state.wsExits}
					defaultActiveKey={this.state.selectedTabKey}
					onChange={(key) => this.setState({ selectedTabKey: key })}>
					<TabPane tab="Tạo mới" key="create">
						<FormTaoMau onFinish={(values: any) => this._onFinish(values)} />
					</TabPane>
					<TabPane tab="Sửa mẫu" key="edit">
						<FormLoaiCongTrinh />
					</TabPane>
				</Tabs>
			</section>
		);
	}
};

export default TaoMauKhoiLuong