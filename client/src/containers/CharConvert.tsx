import React, { Component } from "react";
import { Form, Button, Select } from "antd";
import { FormInstance } from 'antd/lib/form';
import { ws } from "../api/nvExcel";
// import { addressTypes } from "../api/types";
// import { addressObj } from "../api/Eutils";
// import { connect } from "react-redux";
// import { CHANGE_SRC_KEY, CHANGE_DESC_KEY } from "../constants/actions";
import {convertTo} from "../api/vietuni_vn";

const formRef = React.createRef<FormInstance>();

export interface HeaderProps {
	title: string;
	logo: string;
	message: string;
}

export interface AppProps {
}

export interface AppStates {
    srcKey: string;
	descKey: string;
}

const options: any[] = [
	{ value: "UNICODE", label: "UNICODE" },
	{ value: "Unicode to hop", label: "Unicode to hop" },
	{ value: "UTF-8", label: "UTF-8" },
	{ value: "&#Unicode;", label: "&#Unicode;" },
	{ value: "VNI-WIN", label: "VNI-WIN" },
	{ value: "TCVN-3", label: "TCVN-3" },
	{ value: "VISCII", label: "VISCII" },
	{ value: "VPS-Win", label: "VPS-Win" },
	{ value: "VIQR", label: "VIQR" }
];

export class CharConvert extends Component<AppProps, AppStates> {
	constructor(props: any) {
        super(props);
        this.state = {
            srcKey: "VNI-WIN",
            descKey: "UNICODE"
        }
	}
	componentWillMount() {
	}
	_convertTo = async () => {
		await ws.getActive().then(async x => {
			const lastRow = await ws.getLastRow();
			// const lastCol = await ws.getLastRow();
			const addr = `A1:AZ${lastRow.cell1.row}`;
			const values: any[][] = await ws.getFomulas(addr);
			const text: string = convertTo(JSON.stringify(values), this.state.srcKey, this.state.descKey);
			const res: any[][] = JSON.parse(text)
			await ws.addValues(addr, res);
			// this._convertAndAdd(values, addr)
			const src = this.state.srcKey;
			const desc = this.state.descKey;
			formRef.current?.setFieldsValue({
				srcKey: desc,
				descKey: src
			});
			this.setState({
				srcKey: desc,
				descKey: src
			})
		});
	}
	_convertSelectedTo = async () => {
		await ws.getActive().then(async x => {
			const addr = await ws.getSelectedAddress();
			const lastRow = await ws.getLastRow(addr.text);
			const _addr = `${addr.cell1.col}${addr.cell1.row ? addr.cell1.row: 1}:${addr.cell2.col}${ addr.cell2.row? addr.cell2.row : lastRow.cell1.row}`;
			const values: any[][] = await ws.getFomulas(_addr);
			const text: string = convertTo(JSON.stringify(values), this.state.srcKey, this.state.descKey);
			const res: any[][] = JSON.parse(text);
			await ws.addValues(_addr, res);
		});
	}
	_convertAndAdd = async (values: string[][], addr: string) => {
		const res: string[][] = values.map(e => {
			return e.map((e2: string) => {
				const str: string = e2.toString()
				const m = str? str.match(/=('\w*|\w*)/g) : null
				return m? str : convertTo(str, this.state.srcKey, this.state.descKey)
			})
		})
		await ws.addValues(addr, res);
	}
	render() {
		const {Item} = Form
		return (
			<section>
				<Form ref={formRef}>
					<Item label="Mã đang dùng" name="srcKey"><Select placeholder="Chọn mã đang dùng" options={options} defaultValue={this.state.srcKey} onSelect={(value: string) => this.setState({srcKey: value})}></Select></Item>
					<Item label="Mã chuyển sang" name="descKey"><Select placeholder="Chọn mã muốn chuyển" options={options} defaultValue={this.state.descKey} onSelect={(value: string) => this.setState({descKey: value})}></Select></Item>
				</Form>
				<Button onClick={this._convertSelectedTo} type="primary" className="m-b-5" >Chuyển mã vùng đã chọn</Button>
				<Button onClick={this._convertTo} type="primary" className="m-b-5">Chuyển mã toàn bộ</Button>
			</section>
		);
	}
}
// const mapStateToProps = (state: any) => {
// 	return {
// 		srcKey: state.charConverter.srcKey,
// 		descKey: state.charConverter.descKey
// 	}
// }
export default CharConvert