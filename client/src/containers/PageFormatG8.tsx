import React, { Component } from "react";
import { Form, Button, Checkbox } from 'antd';
// import { addressTypes } from "../api/types";
import { ws } from "../api/nvExcel";
import {
	BANG_CONG_TRINH,
	BANG_TONG_HOP_VAT_TU,
	BANG_HAO_PHI_VAT_TU,
	// HAO_PHI_VAT_TU_NAME,
	GIA_THANG_G8,
	CHIET_TINH_G8,
	DU_THAU_G8,
	GIA_TONG_HOP_G8,
	// GIA_CHI_TIET_G8
} from "../constants/named";

export interface AppProps {
}
export interface AppStates {
	pageSize: string;
	orientation: string;
	autoInit: boolean;
	blackAndWhite: boolean;
	isSetFont: boolean;
}

export interface orientationOptions {
	key: string,
	text: string,
	value: Excel.PageOrientation
}
export class PageFormatG8 extends Component<AppProps, AppStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			pageSize: 'a3',
			orientation: 'portrait',
			autoInit: false,
			blackAndWhite: true,
			isSetFont: false
		}
	}
	_formatPage = async () => {
		console.log(ws);
		await ws?.currentWs(BANG_CONG_TRINH)
		console.log(ws);
	}
	async _formatCongTrinh() {
		await ws?.currentWs(BANG_CONG_TRINH).then(async x => {
			await ws?.setFont('Times New Roman');
		})

		// const vals = await ws?.getValues(`D1:D${ws.lastRow.row}`);
		// vals?.forEach((e, i) => {
		// 	if (e[0] === 'T*') {
		// 		ws!.ws!.getRange(`D${i+1}`).format.rowHeight = 0;
		// 	}
		// })
		ws?.mergeCells('A1:Z1');
		ws?.mergeCells('A2:Z2');
		ws?.mergeCells('A3:Z3');
		ws?.rowsHeight('A3', 0);
		await ws?.getValues('A1:A2');
		ws?.setPrintArea('A:X');
		ws?.setBlackAndWhite();
		ws?.setPaperType('a4');
		ws?.setOrientation('landscape');
		ws?.setPageZoom(1);
		ws?.setPageMargin(50, 40, 40, 40);
		ws?.setCenter(true);
	}
	async _formatTongHopVatTu() {
		await ws?.currentWs(BANG_TONG_HOP_VAT_TU).then(async x => {
			await ws?.setFont('Times New Roman');
			await ws?.setPrintArea('A:P');
			await ws?.setBlackAndWhite();
			await ws?.setPaperType('a4');
			await ws?.setOrientation('portrait');
			await ws?.setPageZoom(1);
			await ws?.setPageMargin(49, 40, 50, 40);
			await ws?.setCenter(true);
			await ws?.colWidth('B', 0);
			await ws?.colWidth('J', 0);
			await ws?.colWidth('E', 76);
			await ws?.colWidth('O', 76);
			await ws?.colWidth('P', 76);
			await ws?.rowsHeight(`A1:A3`, 18);
			const lastRow = await ws.getLastRow();
			console.log(lastRow);
		})

		// ws?.autoRowsHeight(`A5:A${ws.lastRow.row}`);
		// ws?.verCenter(`A4:P${ws.lastRow.row}`);
		// ws?.unmergeCells('A3:R3');
		// const vals = await ws?.getValues(`A1:P${ws.lastRow.row}`);
		// await ws?.sheetSlice(vals, HAO_PHI_VAT_TU_NAME)
		// await ws?.moveRange('A3', 'U3');
		// await ws?.moveRange('A4:R4', 'A3:R3');
	}
	async _formatHaoPhiVatTu() {
		await ws?.currentWs(BANG_HAO_PHI_VAT_TU);
		ws?.setPrintArea('A:P');
		ws?.setFont('Times New Roman');
		ws?.setBlackAndWhite();
		ws?.setPaperType('a4');
		ws?.setOrientation('portrait');
		ws?.setPageZoom(1);
		ws?.setPageMargin(49, 40, 50, 40);
		ws?.setCenter(true);
		ws?.colWidth('B', 0);
		ws?.colWidth('J', 0);
		ws?.colWidth('E', 86)
		ws?.colWidth('O', 86)
		ws?.colWidth('P', 86)
		ws?.rowsHeight(`A1:A${ws.lastRow.row}`, 18)
		ws?.verCenter(`A4:P${ws.lastRow.row}`)
	}
	async _formatGiaThang() {
		await ws?.currentWs(GIA_THANG_G8).then(async x => {
			await ws?.setFont('Times New Roman');
			await ws?.setPrintArea('A:K');
			await ws?.setBlackAndWhite();
			await ws?.setPaperType('a4');
			await ws?.setOrientation('portrait');
			await ws?.setPageZoom(1);
			await ws?.setPageMargin(49, 40, 50, 40);
			await ws.setWrapText('A:K')
			await ws.autoRowsHeight('A:K')
			await ws?.setCenter(true);
			await ws?.colWidth('C', 176);
			await ws?.colWidth('E', 0);
			await ws?.colWidth('G', 0);
			await ws?.colWidth('H', 0);
			await ws?.colWidth('I', 0);
			await ws?.colWidth('J', 0);
			await ws?.rowsHeight(`A1:A3`, 18);
			const lastRow = await ws.getLastRow();
			console.log(lastRow);
		})
	}
	async _formatChietTinh() {
		await ws?.currentWs(CHIET_TINH_G8).then(async x => {
			await ws?.setFont('Times New Roman');
			await ws?.setPrintArea('A:H');
			await ws?.setBlackAndWhite();
			await ws?.setPaperType('a4');
			await ws?.setOrientation('portrait');
			await ws?.setPageZoom(1);
			await ws?.setPageMargin(49, 40, 50, 40);
			await ws.setWrapText('A:H')
			await ws.autoRowsHeight('A:H')
			await ws?.setCenter(true);
			const lastRow = await ws.getLastRow();
			console.log(lastRow);
		})
	}
	async _formatDuThau() {
		await ws?.currentWs(DU_THAU_G8).then(async x => {
			await ws?.setFont('Times New Roman');
			await ws?.setPrintArea('A:J');
			await ws?.setBlackAndWhite();
			await ws?.setPaperType('a4');
			await ws?.setOrientation('portrait');
			await ws?.setPageZoom(1);
			await ws?.setPageMargin(49, 40, 50, 40);
			await ws.setWrapText('A:J')
			// await ws.autoRowsHeight('A:J')
			await ws?.setCenter(true);
			const lastRow = await ws.getLastRow();
			console.log(lastRow);
		})
	}
	async _formatGiaTongHop() {
		await ws.currentWs(GIA_TONG_HOP_G8);
		await ws?.setFont('Times New Roman');
		await ws?.setPrintArea('A:K');
		await ws?.setPaperType('a4');
		ws?.setOrientation('landscape');
		ws?.setPageZoom(1);
		ws?.setPageMargin(50, 40, 40, 40);
		ws.colWidth('F', 76);
		ws.colWidth('G', 76);
		ws.colWidth('H', 76);
		ws.colWidth('I', 76);
		ws.colWidth('J', 76);
		ws.colWidth('K', 76);
		await ws?.setCenter(true);
	}
	render() {
		const { Item } = Form
		return (
			<section>
				<Form
					layout="horizontal"
				>
					<Item><Button onClick={this._formatPage} type="primary" >Bảng dự toán hạng mục công trình</Button></Item>
					<Item><Button onClick={this._formatCongTrinh} type="primary" >Bảng công trình</Button></Item>
					<Item><Button onClick={this._formatGiaTongHop} type="primary" >Bảng giá tổng hợp</Button></Item>
					<Item><Button onClick={this._formatCongTrinh} type="primary" >Bảng đơn giá chi tiết</Button></Item>
					<Item><Button onClick={this._formatCongTrinh} type="primary" >Bảng hao phí vật tư</Button></Item>
					<Item><Button onClick={this._formatTongHopVatTu} type="primary" >Bảng tổng hợp vật tư</Button></Item>
					<Item><Button onClick={this._formatHaoPhiVatTu} type="primary" >Bảng hao phí vật tư</Button></Item>
					<Item><Button onClick={this._formatGiaThang} type="primary" >Bảng giá tháng</Button></Item>
					<Item><Button onClick={this._formatChietTinh} type="primary" >Bảng chiết tính</Button></Item>
					<Item><Button onClick={this._formatDuThau} type="primary" >Bảng dự thầu</Button></Item>
					<Item><Checkbox checked={this.state.isSetFont} onChange={() => this.setState({ isSetFont: !this.state.isSetFont })} >Ẩn cột vật tư trong bảng công trình</Checkbox></Item>
				</Form>
			</section>
		);
	}
};
export default PageFormatG8