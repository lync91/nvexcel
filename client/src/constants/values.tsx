import {
  PROJECT_INFO,
  LOAI_CONG_TRINH_RANGE,
  TEN_CONG_TRINH_RANGE,
  DIA_DIEM_RANGE,
  TABLE_HEADER_COLOR,
  CHU_DAU_TU_RANGE,
  NHOM_DU_AN_RANGE,
  CAP_CONG_TRINH_RANGE,
  QUY_MO_THIET_KE_RANGE,
  BUOC_THIET_KE_RANGE,
  GK_RANGE,
  GXD_RANGE,
  GQLDA_RANGE,
  GTB_RANGE,
  GDP_RANGE,
  GTV_RANGE,
  GDPKLPS_RANGE,
  GDPTG_RANGE,
  CAP_DAC_BIET_NAME,
  CAP_I_NAME,
  CAP_II_NAME,
  CAP_III_NAME,
  CAP_IV_NAME,
  NHOM_A_NAME,
  NHOM_B_NAME,
  NHOM_C_NAME,
  THIET_KE_MOT_BUOC_NAME,
  THIET_KE_HAI_BUOC_NAME,
  THIET_KE_BA_BUOC_NAME,
  BUOC_LAP_BCKTKT_NAME,
  BUOC_LAP_BCNCKT_NAME,
  BUOC_LAP_BCNGTKT_NAME,
  BUOC_LAP_TKBVTC_NAME,
  CONG_TRINH_DAN_DUNG_NAME,
  CONG_TRINH_CONG_NGHIEP_NAME,
  CONG_TRINH_GIAO_THONG_NAME,
  CONG_TRINH_NONG_NGHIEP_NAME,
  CONG_TRINH_HA_TANG_NAME,
} from "./named";

export const MAU_KHOI_LUONG = [
  ["BẢNG MẪU KHỐI LƯỢNG CÔNG TRÌNH"],
  ["Công trình: "],
  ["Địa điểm: "],
];
export const TIEN_LUONG_TITLE = [
  ["BẢNG TIÊN LƯỢNG CÔNG TRÌNH"],
  ["Công trình: "],
  ["Địa điểm: "],
];

export const TONG_HOP_KHOI_LUONG_HEADER = [
  [
    "Ký hiệu",
    "STT",
    "Mã đơn giá",
    "Tên công việc",
    "Đơn vị",
    "Hệ số",
    "Số lượng",
    "Diễn giải",
    "Khối lượng 1 cấu kiện",
    "Khối lượng",
  ],
];
export const AUTO_STT_FOMULA =
  '=IF(INDIRECT(CONCAT("A",ROW()))="+",COUNTIF(INDIRECT(CONCAT("A",LOOKUP(2,1/(INDIRECT(CONCAT("A1:A",ROW()))="HM"),ROW(INDIRECT(CONCAT("A1:A",ROW())))),":A",ROW())),"+"),IF(INDIRECT(CONCAT("A",ROW()))="#",ROMAN(COUNTIF(INDIRECT(CONCAT("A",LOOKUP(2,1/(INDIRECT(CONCAT("A1:A",ROW()))="HM"),ROW(INDIRECT(CONCAT("A1:A",ROW())))),":A",ROW())),"#")),IF(INDIRECT(CONCAT("A",ROW()))="HM","HM","")))';
export const KHOI_LUONG_DEFAULT_VALUES = [
  ["HM", `${AUTO_STT_FOMULA}`, "", "", "", "", "", "", "", ""],
];

export const DAU_VAO_OBJECT = {
  name: "Đầu vào",
  colwidth: [30, 180, 60],
  font: "Times New Roman",
  printArea: "A:F",
  pageSize: "A4",
  colFormat: [[5, "#.##0"]],
  contents: [
    {
      range: [
        {
          values: ["THÔNG TIN CÔNG TRÌNH VÀ DỮ LIỆU ĐẦU VÀO", ""],
          bold: true,
          height: 24,
          hCenter: true,
          vCenter: true,
          colSpan: [6],
        },
        {
          values: ["", ""],
          bold: true,
        },
        {
          values: ["I.", "THÔNG TIN CHUNG"],
          bold: true,
        },
      ],
    },
    {
      range: [
        {
          values: ["STT", "Thông tin", "Nội dung"],
          bold: true,
          colSpan: [1, 1, 4],
          fillColor: "#C6E0B4",
          hCenter: true,
          vCenter: true,
        },
      ],
      border: true,
    },
    {
      range: [
        {
          values: ["1", "Tên công trình"],
          colSpan: [1, 1, 4],
          names: [[2, TEN_CONG_TRINH_RANGE]],
        },
        {
          values: ["2", "Địa điểm"],
          colSpan: [1, 1, 4],
          names: [[2, DIA_DIEM_RANGE]],
        },
        {
          values: ["3", "Chủ đầu tư"],
          colSpan: [1, 1, 4],
          names: [[2, CHU_DAU_TU_RANGE]],
        },
        {
          values: ["4", "Nhóm dự án"],
          colSpan: [1, 1, 4],
          names: [[2, NHOM_DU_AN_RANGE]],
          Validation: {
            cell: 2,
            list: "AC3:AC5",
          },
        },
        {
          values: ["5", "Loại công trình"],
          colSpan: [1, 1, 4],
          names: [[2, LOAI_CONG_TRINH_RANGE]],
          onChange: [
            {
              type: "named",
              watch: LOAI_CONG_TRINH_RANGE,
              target: PROJECT_INFO,
              key: LOAI_CONG_TRINH_RANGE,
            },
          ],
          Validation: {
            cell: 2,
            list: "AA3:AA7",
          },
        },
        {
          values: ["6", "Cấp công trình"],
          colSpan: [1, 1, 4],
          names: [[2, CAP_CONG_TRINH_RANGE]],
          Validation: {
            cell: 2,
            list: "AB3:AB7",
          },
        },
        {
          values: ["7", "Quy mô thiết kế"],
          colSpan: [1, 1, 4],
          names: [[2, QUY_MO_THIET_KE_RANGE]],
          Validation: {
            cell: 2,
            list: "AD3:AD5",
          },
        },
        {
          values: ["8", "Bước thiết kế"],
          colSpan: [1, 1, 4],
          names: [[2, BUOC_THIET_KE_RANGE]],
          Validation: {
            cell: 2,
            list: "AE3:AE6",
          },
        },
      ],
      border: true,
      hAlign: ["Center"],
      font: "Times New Roman",
    },
    {
      range: [
        ["", ""],
        {
          values: ["II.", "HỆ SỐ CÔNG TRÌNH"],
          bold: true,
        },
      ],
    },
    {
      range: [
        {
          values: ["STT", "Tên Hệ Số", "", "", "", "Giá trị"],
          bold: true,
          colSpan: [1, 4, 1],
          fillColor: "#C6E0B4",
          hCenter: true,
          vCenter: true,
        },
        { values: ["1", "Hệ số điều chỉnh nhân công"], colSpan: [1, 4, 1] },
        { values: ["2", "Hệ số điều chỉnh vật liệu"], colSpan: [1, 4, 1] },
        { values: ["3", "Hệ số điều chỉnh nhân công"], colSpan: [1, 4, 1] },
        { values: ["4", "Hệ số điều chỉnh ca máy"], colSpan: [1, 4, 1] },
        {
          values: ["4", "Định mức chi phí trực tiếp khác (TT)"],
          colSpan: [1, 4, 1],
        },
        { values: ["6", "Định mức chi phí chung (C)"], colSpan: [1, 4, 1] },
        {
          values: ["7", "Định mức thu nhập chịu thuế tính trước (TL)"],
          colSpan: [1, 4, 1],
        },
        {
          values: ["8", "Thuế suất thuế giá trị gia tăng (TGTGT-XD)"],
          colSpan: [1, 4, 1],
        },
        {
          values: [
            "9",
            "Tỷ lệ chi phí XD nhà tạm tại hiện trường để ở và điều hành thi công",
          ],
          colSpan: [1, 1],
        },
      ],
      border: true,
      hAlign: ["Center"],
    },
    {
      range: [
        [""],
        {
          values: ["III.", "LƯƠNG VÀ CÁC KHOẢN PHỤ CẤP"],
          bold: true,
        },
      ],
    },
    {
      range: [
        {
          values: ["STT", "Tên Hệ Số", "", "", "", "Giá trị"],
          bold: true,
          colSpan: [1, 4, 1],
          fillColor: "#C6E0B4",
          hCenter: true,
          vCenter: true,
        },
        {
          values: ["1", "Mức lương đầu vào ( LNC ) ( đồng/tháng )"],
          colSpan: [1, 4, 1],
        },
        {
          values: ["2", "Số ngày làm việc                  ( ngày/tháng )"],
          colSpan: [1, 4, 1],
        },
        { values: ["3", "Phụ cấp lưu động"], colSpan: [1, 4, 1] },
        { values: ["4", "Không ổn định sản xuất"], colSpan: [1, 4, 1] },
        {
          values: ["5", "Lương phụ nghỉ lễ, tết hoặc nghỉ phép ..."],
          colSpan: [1, 4, 1],
        },
        {
          values: ["6", "Chi phí có thể khoán trực tiếp cho người lao động"],
          colSpan: [1, 4, 1],
        },
        { values: ["7", "Phụ cấp khu vực"], colSpan: [1, 4, 1] },
        { values: ["8", "Phụ cấp độc hại"], colSpan: [1, 4, 1] },
        { values: ["9", "Phụ cấp thu hút"], colSpan: [1, 4, 1] },
        { values: ["10", "Phụ cấp trách nhiệm"], colSpan: [1, 4, 1] },
        { values: ["11", "Phụ cấp bảo hiểm"], colSpan: [1, 4, 1] },
        {
          values: ["12", "Phụ cấp vùng sâu, vùng xa, khó khăn, đắt đỏ"],
          colSpan: [1, 4, 1],
        },
      ],
      border: true,
      hAlign: ["Center"],
    },
    {
      range: [
        [""],
        {
          values: ["IV.", "GIÁ ĐIỆN VÀ NĂNG LƯỢNG"],
          bold: true,
        },
      ],
    },
    {
      range: [
        {
          values: ["STT", "Tên", "Đơn vị", "Giá trước thuế", "Giá sau thuế"],
          bold: true,
          fillColor: "#C6E0B4",
          hCenter: true,
          vCenter: true,
        },
        ["1", "Diezel", "lít"],
        ["2", "Mazut", "kg"],
        ["3", "Điện", "kWh"],
        ["4", "Xăng A92", "lít"],
      ],
      hAlign: ["Center", "Left", "Center"],
      border: true,
    },
    {
      range: [
        [""],
        {
          values: ["V.", "HỆ SỐ CÁC KHOẢN MỤC CHI PHÍ"],
          bold: true,
        },
      ],
    },
    {
      range: [
        [CONG_TRINH_DAN_DUNG_NAME],
        [CONG_TRINH_CONG_NGHIEP_NAME],
        [CONG_TRINH_GIAO_THONG_NAME],
        [CONG_TRINH_NONG_NGHIEP_NAME],
        [CONG_TRINH_HA_TANG_NAME],
      ],
      colWidth: [0],
      addr: "AA3",
      color: "BFBFBF",
    },
    {
      range: [
        [CAP_DAC_BIET_NAME],
        [CAP_I_NAME],
        [CAP_II_NAME],
        [CAP_III_NAME],
        [CAP_IV_NAME],
      ],
      colWidth: [0],
      addr: "AB3",
      color: "BFBFBF",
    },
    {
      range: [[NHOM_A_NAME], [NHOM_B_NAME], [NHOM_C_NAME]],
      colWidth: [0],
      addr: "AC3",
      color: "BFBFBF",
    },
    {
      range: [
        [THIET_KE_MOT_BUOC_NAME],
        [THIET_KE_HAI_BUOC_NAME],
        [THIET_KE_BA_BUOC_NAME],
      ],
      colWidth: [0],
      addr: "AD3",
      color: "BFBFBF",
    },
    {
      range: [
        [BUOC_LAP_BCKTKT_NAME],
        [BUOC_LAP_BCNGTKT_NAME],
        [BUOC_LAP_BCNCKT_NAME],
        [BUOC_LAP_TKBVTC_NAME],
      ],
      colWidth: [0],
      addr: "AE3",
      color: "BFBFBF",
    },
  ],
};

export const TONG_HOP_KHOI_LUONG_OBJECT = {
  title: "",
};

export const TONG_MUC_OBJECT = {
  name: "Tổng hợp",
  colwidth: [30, 210, 80, 80, 80, 50, 140, 140],
  font: "Times New Roman",
  printArea: "A:H",
  pageSize: "A4",
  contents: [
    {
      range: [
        {
          values: ["TỔNG HỢP DỰ TOÁN XÂY DỰNG CÔNG TRÌNH"],
          bold: true,
          height: 24,
          hCenter: true,
          vCenter: true,
          colSpan: [8],
        },
        {
          values: [
            `="DỰ ÁN "&UPPER('${DAU_VAO_OBJECT.name}'!${TEN_CONG_TRINH_RANGE})`,
          ],
          bold: true,
          hCenter: true,
          vCenter: true,
          colSpan: [8],
        },
        {
          values: [
            `="Địa điểm "&'${DAU_VAO_OBJECT.name}'!${TEN_CONG_TRINH_RANGE}`,
          ],
          bold: true,
          hCenter: true,
          vCenter: true,
          colSpan: [8],
        },
      ],
    },
    {
      range: [
        {
          values: [
            "STT",
            "NỘI DUNG CHI PHÍ",
            "GIÁ TRỊ TRƯỚC THUẾ",
            "THUẾ GTGT",
            "GIÁ TRỊ SAU THUẾ",
            "KÝ HIỆU",
            "CÁCH TÍNH",
            "GHI CHÚ",
          ],
          bold: true,
          // height: 24,
          hCenter: true,
          vCenter: true,
          wrapText: true,
          fillColor: TABLE_HEADER_COLOR,
        },
        {
          values: ["[1]", "[2]", "[3]", "[4]", "[5]", "[6]", "[7]", "[8]"],
          bold: true,
          hCenter: true,
          vCenter: true,
        },
      ],
      border: true,
    },
    {
      range: [
        {
          values: ["1", "Chi phí xây dựng", "", "", "", GXD_RANGE, "", ""],
          bold: true,
          vCenter: true,
          names: [[4, GXD_RANGE]],
        },
        {
          values: ["2", "Chi phí thiết bị", "", "", "", GTB_RANGE, "", ""],
          bold: true,
          vCenter: true,
          names: [[4, GTB_RANGE]],
        },
        {
          values: [
            "3",
            "Chi phí quản lý dự án",
            "",
            "",
            "",
            GQLDA_RANGE,
            "",
            "",
          ],
          bold: true,
          vCenter: true,
          names: [[4, GQLDA_RANGE]],
        },
        {
          values: [
            "4",
            "Chi tư vấn đầu tư xây dựng",
            "",
            "",
            "",
            GTV_RANGE,
            "",
            "",
          ],
          bold: true,
          vCenter: true,
          names: [[4, GTV_RANGE]],
        },
        [""],
        {
          values: ["5", "Chi phí khác", "", "", "", GK_RANGE, "", ""],
          bold: true,
          vCenter: true,
          names: [[4, GK_RANGE]],
        },
        [""],
        {
          values: ["6", "Chi phí dự phòng", "", "", "", GDP_RANGE, "", ""],
          bold: true,
          vCenter: true,
          names: [[4, GDP_RANGE]],
        },
        {
          values: [
            "'6.1",
            "Chi phí dự phòng cho yếu tố khối lượng công việc phát sinh",
            "",
            "",
            "",
            GDPKLPS_RANGE,
            "",
            "",
          ],
          vCenter: true,
          wrapText: true,
          names: [[4, GDPKLPS_RANGE]],
        },
        {
          values: [
            "'6.2",
            "Chi phí dự phòng cho yếu tố khối lượng công việc phát sinh",
            "",
            "",
            "",
            GDPTG_RANGE,
            "",
            "",
          ],
          vCenter: true,
          wrapText: true,
          names: [[4, GDPTG_RANGE]],
        },
        {
          values: ["7", "Tổng dự toán", "", "", "", "G", "", ""],
          bold: true,
          vCenter: true,
        },
        {
          values: [
            "8",
            "Làm tròn",
            "=ROUND(R[-1]C,-3)",
            "=ROUND(R[-1]C,-3)",
            "=ROUND(R[-1]C,-3)",
            "",
            "",
            "",
          ],
          bold: true,
          vCenter: true,
        },
      ],
      border: true,
      hAlign: ["Center", "Left", "Left", "Left", "Left", "Center"],
    },
  ],
};
export const MAU_BANG_TRA_OBJECT = {
  name: "Mẫu bảng tra",
  colwidth: [30, 210, 60, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
  font: "Times New Roman",
  printArea: "A:AZ",
  pageSize: "A4",
  contents: [
    {
      range: [
        {
          values: ["MẪU BẢNG TRA CHI PHÍ TƯ VẤN"],
          bold: true,
          height: 28,
          hCenter: true,
          vCenter: true,
          colSpan: [8],
        },
      ],
      font: "Times New Roman",
    },
    {
      range: [[""]],
      font: "Times New Roman",
    },
  ],
};
