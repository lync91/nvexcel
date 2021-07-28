import { AsyncConstructor } from 'async-constructor';
import { reduce } from "async";
import { getPageType, getOrientationType } from "./mapIndex";
// import { ws, ee } from './nvExcel';
import { HAO_PHI_VAT_TU_NAME, TIEN_LUONG_SHEET_NAME } from '../constants/named';
import { sheetMap } from "../constants/map";
import { sheetChanged, onActivate, onSelectionChanged } from "./wsEvents"
// import { WORKSHEET_SELECTION_CHANGED } from "../constants/eventName";
import { toLetter, addrParser, columnIndex } from "./lib";
import { addressTypes } from "./types";

export class addressObj {
	sheet!: string;
	text!: string;
	cell1: addressTypes = {
		text: null,
		col: null,
		row: null
	};
	cell2: addressTypes = {
		text: null,
		col: null,
		row: null
	}
	constructor(txt: string | undefined) {
		if (txt) {
			this.text = txt.replace(/(([^!]+)?)!/g, '');
			const t = this.text.split(":")
			this.cell1.text = t[0];
			this.cell1.col = t[0].replace(/([0-9])+/g, "");
			this.cell1.row = parseInt(t[0].replace(/([A-Z]|[a-z])+/g, ""));
			if (t[1]) {
				this.cell2.text = t[1];
				this.cell2.col = t[1].replace(/([0-9])+/g, "");
				this.cell2.row = parseInt(t[1].replace(/([A-Z]|[a-z])+/g, ""));
			}
		}
	}
}


export interface getLastColTypes {
	wsName?: string | null;
	name?: string | null;
}
export class wsObject extends AsyncConstructor {
	ws!: Excel.Worksheet;
	private context!: Excel.RequestContext;
	name: string | null = null;
	lastCol!: addressTypes;
	lastRow!: addressTypes;
	selectedRange!: string;
	sheetMap: any;
	projectInfo: any = {};
	constructor(wsName: string | null = null) {
		super(async () => {
			this.name = wsName;
			this.sheetMap = new sheetMap();
			try {
				await Excel.run(async (context: Excel.RequestContext) => {
					this.context = context
				})
			} catch (error) {
				console.log(error);
			}
			this.getProjectInfo();
			this.getActive();
		})
	}
	initContext() {
		const promise = new Promise(async (res, rej) => {
			try {
				await Excel.run(async (context: Excel.RequestContext) => {
					res(context);
				})
			} catch (error) {
				console.log(error);
			}
		})
		return promise
	}
	async regEvents() {
		let sheets = this.context?.workbook.worksheets;
		sheets?.onActivated.add(onActivate);
		sheets?.onSelectionChanged.add(onSelectionChanged)
		sheets?.onChanged.add(sheetChanged);
		console.log("A handler has been registered for the OnActivate event.");
	}
	async currentWs(name: string) {
		this.name = name;
		this.ws = this.context!.workbook.worksheets.getItemOrNullObject(name!)
		await this.ws.load('id, name');
		return this.context.sync();
	}
	async getActive() {
		this.ws = await this.context!.workbook.worksheets.getActiveWorksheet();
		this.ws?.load('name');
		return await this.context!.sync();
	}

	async checkWsExits(name: string) {
		const ws = this.context!.workbook.worksheets.getItemOrNullObject(name);
		ws.load('name')
		await this.context!.sync();
		return name === ws.name ? true : false
	}

	async getActivedSheetName() {
		const ws = this.context!.workbook.worksheets.getActiveWorksheet()
		ws!.load('name')
		await this.context?.sync();
		return ws.name
	}

	async create() {
		try {
			await Excel.run(async context => {
				this.ws = context.workbook.worksheets.add(this.name!);
				this.ws.activate();
			})
		} catch (error) {
			console.log(error);

		}
	}
	async activate() {
		this.ws?.activate();
		return await this.context.sync();
	}
	async getValues(address: string) {
		const rg = this.ws?.getRange(address);
		rg?.load('values');
		await this.context?.sync();
		return rg?.values;
	}
	async getFomulas(address: string) {
		const rg = this.ws?.getRange(address);
		rg?.load('formulasR1C1');
		await this.context?.sync();
		return rg?.formulasR1C1;
	}
	async addValues(address: string, values: any[][]) {
		const rg = this.ws?.getRange(address);
		rg!.values = values;
		await this.context.sync();
	}
	async setPrintAreabySelected() {
		const rg = this.context.workbook.getSelectedRange();
		rg.load('address')
		await this.context.sync();
		this.ws?.pageLayout.setPrintArea(rg.address)
	}
	autoSetPrintArea() {
		this.ws?.pageLayout.setPrintArea("A:" + this.lastCol.col)
	}
	async setPrintArea(address: string) {
		return await this.ws?.pageLayout.setPrintArea(address)
	}
	async setFont(fontName: string, address: string | undefined = undefined) {
		console.log('set Font');
		console.log(fontName);
		
		const addr = address ? address : 'A:Z';
		const rg = await this.ws!.getRange(addr)
		rg.format.font.name = fontName;
		return await this.context.sync();
	}
	async setFill(address: string, color: string) {
		this.ws!.getRange(address).format.fill.color = color;
	}
	setBlackAndWhite() {
		this.ws!.pageLayout.blackAndWhite = true;
	}
	setPageMargin(top: number, bottom: number, left: number, right: number) {
		this.ws!.pageLayout.topMargin = top;
		this.ws!.pageLayout.bottomMargin = bottom;
		this.ws!.pageLayout.leftMargin = left;
		this.ws!.pageLayout.rightMargin = right;
	}
	async setPaperType(paperType: any) {
		this.ws!.pageLayout.paperSize = getPageType(paperType);
		return await this.context.sync();	
	}
	setOrientation(ori: string) {
		this.ws!.pageLayout.orientation = getOrientationType(ori)
	}
	setCenter(hor: boolean = false, ver: boolean = false) {
		this.ws!.pageLayout.centerHorizontally = hor;
		this.ws!.pageLayout.centerVertically = ver;
	}
	setPageZoom(hoz: number = 0, ver: number = 0) {
		if (hoz !== 0) this.ws!.pageLayout.zoom = { horizontalFitToPages: 1 };
		if (ver !== 0) this.ws!.pageLayout.zoom = { verticalFitToPages: 1 };
	}
	async colWidth(col: string, w: number) {
		this.ws!.getRange(`${col}1`).format.columnWidth = w;
		return await this.context.sync();
	}
	autoColWidth(col: string) {
		this.ws!.getRange(`${col}:${col}`).format.autofitColumns();
	}
	autoRowsHeight(address: string) {
		this.ws!.getRange(address).format.autofitRows();
	}
	rowsHeight(address: string, h: number) {
		this.ws!.getRange(address).format.rowHeight = h;
	}
	mergeCells(address: string) {
		this.ws?.getRange(address).merge();
	}
	verCenter(address: string) {
		this.ws!.getRange(address)!.format.verticalAlignment = 'Center'
	}
	horCenter(address: string) {
		this.ws!.getRange(address)!.format.horizontalAlignment = 'Center'
	}
	setBold(address: string) {
		this.ws!.getRange(address)!.format.font.bold = true
	}
	setWrapText(address: string) {
		this.ws!.getRange(address)!.format.wrapText = true
	}
	setColor(address: string, color: string) {
		this.ws!.getRange(address)!.format.font.color = color
	}
	unmergeCells(address: string) {
		this.ws!.getRange(address).unmerge();
	}
	rangeValidation(address: string, data: any) {
		const rg = this.ws?.getRange(address)
		rg.dataValidation.clear();
		if (data.list) {
			const src = this.ws.getRange(data.list);
			rg.dataValidation.rule = {
				list: {
					inCellDropDown: true,
					source: src
				}
			}
		}
	}
	async setBorder(address: string) {
		const rg = this.ws.getRange(address);
		rg.format.borders.getItem('InsideHorizontal').style = 'Continuous';
		rg.format.borders.getItem('InsideVertical').style = 'Continuous';
		rg.format.borders.getItem('EdgeBottom').style = 'Continuous';
		rg.format.borders.getItem('EdgeLeft').style = 'Continuous';
		rg.format.borders.getItem('EdgeRight').style = 'Continuous';
		rg.format.borders.getItem('EdgeTop').style = 'Continuous';
		await this.context.sync();
	}
	async moveRange(from: string, to: string) {
		const rg = this.ws!.getRange(from);
		rg.load('values');
		await this.context?.sync();
		this.ws!.getRange(to).values = rg.values;

	}
	async sheetSlice(values: any, tbName: string) {
		let valuesMap: any[] = [];
		await values.forEach((e: any[], i: number) => {
			if (e[0] === HAO_PHI_VAT_TU_NAME) {
				valuesMap.push(i)
			}
		});
		valuesMap.forEach(async (e, i) => {
			const sheets = this.context!.workbook.worksheets;
			sheets.add();
		})

	}
	async addSheet(name: string) {
		const sh = this.context?.workbook.worksheets.add(name);
		sh.load('id')
		await this.context.sync();
		return sh.id;
	}
	async getSelectedValues() {
		const rg = this.context?.workbook.getSelectedRange();
		rg?.load('values');
		await this.context?.sync();
		return rg?.values;
	}
	async getSelectedFormulas() {
		const rg = this.context?.workbook.getSelectedRange();
		rg?.load('formulas');
		await this.context?.sync();
		return rg?.formulas;
	}
	async getSelectedAddress() {
		const rg = this.context?.workbook.getSelectedRange();
		rg?.load('address');
		await this.context?.sync();
		return new addressObj(rg?.address);
	}
	async save() { }
	async setCustomConditionalFormat(address: string, formula: string, color: string | null, bold: boolean, italic: boolean, border: boolean) {
		const rg = this.ws?.getRange(address);
		const conditionalFormat = rg?.conditionalFormats.add(Excel.ConditionalFormatType.custom);
		conditionalFormat!.custom.rule.formula = formula;
		if (color) conditionalFormat!.custom.format.font.color = color;
		conditionalFormat!.custom.format.font.bold = bold;
		conditionalFormat!.custom.format.font.italic = italic;
		if (border) {
			conditionalFormat!.custom.format.borders.getItem('EdgeBottom').style = 'Continuous';
			conditionalFormat!.custom.format.borders.getItem('EdgeLeft').style = 'Continuous';
			conditionalFormat!.custom.format.borders.getItem('EdgeRight').style = 'Continuous';
			conditionalFormat!.custom.format.borders.getItem('EdgeTop').style = 'Continuous';
		}

	}
	
	async createTable(address: string, name: string, values: string[][] | null) {
		const expensesTable = this.ws!.tables.add(address, true /*hasHeaders*/);
		expensesTable.name = name;
		if (values) expensesTable.rows.add(undefined, values)
	}

	async delete(name: string) {
		const sh = this.context?.workbook.worksheets.getItemOrNullObject(name);
		sh.load('name')
		sh.delete();
		return await this.context?.sync();
	}

	async getLastRow(addr: string | null = null) {
		const _addr = addr? addr : 'A:ZZ'
		const rangeA = this.ws?.getRange(_addr);
		const lastRow = rangeA?.find("*", {
			completeMatch: true, // find will match the whole cell value
			matchCase: false, // find will not match case
			searchDirection: Excel.SearchDirection.backwards // find will start searching at the beginning of the range
		})
		lastRow?.load('address');
		await this.context?.sync();
		return new addressObj(lastRow?.address);
	}

	async getLastCol(address: string | null = null) {
		const rangeA = this.ws?.getRange(address? address : 'A1:ZZ100');
		const lastCol = rangeA?.find("*", {
			completeMatch: true, // find will match the whole cell value
			matchCase: false, // find will not match case
			searchDirection: Excel.SearchDirection.backwards // find will start searching at the beginning of the range
		})
		lastCol?.load('address');
		await this.context?.sync();
		return new addressObj(lastCol?.address);
	}

	async clearValues(address: string) {
		try {
			this.ws?.getRange(address).clear('Contents');
		} catch (error) {
			console.log(error);

		}
	}

	async clearAll(address: string) {
		try {
			this.ws?.getRange(address).clear('All');
			return this.context.sync();
		} catch (error) {
			console.log(error);

		}
	}

	async clearFormats(address: string) {
		try {
			this.ws?.getRange(address).clear('Formats');
			return this.context.sync();
		} catch (error) {
			console.log(error);

		}
	}

	async insertRange(address: string) {
		const rg = this.ws?.getRange(address)
		rg.insert(Excel.InsertShiftDirection.down);
		await this.context.sync();
	}

	async setPropeties() {
		var docProperties = this.context.workbook.properties.custom;
		docProperties.add(TIEN_LUONG_SHEET_NAME, 'hello');
		return this.context.sync();

	}

	async getPropeties() {
		var docProperties = this.context.workbook.properties.custom;
		const customProperty = docProperties.getItemOrNullObject(TIEN_LUONG_SHEET_NAME)
		customProperty.load("key, value")
		await this.context.sync();
		return customProperty;
	}

	async updateProjectInfo(key: string, value: any) {
		this.projectInfo[key] = value;
		var docProperties = this.context.workbook.properties.custom;
		docProperties.add('ProjectInfo', JSON.stringify(this.projectInfo));
		return this.context.sync();
	}

	async getProjectInfo() {
		var docProperties = this.context.workbook.properties.custom;
		const customProperty = docProperties.getItemOrNullObject('ProjectInfo')
		customProperty.load("key, value")
		await this.context.sync();
		if (customProperty.value) {
			this.projectInfo = JSON.parse(customProperty.value)
			console.log(this.projectInfo);
			return this;
		}
	}

	async getRangeName() {
		const names = this.ws.names.load();
		await this.context.sync();
		return names;
	}

	async setRangeName(address: string, name: string) {
		const rg = this.ws.getRange(address)
		this.ws.names.add(name, rg)
		return await this.context.sync()
	}

	valuesParser(values: any[]) {
		let res = values.map(e => {
			if (!Array.isArray(e)) {
				const collen = e.colSpan ? e.colSpan.reduce((a: number, b: number) => { return a + b }) : 0
				return e.values.concat(Array(collen > e.values.length ? collen - e.values.length : 0))
			} else {
				return e
			}
		})
		const lmax = res.map(e => { return e.length }).reduce((a, b) => { return Math.max(a, b) })
		console.log('lmax', lmax);
		let _res = res.map((e: any[]) => { e.length < lmax ? e = e.concat(Array(lmax - e.length)) : e = e; return e })
		return _res
	}

	valuesFormatter(addr: string, values: any[]) {
		const addr1 = new addressObj(addr);
		values.forEach(async (e, i) => {
			if (!Array.isArray(e)) {
				const startColNum = columnIndex(addr1.cell1.text!)
				const endColNum = startColNum + e.values.length - 1;
				const address = `${addr1.cell1.col}${addr1.cell1.row! + i}:${await toLetter(endColNum)}${addr1.cell1.row! + i}`;
				if (e.bold) this.setBold(address);
				if (e.height) this.rowsHeight(address, e.height);
				if (e.hCenter) this.horCenter(address);
				if (e.vCenter) this.verCenter(address);
				if (e.colSpan) {
					let pos = 0;
					e.colSpan.forEach((e: number) => {
						const colNum = startColNum + e + pos - 1
						const curAddress = `${toLetter(startColNum + pos)}${addr1.cell1.row! + i}:${toLetter(colNum)}${addr1.cell1.row! + i}`
						this.mergeCells(curAddress);
						pos = pos + e;
					});
				}
				if (e.fillColor) this.setFill(address, e.fillColor)
				if (e.Validation) {
					const addr = `${toLetter(startColNum + e.Validation.cell)}${addr1.cell1.row! + i}:${toLetter(startColNum + e.Validation.cell)}${addr1.cell1.row! + i}`
					this.rangeValidation(addr, e.Validation)
				}
				if (e.names) {
					console.log('OJK');
					
					e.names.forEach((e: any[]) => {
						const addr = `${toLetter(startColNum + e[0])}${addr1.cell1.row! + i}:${toLetter(startColNum + e[0])}${addr1.cell1.row! + i}`
						this.setRangeName(addr, e[1])
					});
				}
				if (e.wrapText) this.setWrapText(address)
				if (e.subScript) {
					this.ws.getRange(address).getCell(0, 0)
				}
			}
		})
	}

	async rangeHAlign(addr: string, align: string[], arr: any[][]) {
		const addr1 = new addressObj(addr);
		const startColNum = columnIndex(addr1.cell1.text!)
		align.forEach(async (e: string, i: number) => {
			const endColNum = startColNum + i;
			const address = `${await toLetter(endColNum)}${addr1.cell1.row!}:${await toLetter(endColNum)}${addr1.cell1.row! + arr.length - 1}`;
			if (e === 'Center') this.horCenter(address);

		})
	}
	
	async addValuesObj(e: any, index: number) {
		let colLetter = 'A';
		let res: any[][] = await this.valuesParser(e.range);
		if (e.range) {
			const addr = e.addr ? await addrParser(e.addr, res) : await addrParser(`${colLetter}${index}`, res);
			await this.addValues(addr, res)
			await this.valuesFormatter(addr, e.range)
			if (e.font) this.setFont(e.font, addr)
			if (e.border) this.setBorder(addr)
			if (e.hAlign) this.rangeHAlign(addr, e.hAlign, res)
			if (e.color) this.setColor(addr, e.color)
			if (e.colWidth) this.colWidths(e.colWidth, addr)
		}
	}
	async sheetContents(contents: any[]) {
		reduce(contents, 1, (d, e, cb) => {
			console.log(e);
			this.addValuesObj(e, d!)
			cb(null, d! + e.range.length)
		});
	}
	async colWidths(lst: number[], startAddr: string | null = null) {
		if (!startAddr) {
			lst.forEach((e: number, i: number) => {
				this.colWidth(toLetter(i + 1)!, e)
			})
		} else {
			console.log('OK');
			const addr1 = new addressObj(startAddr);
			const startColNum = columnIndex(addr1.cell1.text!)
			lst.map(async (e: number, i: number) => {
				const colNum = startColNum + i
				return await this.colWidth(toLetter(colNum), e);
			});
		}
	}
	async setConditionalFormats (conds: any[]) {
		conds.map((e, i) => this.setCustomConditionalFormat(e.address, e.formula, e.color, e.bold, e.italic, e.border));
	}
	async newSheetfromObject(obj: any) {
		console.log('OBJECT', obj);
		if (obj.name) {
			const shId = await this.addSheet(obj.name)
			await this.currentWs(obj.name).then(async () => {
				if (obj.contents) {
					await this.sheetContents(obj.contents)
				}
				if (obj.printArea) this.setPrintArea(obj.printArea)
				if (obj.pageSize) this.setPaperType(obj.pageSize)
				if (obj.orientation) this.setOrientation(obj.orientation)
				if (obj.defaultConditionalFormat) this.setConditionalFormats(obj.defaultConditionalFormat)
				if (obj.font) this.setFont(obj.font, obj.printArea ? obj.printArea : 'A:Z');
			})
			this.activate();
			this.updateProjectInfo(obj.name, shId);
		}
		if (obj.colwidth) {
			this.colWidths(obj.colwidth)
		}
	}
}