import { ws, ee } from './nvExcel';
import { addressObj } from './Eutils'
import { MAU_KHOI_LUONG_NAME, TIEN_LUONG_SHEET_NAME } from "../constants/named";
import { WORKSHEET_SELECTION_CHANGED } from "../constants/eventName";
import { isString } from 'util';
import { AUTO_STT_FOMULA } from "../constants/values";
import { evaluate } from "mathjs";
// import { EventEmitter } from "events";

export async function sheetChanged(event: any) {
    console.log(event);

    switch (ws.name) {
        case MAU_KHOI_LUONG_NAME:
            mklChanged(event)
            break;
        case TIEN_LUONG_SHEET_NAME:
            tlChanged(event)
            break;

        default:
            break;
    }
}
const mklChanged = (e: any) => {
    const addr = new addressObj(e.address);
    if (addr.cell1.col === 'A' && addr.cell1.row! > 6 && !isString(addr.cell2.col)) {
        ws.addValues(`B${addr.cell1.row}`, [[AUTO_STT_FOMULA]])
    }
    if (addr.cell1.col === 'H' && addr.cell1.row! > 6 && !isString(addr.cell2.col)) {
        const res = evaluate(e.details!.valueAfter);
        if (res) {
            ws.addValues(`I${addr.cell1.row}`, [[res]])
        }
    }
}
const tlChanged = (e: any) => {
    const addr = new addressObj(e.address);
    if (addr.cell1.col === 'A' && addr.cell1.row! > 6 && !isString(addr.cell2.col)) {
        ws.addValues(`B${addr.cell1.row}`, [[AUTO_STT_FOMULA]])
    }
    if (addr.cell1.col === 'H' && addr.cell1.row! > 6 && !isString(addr.cell2.col)) {
        const res = evaluate(e.details!.valueAfter);
        if (res) {
            ws.addValues(`I${addr.cell1.row}`, [[res]])
        }
    }
}
export async function onActivate(event: any) {
    const id: string = event.worksheetId? event.worksheetId : null;
    await ws.ws.context.sync();
    if (id) await ws?.currentWs(id).then(x => {ws?.getRangeName()});
    await ws.ws.context.sync();
}

export async function onSelectionChanged(event: any) {
    const address = new addressObj(event.address)
    if ((address.cell1.col === 'D' || address.cell1.col === 'C') && address.cell1.row! > 6) {
        ee.emit(`${WORKSHEET_SELECTION_CHANGED}_${event.worksheetId}`, event.address);
    }
}