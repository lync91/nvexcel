import React, { Component } from "react";
import {
	Select,
	Form,
	Input,
	Button,
	Tabs,
	AutoComplete,
	message,
	Empty,
	List,
	Skeleton,
	Avatar,
	Table
} from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { FormInstance } from 'antd/lib/form';

import client from "../apollo";
import { useQuery, gql } from "@apollo/client";
import { ws, ee } from "../api/nvExcel";
import { initBangTienLuong } from "../api/libKhoiLuong";
import {
	TIEN_LUONG_SHEET_NAME,
	KHU_VUC_NAME,
	DON_GIA_NAME
} from "../constants/named";
import { tbBANGTONGHOPKHOILUONG } from "../constants/templates";
import { WORKSHEET_SELECTION_CHANGED } from "../constants/eventName";
// import socket from "../socket";
import { addressObj } from "../api/Eutils";

const formRef = React.createRef<FormInstance>();



export interface AppProps {
	formRef: any
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
	field: any,
	lstLoaiCongTrinh: any[],
	initLoading: boolean,
	loading: boolean,
	list: any[],
	lstMauKhoiLuong: any[];
	lstKV: any[];
	lstDM: any[];
	khuVuc: string;
	donGia: any[];
	congTac: any[];
	currentAddress: addressObj
}

export interface orientationOptions {
	key: string,
	text: string,
	value: Excel.PageOrientation
}
export class TienLuong extends Component<AppProps, AppStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			wsExits: false,
			pageSize: 'a3',
			orientation: 'portrait',
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
			khuVuc: 'HoChiMinh',
			donGia: [],
			congTac: [],
			currentAddress: new addressObj('')
		}

	}

	async prepair() {
		ee.removeAllListeners();
		ee.on(`${WORKSHEET_SELECTION_CHANGED}_${ws?.projectInfo[TIEN_LUONG_SHEET_NAME]}`, async (address) => {
			this.setState({ currentAddress: new addressObj(address) })
			const value = await ws.getValues(address)
			formRef.current?.setFieldsValue({ search: value })
			// socket.emit('dutoan/dongia/search', this.state.khuVuc, this.state.donGia, value[0][0], (data: any[]) => {
			// 	console.log(data);
			// 	this.setState({ congTac: data })
			// })
		})
		const name = await ws?.checkWsExits(TIEN_LUONG_SHEET_NAME)
		if (name) {
			await ws?.currentWs(TIEN_LUONG_SHEET_NAME)
			ws?.activate();
			this.setState({ wsExits: true })
		} else {
			this.setState({ wsExits: false })
		}
	}

	componentDidMount() {
		this.prepair()
		// socket.emit('khoiluong/mau/getLoaiCongTrinh', (data: any) => this.setState({ lstLoaiCongTrinh: data }));
		// socket.emit('dutoan/dongia/getkv', (data: any) => this.setState({ lstKV: data }))

		client
			.query({
				query: gql`
					query {
						hello
					}
					`
			})
			.then(result => console.log(result));

		if (ws?.projectInfo[KHU_VUC_NAME]) {
			this.getDonGiaKhuVuc(ws.projectInfo[KHU_VUC_NAME]);
			this.setState({ khuVuc: ws.projectInfo[KHU_VUC_NAME] })
		} else {
			this.getDonGiaKhuVuc(this.state.khuVuc);
		}
		if (ws?.projectInfo[DON_GIA_NAME]) {
			this.setState({ donGia: ws.projectInfo[DON_GIA_NAME] })
		}
	}
	_taoBangmau = async () => {
		await ws?.newSheetfromObject(tbBANGTONGHOPKHOILUONG);
		const id = await ws?.currentWs(TIEN_LUONG_SHEET_NAME);
		await ws.updateProjectInfo(TIEN_LUONG_SHEET_NAME, id);
		await ws?.activate();
		// initBangTienLuong();
		this.setState({ wsExits: true })
		ws?.addValues('A6', [['HM']])
		ws?.addValues('A7', [['#']])
	}
	_selectLoaiCongTrinh(value: string) {
		console.log(value);
		this.getMauKhoiLuong(value);
	}
	getMauKhoiLuong(kv: string) {
		// socket.emit('khoiluong/mau/getlistMauKhoiLuong', kv, (data: any) => {
		// 	if (data) {
		// 		this.setState({ lstMauKhoiLuong: data, initLoading: false })
		// 	}
		// })
	}
	_onFinish = async (values: any) => {
		console.log('OK');

		// console.log(values);
		// await ws?.getActive();
		// const val = await ws?.getFomulas(`A7:J${ws?.lastRow.row}`);
		// const data = {
		// 	tenBoPhan: values.tenBoPhan,
		// 	data: JSON.stringify(val),
		// 	loaiCongTrinh: values.loaiCongTrinh
		// }
		// socket.emit('khoiluong/mau/add', data, () => {
		// 	formRef.current?.resetFields();
		// 	message.success('Đã lưu mẫu khối lượng thành công');
		// });
		// await ws.setPropeties();
		ws.getPropeties()
	}

	_searchDonGia(text: string) {
		// socket.emit('dutoan/dongia/search', this.state.khuVuc, this.state.donGia, text, (data: any[]) => {
		// 	console.log(data);
		// 	this.setState({ congTac: data })
		// })
	}

	async _mcvClick(value: any) {
		console.log(value);
		// ws.insertRange('A7:A10')
		const addr1 = await ws.getSelectedAddress()
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

	}
	async _selectKhuvuc(value: any) {
		await ws.updateProjectInfo(KHU_VUC_NAME, value)
		ws.getProjectInfo();
		this.getDonGiaKhuVuc(value)
	}

	getDonGiaKhuVuc(kv: string) {
		// socket.emit('dutoan/dongia/getdm', kv, async (data: any) => {
		// 	this.setState({ lstDM: data });
		// 	formRef.current?.setFieldsValue({ khuVuc: ws?.projectInfo[DON_GIA_NAME] ? ws?.projectInfo[DON_GIA_NAME] : this.state.donGia })
		// })
	}

	async _selectDinhMuc(value: any) {
		const values: any = formRef.current?.getFieldsValue();
		ws.updateProjectInfo(DON_GIA_NAME, values.donGia);
		console.log('OK');

	}

	_frmTraDinhMucChange(values: any) {
		console.log(values);
		if (values.donGia) ws.updateProjectInfo(DON_GIA_NAME, values.donGia);
	}

	_dmClick(value: string) {
		ws.addValues(`C${this.state.currentAddress.cell1.row}`, [[value]])
	}

	render() {
		const { TabPane } = Tabs;
		const { Search } = Input
		const columns: any[] = [
			{
				title: 'Mã hiệu',
				dataIndex: 'MHDG',
				key: 'MHDG',
				render: (text: any) => <a>{text}</a>,
			},
			{
				title: 'Tên công tác',
				dataIndex: 'TCV',
				key: 'TCV',
				render: (text: any) => <a>{text}</a>,
			},
			{
				title: 'Đơn vị',
				dataIndex: 'DVT',
				key: 'DVT',
				render: (text: any) => <a>{text}</a>,
			},
		]
		return (
			<section>
				<div hidden={this.state.wsExits} style={{ margin: 'auto' }}>
					<Empty
						style={{
							paddingTop: 60,
							paddingBottom: 60
						}}
						image="assets/empty.svg"
						imageStyle={{
							height: 60,
						}}
						description={
							<span>
								Chưa có Sheet Mẫu khối lượng
								</span>
						}
					>
						<Button type="primary" onClick={this._taoBangmau}>Khởi tạo</Button>
					</Empty>
				</div>
				<Tabs hidden={!this.state.wsExits} defaultActiveKey="1">
					<TabPane tab="Menu" key="1">
						<Home/>
						<Form ref={formRef} onFinish={this._onFinish}>
							<Form.Item label='Loại công trình' name='loaiCongTrinh'>
								<AutoComplete />
							</Form.Item>
							<Form.Item label='Tên bộ phận' name='tenBoPhan' >
								<Input />
							</Form.Item>
							<Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
								<Button type="primary" htmlType="submit" onClick={this._onFinish}>
									Lưu
								</Button>
							</Form.Item>
						</Form>
					</TabPane>
					<TabPane tab="Thư viện" key="2">
						<Form ref={formRef} onFinish={this._onFinish}>
							<Form.Item label='Loại công trình' name='loaiCongTrinh'>
								<Select
									showSearch
									options={this.state.lstLoaiCongTrinh}
									placeholder="Chọn loại công trình"
									optionFilterProp="children"
									onSelect={(val: string) => this._selectLoaiCongTrinh(val)}
									filterOption={(input, option) =>
										option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
								</Select>
							</Form.Item>
							{/* <Form.Item label='Tên bộ phận' name='tenBoPhan' >
								<Input />
							</Form.Item> */}
						</Form>
						<List
							className="demo-loadmore-list"
							size="small"
							loading={this.state.initLoading}
							itemLayout="horizontal"
							bordered={true}
							dataSource={this.state.lstMauKhoiLuong}
							renderItem={item => (
								<List.Item>
									<Skeleton avatar title={false} loading={item.loading} active>
										<List.Item.Meta
											title={item.label}
										/>
										<Button type="primary" shape="circle" size="small" onClick={e => this._mcvClick(item.value)} icon={<PlusOutlined />} />
									</Skeleton>
								</List.Item>
							)}
						/>
					</TabPane>
					<TabPane tab="Tra định mức" key="3">
						<Form ref={formRef} onFinish={this._onFinish} onValuesChange={values => this._frmTraDinhMucChange(values)}>
							<Form.Item label='Khu vực' name='khuVuc' initialValue={this.state.khuVuc}>
								<Select
									showSearch
									options={this.state.lstKV}
									placeholder="Chọn khu vực"
									optionFilterProp="children"
									onSelect={(val: string) => this._selectKhuvuc(val)}
									filterOption={(input, option) =>
										option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
								</Select>
							</Form.Item>
							<Form.Item label='Đơn giá' name='donGia' initialValue={this.state.donGia}>
								<Select
									showSearch
									mode="multiple"
									options={this.state.lstDM}
									placeholder="Chọn đơn giá"
									optionFilterProp="children"
									onSelect={(val: string) => this._selectDinhMuc(val)}
									filterOption={(input, option) =>
										option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
								</Select>
							</Form.Item>
							<Form.Item label='Tìm kiếm' name='search' >
								<Search placeholder="Tìm kiếm mã hiệu, công tác" onSearch={value => this._searchDonGia(value)} enterButton />
							</Form.Item>
						</Form>
						<Table
							onRow={(record, rowIndex) => {
								return {
									onClick: event => {
										this._dmClick(record.MHDM)
									}, // click row
								};
							}}
							columns={columns}
							dataSource={this.state.congTac} />
					</TabPane>
				</Tabs>
			</section>
		);
	}
};

const EXCHANGE_RATES = gql`
      query {
        hello (test: String)
      }
`;

function Home() {
	const { loading, error, data } = useQuery(EXCHANGE_RATES, {variables: {test: 'hel!!!'}});
	return (
	  <div>
		<h2>{JSON.stringify(data)}</h2>
	  </div>
	);
  }
export default TienLuong