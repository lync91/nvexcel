import { gql, useQuery } from "@apollo/client";

export function LoaiCongTrinh() {
  const LOAI_CONG_TRINH = gql`
    query {
      lstLoaicongtrinh {
        value
      }
    }
  `;
  return useQuery(LOAI_CONG_TRINH);
}

export function BoPhanCongTrinh(lct: string) {
  const BO_PHAN_CONG_TRINH = gql`
    query ($mauKhoiLuongFilter: FilterFindManyMauKhoiLuongInput) {
      mauKhoiLuong(filter: $mauKhoiLuongFilter) {
        tenBoPhan
        loaiCongTrinh
        data
      }
    }
  `;
  return useQuery(BO_PHAN_CONG_TRINH, {
    variables: {
      mauKhoiLuongFilter: {
        loaiCongTrinh: lct,
      },
    },
  });
}
