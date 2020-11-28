import { 
	CONG_TRINH_CONG_NGHIEP_NAME,
	CONG_TRINH_DAN_DUNG_NAME,
	CONG_TRINH_GIAO_THONG_NAME,
	CONG_TRINH_HA_TANG_NAME,
	CONG_TRINH_NONG_NGHIEP_NAME,
	CAP_DAC_BIET_NAME,
	CAP_I_NAME,
	CAP_II_NAME,
	CAP_III_NAME,
	CAP_IV_NAME,
	TIEN_LUONG_SHEET_NAME,
	TEN_CONG_TRINH_RANGE,
	TABLE_HEADER_COLOR
 } from "./named";

 import { DAU_VAO_OBJECT } from "./values";

export const BANGTRA1 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '10', '20', '50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '30000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
		font: 'Times New Roman',
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, '', '', '', '', '', '', '', '', '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME],
			['5', CONG_TRINH_HA_TANG_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
		font: 'Times New Roman',
	}
]
export const BANGTRA2 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '1', '3', '7', '15'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME],
			['5', CONG_TRINH_HA_TANG_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA3 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '10', '20', '50', '10', '20', '50', '100', '200', '500', '800', '10000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, CAP_DAC_BIET_NAME, '', '', '', '', '', '', '', '', '', '', ''],
			['1', CONG_TRINH_DAN_DUNG_NAME, CAP_I_NAME, '', '', '', '', '', '', '', '', '', '', ''],
			['1', CONG_TRINH_DAN_DUNG_NAME, CAP_II_NAME, '', '', '', '', '', '', '', '', '', '', ''],
			['1', CONG_TRINH_DAN_DUNG_NAME, CAP_III_NAME, '', '', '', '', '', '', '', '', '', '', ''],
			['1', CONG_TRINH_DAN_DUNG_NAME, CAP_IV_NAME, '', '', '', '', '', '', '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME, CAP_DAC_BIET_NAME],
			['2', CONG_TRINH_CONG_NGHIEP_NAME, CAP_I_NAME],
			['2', CONG_TRINH_CONG_NGHIEP_NAME, CAP_II_NAME],
			['2', CONG_TRINH_CONG_NGHIEP_NAME, CAP_III_NAME],
			['2', CONG_TRINH_CONG_NGHIEP_NAME, CAP_IV_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME, CAP_DAC_BIET_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME, CAP_I_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME, CAP_II_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME, CAP_III_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME, CAP_IV_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME, CAP_DAC_BIET_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME, CAP_I_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME, CAP_II_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME, CAP_III_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME, CAP_IV_NAME],
			['5', CONG_TRINH_HA_TANG_NAME, CAP_DAC_BIET_NAME],
			['5', CONG_TRINH_HA_TANG_NAME, CAP_I_NAME],
			['5', CONG_TRINH_HA_TANG_NAME, CAP_II_NAME],
			['5', CONG_TRINH_HA_TANG_NAME, CAP_III_NAME],
			['5', CONG_TRINH_HA_TANG_NAME, CAP_IV_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA4 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '10', '20', '50', '10', '20', '50', '100', '200', '500', '800', '10000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, '', '', '', '', '', '', '', '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME],
			['5', CONG_TRINH_HA_TANG_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA5 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '10', '20', '50', '100', '200', '500', '1000', '2000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, '', '', '', '', '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME],
			['5', CONG_TRINH_HA_TANG_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA6 = [
	{
		range: [
			{
				values: ['STT', 'Chi phí tư vấn (chưa có thuế GTGT) trong dự toán gói thầu tư vấn (tỷ đồng)','Cấp công trình', '10', '20', '50', '100', '200', '500', '1000', '2000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', 'Tỷ lệ %', '', '', '', '', '', '', '', '', ''],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA7 = [
	{
		range: [
			{
				values: ['STT', 'Loại công trình','Cấp công trình', '10', '20', '50', '10', '20', '50', '100', '200', '500', '800', '10000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', CONG_TRINH_DAN_DUNG_NAME, '', '', '', '', '', '', '', '', '', '', '', ''],
			['2', CONG_TRINH_CONG_NGHIEP_NAME],
			['3', CONG_TRINH_GIAO_THONG_NAME],
			['4', CONG_TRINH_NONG_NGHIEP_NAME],
			['5', CONG_TRINH_HA_TANG_NAME],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA8 = [
	{
		range: [
			{
				values: ['STT', 'Giá trị tổng mức đầu tư (chưa có thuế GTGT) được duyệt (tỷ đồng)','Cấp công trình', '100', '300', '500', '1000', '2000', '5000', '10000'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', 'Tỷ lệ %', '', '', '', '', '', '', '', ''],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const BANGTRA9 = [
	{
		range: [
			{
				values: ['STT', 'Chi phí khảo sát xây dựng (chưa có thuế GTGT) trong dự toán gói thầu khảo sát xây dựng (tỷ đồng)','Cấp công trình', '1', '5', '10', '20', '50'],
				bold: true,
				height: 28,
                hCenter: true,
				vCenter: true,
				wrapText: true,
			},
		],
		border: true,
	},
	{
		range: [
			['1', 'Tỷ lệ %', '', '', '', '', '', ''],
		],
		hAlign: ['Center'],
		wrapText: true,
		border: true,
	}
]

export const listCP = [
	{
		stt: 1,
		nhomcp: 'QLDA',
		tencp: 'Chi phí quản lý dự án',
		key: 'qlda',
		template: BANGTRA1
	},
	{
		stt: 2,
		nhomcp: 'TV',
		tencp: 'Tư vấn khảo sát',
		key: 'ks'
    },
    {
		stt: 3,
		nhomcp: 'TV',
		tencp: 'Tư vấn giám sát công tác khảo sát xây dựng',
		key: 'gsks',
		template: BANGTRA9
	},
	{
		stt: 4,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập báo cáo kinh tế - kỹ thuật',
		key: 'bcktkt',
		template: BANGTRA2
	},
	{
		stt: 5,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập báo cáo nghiên cứu tiền khả thi',
		key: 'bcnctkt',
		template: BANGTRA1
	},
	{
		stt: 6,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập báo cáo nghiên cứu khả thi',
		key: 'bcnckt',
		template: BANGTRA1
	},
	{
		stt: 7,
		nhomcp: 'TV',
		tencp: 'Tư vấn thiết kế kỹ thuật',
		key: 'tkkt',
		template: BANGTRA3
	},
	{
		stt: 8,
		nhomcp: 'TV',
		tencp: 'Tư vấn thiết kế bản vẽ thi công',
		key: 'tkbvtc',
		template: BANGTRA3
	},
	{
		stt: 9,
		nhomcp: 'TV',
		tencp: 'Tư vấn thẩm tra báo cáo nghiên cứu tiền khả thi',
		key: 'ttbcnctkt',
		template: BANGTRA1
	},
	{
		stt: 10,
		nhomcp: 'TV',
		tencp: 'Tư vấn thẩm tra báo cáo nghiên cứu khả thi',
		key: 'ttbcnckt',
		template: BANGTRA1
	},
	{
		stt: 11,
		nhomcp: 'TV',
		tencp: 'Tư vấn thẩm tra thiết kế',
		key: 'tttk',
		template: BANGTRA4
	},
	{
		stt: 12,
		nhomcp: 'TV',
		tencp: 'Tư vấn thẩm tra dự toán xây dựng',
		key: 'ttdt',
		template: BANGTRA4
	},
	{
		stt: 13,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập hồ sơ mời thầu, đánh giá hồ sơ dự thầu tư vấn',
		key: 'lhsmttv',
		template: BANGTRA6
	},
	{
		stt: 14,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập hồ sơ mời thầu, đánh giá hồ sơ dự thầu thi công xây dựng',
		key: 'lhsmttc',
		template: BANGTRA5
	},
	{
		stt: 15,
		nhomcp: 'TV',
		tencp: 'Tư vấn lập hồ sơ mời thầu, đánh giá hồ sơ dự thầu mua sắm vật tư, thiết bị',
		key: 'lhsmttb',
		template: BANGTRA5
	},
	{
		stt: 16,
		nhomcp: 'TV',
		tencp: 'Tư vấn giám sát thi công xây dựng',
		key: 'gstc',
		template: BANGTRA7
	},
	{
		stt: 17,
		nhomcp: 'TV',
		tencp: 'Tư vấn giám sát lắp đặt thiết bị',
		key: 'gstb',
		template: BANGTRA7
	},
    {
		stt: 18,
		nhomcp: 'TV',
		tencp: 'Tư vấn quy đổi vốn đầu tư xây dựng',
		key: 'qdvdt',
		template: BANGTRA8
	},
	
]


export const tbBANGTONGHOPKHOILUONG = {
	name: TIEN_LUONG_SHEET_NAME,
    colwidth: [30, 30, 70, 180	, 50, 200, 70, 100],
    font: 'Times New Roman',
    printArea: 'B:H',
	pageSize: 'a4',
	orientation: 'portrait',
	defaultConditionalFormat: [
		// {
		// 	address: 'A:H',
		// 	color: null,
		// 	bold: true,
		// 	italic: false,
		// 	border:  true,
		// 	formula: '=IF(OR(INDIRECT("RC[0]",0)="Ký hiệu", INDIRECT("RC[-1]",0)="Ký hiệu", INDIRECT("RC[-2]",0)="Ký hiệu", INDIRECT("RC[-3]",0)="Ký hiệu", INDIRECT("RC[-4]",0)="Ký hiệu", INDIRECT("RC[-5]",0)="Ký hiệu", INDIRECT("RC[-6]",0)="Ký hiệu", INDIRECT("RC[-7]",0)="Ký hiệu", INDIRECT("RC[-8]",0)="Ký hiệu", INDIRECT("RC[-9]",0)="Ký hiệu"),TRUE)'
		// },
		{
			address: 'A:H',
			color: null,
			bold: true,
			italic: false,
			border:  true,
			formula: '=IF(OR(INDIRECT("RC[0]",0)="HM", INDIRECT("RC[-1]",0)="HM", INDIRECT("RC[-2]",0)="HM", INDIRECT("RC[-3]",0)="HM", INDIRECT("RC[-4]",0)="HM", INDIRECT("RC[-5]",0)="HM", INDIRECT("RC[-6]",0)="HM", INDIRECT("RC[-7]",0)="HM", INDIRECT("RC[-8]",0)="HM", INDIRECT("RC[-9]",0)="HM"),TRUE)'
		},
		{
			address: 'A:H',
			color: null,
			bold: true,
			italic: false,
			border:  true,
			formula: '=IF(OR(INDIRECT("RC[0]",0)="#", INDIRECT("RC[-1]",0)="#", INDIRECT("RC[-2]",0)="#", INDIRECT("RC[-3]",0)="#", INDIRECT("RC[-4]",0)="#", INDIRECT("RC[-5]",0)="#", INDIRECT("RC[-6]",0)="#", INDIRECT("RC[-7]",0)="#", INDIRECT("RC[-8]",0)="#", INDIRECT("RC[-9]",0)="#"),TRUE)'
		},
		{
			address: 'A:H',
			color: null,
			bold: false,
			italic: false,
			border:  true,
			formula: '=IF(OR(INDIRECT("RC[0]",0)="+", INDIRECT("RC[-1]",0)="+", INDIRECT("RC[-2]",0)="+", INDIRECT("RC[-3]",0)="+", INDIRECT("RC[-4]",0)="+", INDIRECT("RC[-5]",0)="+", INDIRECT("RC[-6]",0)="+", INDIRECT("RC[-7]",0)="+", INDIRECT("RC[-8]",0)="+", INDIRECT("RC[-9]",0)="+"),TRUE)'
		},
		{
			address: 'A:H',
			color: 'blue',
			bold: false,
			italic: false,
			border:  true,
			formula: '=IF(OR(INDIRECT("RC[0]",0)="-", INDIRECT("RC[-1]",0)="-", INDIRECT("RC[-2]",0)="-", INDIRECT("RC[-3]",0)="-", INDIRECT("RC[-4]",0)="-", INDIRECT("RC[-5]",0)="-", INDIRECT("RC[-6]",0)="-", INDIRECT("RC[-7]",0)="-", INDIRECT("RC[-8]",0)="-", INDIRECT("RC[-9]",0)="-"),TRUE)'
		},
	],
	contents: [
		{
            range: [
                {
                    values: ['BẢNG TỔNG HỢP KHỐI LƯỢNG CÔNG TÁC XÂY DỰNG'],
                    bold: true,
                    height: 24,
                    hCenter: true,
                    vCenter: true,
                    colSpan: [8]
				},
				{
                    values: [`="Tên dự án: "&UPPER('${DAU_VAO_OBJECT.name}'!${TEN_CONG_TRINH_RANGE})`],
                    bold: true,
                    vCenter: true,
                    colSpan: [8]
                },
                {
                    values: [`="Tên công trình: "&'${DAU_VAO_OBJECT.name}'!${TEN_CONG_TRINH_RANGE}`],
                    bold: true,
                    vCenter: true,
                    colSpan: [8]
                },
                {
                    values: [`="Hạng mục công trình: "&'${DAU_VAO_OBJECT.name}'!${TEN_CONG_TRINH_RANGE}`],
                    bold: true,
                    vCenter: true,
					colSpan: [8],
                },

            ]

		},
		{
            range: [
                {
                    values: ['Mã', 'STT', 'MÃ HIỆU CÔNG TÁC', 'DANH MỤC CÔNG TÁC', 'ĐƠN VỊ TÍNH', 'CÁCH XÁC ĐỊNG', 'KHỐI LƯỢNG', 'GHI CHÚ'],
                    bold: true,
                    // height: 24,
                    hCenter: true,
                    vCenter: true,
                    wrapText: true,
                    fillColor: TABLE_HEADER_COLOR
                },
                {
                    values: [``, `'(1)`, `'(2)`, `'(3)`, `'(4)`, `'(5)`, `'(6)`, `'(7)`],
                    bold: true,
                    hCenter: true,
                    vCenter: true,
                    wrapText: true,
                },
            ],
            border: true,

        },
	]
}