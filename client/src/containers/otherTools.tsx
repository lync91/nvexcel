import React, { Component } from "react";
import { Input, Button, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ws } from "../api/nvExcel";
import { columnIndex } from "../api/lib";
// import {
// 	BANG_CONG_TRINH,
// 	BANG_TONG_HOP_VAT_TU,
// 	BANG_HAO_PHI_VAT_TU,
// 	HAO_PHI_VAT_TU_NAME
// } from "../constants/named";

const formRef = React.createRef<FormInstance>();


export interface AppProps {
}
export interface AppStates {
	cotSTT: string,
	cotSoBanVe: string,
	cotMaHieu: string,
	cotTenCongTac: string,
	cotDonVi: string,
	cotKhoiLuong: string,
	dongBatDau: string
}

export interface orientationOptions {
	key: string,
	text: string,
	value: Excel.PageOrientation
}
export class OtherTools extends Component<AppProps, AppStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			cotSTT: 'A',
			cotSoBanVe: 'C',
			cotMaHieu: 'C',
			cotTenCongTac: 'D',
			cotDonVi: 'E',
			cotKhoiLuong: 'J',
			dongBatDau: '6'
		}
	}
	async _formatPage() {
		const values: any = formRef.current?.getFieldsValue();
		await ws.getActive();
		const lastRow = await ws.getLastRow();
		const sourceName = await ws.getActivedSheetName();
		const addr = `A4:${values.cotKhoiLuong}${lastRow.cell1.row}`;
		console.log(addr);
		
		const wsValues: any[][] = await ws?.getValues(addr);
		await ws?.addSheet('Test');
		const cotSTTIndex = columnIndex(values.cotSTT);
		// const cotSoBanVeIndex = columnIndex(values.cotSoBanVe);
		// const cotMaHieuIndex = columnIndex(values.cotMaHieu);
		// const cotTenCongTacIndex = columnIndex(values.cotTenCongTac);
		// const cotDonViIndex = columnIndex(values.cotDonVi);
		// const cotKhoiLuongIndex = columnIndex(values.cotKhoiLuong);
		const klFomulas = wsValues.map((item, index) => {
			const sttVal = item[cotSTTIndex - 1];
			const stt = `='${sourceName}'!${values.cotSTT}${Number(values.dongBatDau) + index}`;
			const sobanve = `='${sourceName}'!${values.cotSoBanVe}${Number(values.dongBatDau) + index}`
			const mahieu = sttVal === '*' ? '*' : '';
			const tencongtac = `='${sourceName}'!${values.cotTenCongTac}${Number(values.dongBatDau) + index}`
			const donvi = `='${sourceName}'!${values.cotDonVi}${Number(values.dongBatDau) + index}`
			const khoiluong = `='${sourceName}'!${values.cotKhoiLuong}${Number(values.dongBatDau) + index}`
			return [stt, sobanve, mahieu, tencongtac, donvi, khoiluong]
		});
		await ws?.currentWs('Test');
		await ws?.addValues(`A1:F${klFomulas?.length}`, klFomulas!);
		
	}
	render() {
		const { Item } = Form
		return (
			<section>
				<Form ref={formRef}>
					<Item label="Cột STT" name="cotSTT" initialValue={this.state.cotSTT}><Input /></Item>
					<Item label="Cột số bản vẽ" name="cotSoBanVe" initialValue={this.state.cotSoBanVe} ><Input /></Item>
					<Item label="Cột mã hiệu" name="cotMaHieu" initialValue={this.state.cotMaHieu} ><Input /></Item>
					<Item label="Cột tên công tác" name="cotTenCongTac" initialValue={this.state.cotTenCongTac}><Input /></Item>
					<Item label="Cột đơn vị" name="cotDonVi" initialValue={this.state.cotDonVi}><Input /></Item>
					<Item label="Cột khối lượng" name="cotKhoiLuong" initialValue={this.state.cotKhoiLuong}><Input /></Item>
					<Item label="Dòng bắt đầu" name="dongBatDau" initialValue={this.state.dongBatDau}><Input /></Item>
				</Form>
				<Button onClick={this._formatPage} type="primary" className="m-b-5" >Tạo bảng công trình G8</Button>
			</section>
		);
	}
};
export default OtherTools