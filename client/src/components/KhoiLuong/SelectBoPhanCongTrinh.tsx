import { PlusOutlined } from "@ant-design/icons";
import { Button, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { BoPhanCongTrinh } from "../../Graphql/khoiluong";
interface propsType {
  loaiCongTrinh: string;
}

const BO_PHAN_CONG_TRINH = gql`
  query ($mauKhoiLuongFilter: FilterFindManyMauKhoiLuongInput) {
    mauKhoiLuong(filter: $mauKhoiLuongFilter) {
      tenBoPhan
      loaiCongTrinh
      data
    }
  }
`;

export default function SelectBoPhanCongTrinh(props: propsType) {
  const { loaiCongTrinh } = props;

  const { loading, error, data } = useQuery(BO_PHAN_CONG_TRINH, {
    variables: {
      mauKhoiLuongFilter: {
        loaiCongTrinh,
      },
    },
  });
  function _mcvClick(value: any) {
    console.log(value);
  }
  return (
    <>
      <List
        className="demo-loadmore-list"
        size="small"
        loading={loading}
        itemLayout="horizontal"
        bordered={true}
        dataSource={data ? data.mauKhoiLuong : []}
        renderItem={(item: any) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta title={item.tenBoPhan} />
              <Button
                type="primary"
                shape="circle"
                size="small"
                onClick={(e) => _mcvClick(item.tenBoPhan)}
                icon={<PlusOutlined />}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
}
