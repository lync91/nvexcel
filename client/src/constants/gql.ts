import { gql, useQuery } from "@apollo/client";

export const LOAI_CONG_TRINH = gql`
query {
  loaicongtrinhs {
    value
  }
}
`;

export function LoaiCongTrinh() {
  return useQuery(LOAI_CONG_TRINH);
};
