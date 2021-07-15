import React, { Component } from "react";
import {
	Select,
	Form,
	Button,
	Tabs,
	AutoComplete,
	Empty,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ws } from "../api/nvExcel";
import {
	DON_GIA_NAME
} from "../constants/named";
import { MAU_BANG_TRA_OBJECT } from "../constants/values";
import { listCP } from "../constants/templates";

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
	listCP: any[];
	sheetHeader: any[];
}

export interface orientationOptions {
	key: string,
	text: string,
	value: Excel.PageOrientation
}
export class MauBangTra extends Component<AppProps, AppStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			wsExits: false,
			pageSize: 'a3',
			orientation: 'portrait',
			autoInit: false,
			blackAndWhite: true,
			isSetFont: false,
			listCP: [],
			sheetHeader: []
		}
	}

	async prepair() {

	}

	componentDidMount() {
		this.setState({
			listCP: listCP.map((e: any) => {
				e.value = e.key;
				e.label = e.tencp;
				return e
			})
		})
		formRef.current?.setFieldsValue({ vanBanCanCu: 'TT 09/2019/TT-BXD' });
		this.setState({ sheetHeader: MAU_BANG_TRA_OBJECT.contents });
	}
	_taoTaoMauBangTra = async () => {
		await ws.newSheetfromObject(MAU_BANG_TRA_OBJECT);
		this.setState({ wsExits: true });
		this.setState({ sheetHeader: MAU_BANG_TRA_OBJECT.contents });
	}

	async _onFinish(values: any) {
		await ws.currentWs(MAU_BANG_TRA_OBJECT.name);
		const lastRow = await ws.getLastRow('B:B');
		const lastCol = await ws.getLastCol('A4:AZ4');
		console.log('lastRow', lastRow);
		console.log('lastCol', lastCol);
		
	}

	_daoNguocBangTra = async () => {
		await ws.getActive();
		const addr = await ws.getSelectedAddress();
		const values = await ws.getSelectedFormulas();
		let newValues = values.reverse();
		console.log(newValues);
		newValues.forEach(e => {
			console.log(e);
			
		})
		await ws.addValues(addr.text, newValues);
		
	}

	async _selectLoaiCP(value: any, item: any) {
		const contents = await this.state.sheetHeader.concat([{ range: [{ values: [item.label], bold: true, height: 22, vCenter: true, }] }]).concat(item.template);
		MAU_BANG_TRA_OBJECT.contents = contents;
		await ws.delete(MAU_BANG_TRA_OBJECT.name)
		.then(async x => await ws.newSheetfromObject(MAU_BANG_TRA_OBJECT));
	}

	_frmTraDinhMucChange(values: any) {
		if (values.donGia) ws.updateProjectInfo(DON_GIA_NAME, values.donGia);
	}

	render() {
		const { TabPane } = Tabs;
		return (
			<section>
				<div hidden={!this.state.wsExits} style={{ margin: 'auto' }}>
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
								Chưa có Sheet Thổng hợp chi phí
							</span>
						}
					>
						<Button type="primary" onClick={this._taoTaoMauBangTra}>Khởi tạo</Button>
					</Empty>
				</div>
				<Tabs hidden={this.state.wsExits} defaultActiveKey="1">
					<TabPane tab="Menu" key="1">
						<Form ref={formRef} onFinish={this._onFinish}>
							<Form.Item label='Văn bản căn cứ' name='vanBanCanCu'>
								<AutoComplete />
							</Form.Item>
							<Form.Item label='Loại chi phí' name='loaiCongTrinh'>
								<Select
									showSearch
									options={this.state.listCP}
									placeholder="Chọn loại công trình"
									optionFilterProp="children"
									onSelect={(val: string, item: any) => this._selectLoaiCP(val, item)}
									filterOption={(input, option) =>
										option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
								</Select>
							</Form.Item>
							<Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
								<Button type="primary" onClick={this._onFinish}>
									Lưu
								</Button>
							</Form.Item>
							<Form.Item style={{ paddingTop: 4, paddingBottom: 4 }}>
								<Button type="primary" onClick={this._daoNguocBangTra}>
									Đảo ngược bảng tra
								</Button>
							</Form.Item>
						</Form>
					</TabPane>
					<TabPane tab="Thư viện" key="2">

					</TabPane>
					<TabPane tab="Tra định mức" key="3">

					</TabPane>
				</Tabs>
			</section>
		);
	}
};
export default MauBangTra