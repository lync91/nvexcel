import { gql, useQuery } from "@apollo/client";

export function LoaiCongTrinh() {
  const LOAI_CONG_TRINH = gql`
    query {
      loaicongtrinhs {
        value
      }
    }
  `;
  return useQuery(LOAI_CONG_TRINH);
}
