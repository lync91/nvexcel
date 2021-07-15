export function toLetter(num: number): string {
    var s = '', t;
    while (num > 0) {
        t = (num - 1) % 26;
        s = String.fromCharCode(65 + t) + s;
        num = (num - t) / 26 | 0;
    }
    return s;
}

export function columnIndex(str: string): number {
    let index = 0;
    let name: any = str.toUpperCase().match((/[A-Z]/g))

    for (let i = name.length - 1; i >= 0; i--) {
        let piece = name[i];
        let colNumber = piece.charCodeAt() - 64;
        index = index + colNumber * Number(Math.pow(26, name.length - (i + 1)));
    }
    return index;
}

export async function addrParser(addr: string, values: any[][]) {
    const startCol: number = await columnIndex(addr)
    const endColNum: number = startCol + values[0].length - 1;
    const str = addr.match(/([.0-9])*\d/g)
    const endRowNum: number = parseInt(str![0]) + values.length - 1
    // const colLetter = toLetter(endColNum);
    return `${addr}:${toLetter(endColNum)}${endRowNum}`
}